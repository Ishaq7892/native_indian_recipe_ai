import asyncio
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from groq import Groq
from dotenv import load_dotenv
import os
import functools
import io

print("Starting server initialization with Groq...")
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Initialize Groq client
print("Initializing Groq client...")
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print(f"WebSocket connected: {websocket.client}")
    
    # Store conversation history for this session
    history = [
        {
            "role": "system",
            "content": (
                "You are a helpful culinary assistant specializing in native and traditional recipes. "
                "CRITICAL: Always reply in the exact same language the user speaks. "
                "If the user speaks Hindi, reply in Hindi. If Arabic, reply in Arabic. "
                "If the user mixes languages, match their dominant language. "
                "Never switch to English unless the user speaks English. "
                "Keep responses concise and conversational, like Alexa or Siri."
            )
        }
    ]
    
    loop = asyncio.get_running_loop()
    
    async def process_audio_and_respond(audio_data):
        try:
            print(f"\n--- Processing New Audio Request ({len(audio_data)} bytes) ---")
            
            if len(audio_data) < 2000: # Slightly higher threshold to avoid background noise/clicks
                print(f"Audio data too small ({len(audio_data)} bytes), ignoring.")
                return

            # 1. Transcribe using Groq Whisper (STT)
            audio_file = io.BytesIO(audio_data)
            audio_file.name = "audio.webm"
            
            print("Calling Groq Whisper API...")
            try:
                transcription = await loop.run_in_executor(
                    None,
                    lambda: groq_client.audio.transcriptions.create(
                        file=("audio.webm", audio_file),
                        model="whisper-large-v3-turbo",
                        response_format="verbose_json",
                    )
                )
            except Exception as whisper_err:
                print(f"!!! Whisper API Error: {whisper_err}")
                await websocket.send_json({"type": "error", "message": "Speech recognition failed."})
                return
            
            text = transcription.text
            detected_language = getattr(transcription, 'language', 'en') or 'en'
            print(f"Detected language: '{detected_language}'")

            if not text or not text.strip():
                print("!!! Whisper returned empty text.")
                await websocket.send_json({"type": "error", "message": "I didn't hear anything."})
                return
                
            print(f"Transcription result: '{text}'")
            await websocket.send_json({"type": "transcription", "text": text, "language": detected_language})
            
            # 2. Add user message to history
            history.append({"role": "user", "content": text})
            
            # Keep history manageable (last 5 rounds of conversation)
            if len(history) > 11:
                history.pop(1)
                history.pop(1)
            
            # 3. Get LLM response
            print(f"Requesting LLM response (Model: llama-3.1-8b-instant)...")
            try:
                chat_completion = await loop.run_in_executor(
                    None,
                    lambda: groq_client.chat.completions.create(
                        messages=history,
                        model="llama-3.1-8b-instant",
                        temperature=0.7,
                    )
                )
            except Exception as llama_err:
                print(f"!!! LLM API Error: {llama_err}")
                await websocket.send_json({"type": "error", "message": "Brain freeze! Please try again."})
                return
            
            response_text = chat_completion.choices[0].message.content
            print(f"AI Assistant response: {response_text}")
            
            history.append({"role": "assistant", "content": response_text})
            await websocket.send_json({"type": "response", "text": response_text})
            print(f"--- Request Successfully Handled ---\n")
            
        except Exception as e:
            print(f"!!! Fatal error in processing: {e}")
            await websocket.send_json({"type": "error", "message": "Something went wrong on our end."})

    try:
        while True:
            # Receive audio blob from frontend
            data = await websocket.receive_bytes()
            asyncio.create_task(process_audio_and_respond(data))
                
    except Exception as e:
        print(f"WebSocket disconnected or error: {e}")
    finally:
        print("WebSocket closed")

if __name__ == "__main__":
    print("Running uvicorn...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
