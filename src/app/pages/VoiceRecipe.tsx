import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const VoiceRecipe: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsProcessingSpeaking] = useState(false);
    const [conversation, setConversation] = useState<{role: 'bot' | 'user' | 'error', text: string}[]>([]);
    const [continuousMode, setContinuousMode] = useState(true);
    
    const ws = useRef<WebSocket | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const conversationEndRef = useRef<null | HTMLDivElement>(null);
    
    // Audio analysis for silence detection
    const audioContext = useRef<AudioContext | null>(null);
    const analyser = useRef<AnalyserNode | null>(null);
    const silenceTimer = useRef<NodeJS.Timeout | null>(null);
    const SILENCE_THRESHOLD = 15; // Increased slightly for kitchen noise
    const SILENCE_DURATION = 2000; // 2 seconds of silence to auto-stop

    const isRecordingRef = useRef(false);

    const scrollToBottom = () => {
        conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [conversation, isProcessing]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopRecording();
            ws.current?.close();
        };
    }, []);

    const speak = (text: string) => {
        if (!window.speechSynthesis) return;
        
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsProcessingSpeaking(true);
        utterance.onend = () => {
            setIsProcessingSpeaking(false);
            // Only auto-start if we are still in continuous mode AND the user didn't manually stop
            if (continuousMode && !isRecordingRef.current && !manualStopRef.current) {
                console.log('Continuous mode: auto-starting recording after bot spoke');
                setTimeout(startRecording, 500);
            }
            manualStopRef.current = false; // Reset for next cycle
        };
        window.speechSynthesis.speak(utterance);
    };

    const manualStopRef = useRef(false);

    const startRecording = async () => {
        manualStopRef.current = false;
        try {
            console.log('Starting recording sequence...');
            
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('Microphone access granted');

            // Set up silence detection
            audioContext.current = new AudioContext();
            const source = audioContext.current.createMediaStreamSource(stream);
            analyser.current = audioContext.current.createAnalyser();
            analyser.current.fftSize = 256;
            source.connect(analyser.current);
            
            const bufferLength = analyser.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const checkSilence = () => {
                if (!analyser.current || !isRecordingRef.current) return;
                analyser.current.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((a, b) => a + b) / bufferLength;
                
                if (average < SILENCE_THRESHOLD) {
                    if (!silenceTimer.current) {
                        silenceTimer.current = setTimeout(() => {
                            console.log('Silence detected (avg volume:', average, '), auto-stopping...');
                            stopRecording();
                        }, SILENCE_DURATION);
                    }
                } else {
                    if (silenceTimer.current) {
                        clearTimeout(silenceTimer.current);
                        silenceTimer.current = null;
                    }
                }
                if (isRecordingRef.current) requestAnimationFrame(checkSilence);
            };

            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
                ? 'audio/webm;codecs=opus' 
                : 'audio/webm';
                
            mediaRecorder.current = new MediaRecorder(stream, { mimeType });
            audioChunks.current = [];
            
            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    console.log('Captured audio chunk, size:', event.data.size);
                    audioChunks.current.push(event.data);
                }
            };

            mediaRecorder.current.onstop = async () => {
                console.log('MediaRecorder stopped. Chunks captured:', audioChunks.current.length);
                if (audioChunks.current.length > 0) {
                    const audioBlob = new Blob(audioChunks.current, { type: mimeType });
                    console.log('Audio blob created, size:', audioBlob.size);
                    const buffer = await audioBlob.arrayBuffer();
                    if (ws.current?.readyState === WebSocket.OPEN) {
                        console.log('Sending audio buffer to backend (bytes:', buffer.byteLength, ')...');
                        ws.current.send(buffer);
                        setIsProcessing(true);
                    } else {
                        console.warn('WebSocket not open, cannot send audio');
                    }
                } else {
                    console.log('No audio chunks captured, nothing to send.');
                }
                audioContext.current?.close();
                audioContext.current = null;
            };

            // Reconnect WebSocket if needed
            if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
                console.log('Connecting WebSocket to ws://localhost:8000/ws ...');
                ws.current = new WebSocket('ws://localhost:8000/ws');
                
                ws.current.onopen = () => {
                    console.log('WebSocket Connected successfully');
                    setupWebSocketHandlers();
                    
                    mediaRecorder.current?.start();
                    setIsRecording(true);
                    isRecordingRef.current = true;
                    requestAnimationFrame(checkSilence);
                    speak("I'm listening.");
                };

                ws.current.onclose = () => {
                    console.log('WebSocket disconnected');
                    setIsRecording(false);
                    isRecordingRef.current = false;
                };

                ws.current.onerror = (error) => {
                    console.error('WebSocket Error:', error);
                };
            } else {
                console.log('WebSocket already open, starting recorder...');
                mediaRecorder.current.start();
                setIsRecording(true);
                isRecordingRef.current = true;
                requestAnimationFrame(checkSilence);
                speak("I'm listening.");
            }
            
        } catch (err) {
            console.error("Error in startRecording:", err);
            setConversation(prev => [...prev, {role: 'error', text: 'Microphone access denied or error.'}]);
        }
    };

    const setupWebSocketHandlers = () => {
        if (!ws.current) return;

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message from backend:', data);
            if (data.type === 'transcription') {
                setConversation(prev => [...prev, {role: 'user', text: data.text}]);
            } else if (data.type === 'response') {
                setIsProcessing(false);
                setConversation(prev => [...prev, {role: 'bot', text: data.text}]);
                speak(data.text);
            } else if (data.type === 'error') {
                setIsProcessing(false);
                setConversation(prev => [...prev, {role: 'error', text: data.message}]);
            }
        };

        ws.current.onerror = () => {
            setConversation(prev => [...prev, {role: 'error', text: 'Connection to AI lost.'}]);
            setIsProcessing(false);
        };
    };

    const stopRecording = (isManual = false) => {
        console.log('Stopping recording...', isManual ? '(manual)' : '(auto)');
        if (isManual) {
            manualStopRef.current = true;
        }
        if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
            mediaRecorder.current.stop();
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
        }
        if (silenceTimer.current) {
            clearTimeout(silenceTimer.current);
            silenceTimer.current = null;
        }
        setIsRecording(false);
        isRecordingRef.current = false;
    };

    const handleToggleRecording = () => {
        if (isRecording) {
            stopRecording(true);
        } else if (isSpeaking) {
            // Stop the bot from speaking
            window.speechSynthesis.cancel();
            setIsProcessingSpeaking(false);
            manualStopRef.current = true;
            console.log('Bot speech manually stopped');
        } else {
            startRecording();
        }
    };

    return (
        <div className="p-4 flex flex-col h-full max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">AI Kitchen Assistant</h1>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setContinuousMode(!continuousMode)}
                    className={continuousMode ? 'text-primary' : 'text-muted-foreground'}
                >
                    {continuousMode ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                    {continuousMode ? 'Conversational Mode' : 'Manual Mode'}
                </Button>
            </header>
            
            <div className="flex flex-col items-center justify-center gap-6 mb-8 p-8 bg-card rounded-2xl shadow-sm border border-border">
                <div className="relative">
                    {(isRecording || isSpeaking) && (
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    )}
                    <Button 
                        onClick={handleToggleRecording} 
                        size="lg"
                        disabled={isProcessing}
                        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg ${
                            (isRecording || isSpeaking) ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {(isRecording || isSpeaking) ? <MicOff className="h-10 w-10 text-white" /> : <Mic className="h-10 w-10 text-white" />}
                    </Button>
                </div>
                
                <div className="text-center">
                    <p className="text-xl font-medium text-foreground">
                        {isProcessing ? "Thinking..." : isSpeaking ? "Speaking..." : isRecording ? "I'm listening..." : "Tap to talk"}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                        {isRecording ? "I will automatically respond when you stop talking" : "Say something like 'How do I make pancakes?'"}
                    </p>
                </div>
            </div>

            <div className="flex-grow bg-muted/30 rounded-2xl p-6 overflow-y-auto border border-border min-h-[400px]">
                <div className="space-y-4">
                    {conversation.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'bot' || msg.role === 'error' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                                msg.role === 'bot' 
                                    ? 'bg-card text-foreground border border-border' 
                                    : msg.role === 'error'
                                        ? 'bg-destructive/10 text-destructive border border-destructive/20'
                                        : 'bg-primary text-primary-foreground'
                            }`}>
                                <p className="text-xs font-semibold mb-1 opacity-70">
                                    {msg.role === 'bot' ? 'Assistant' : msg.role === 'error' ? 'System' : 'You'}
                                </p>
                                <p className="leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isProcessing && (
                        <div className="flex justify-start">
                            <div className="bg-card text-foreground border border-border max-w-[80%] rounded-2xl px-4 py-2 animate-pulse shadow-sm">
                                <p className="text-xs font-semibold mb-1 opacity-70">Assistant</p>
                                <p>Processing your request...</p>
                            </div>
                        </div>
                    )}
                </div>
                <div ref={conversationEndRef} />
            </div>
        </div>
    );
};

export default VoiceRecipe;
