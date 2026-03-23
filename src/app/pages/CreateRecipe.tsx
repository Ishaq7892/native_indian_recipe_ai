import React, { useState } from 'react';
import { Upload, X, Plus, Save, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CreateRecipe() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<string>('');
  
  const regions = [
    'Kerala', 'Punjab', 'Tamil Nadu', 'Gujarat', 'Maharashtra', 
    'Karnataka', 'West Bengal', 'Rajasthan', 'Goa', 'Delhi'
  ];
  
  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  
  const addStep = () => {
    setSteps([...steps, '']);
  };
  
  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  
  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In real app, would handle file upload
    setUploadedImage('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwY3VycnklMjBzcGljZXN8ZW58MXx8fHwxNzczNDIwMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');
  };
  
  const handleSave = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-foreground mb-1">Create New Recipe</h2>
                <p className="text-muted-foreground">Share your culinary masterpiece</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => navigate('/recipe/preview')} variant="outline" size="md">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={handleSave} variant="primary" size="md">
                  <Save className="w-4 h-4 mr-2" />
                  Save Recipe
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <h3 className="text-lg text-foreground mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Recipe Title"
                    placeholder="e.g., Grandma's Special Chicken Biryani"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  
                  <div>
                    <label className="block mb-2 text-foreground">Region/State</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a region</option>
                      {regions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Image Upload */}
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <h3 className="text-lg text-foreground mb-4">Recipe Image</h3>
                
                {uploadedImage ? (
                  <div className="relative">
                    <ImageWithFallback
                      src={uploadedImage}
                      alt="Recipe"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setUploadedImage('')}
                      className="absolute top-3 right-3 w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="absolute bottom-3 right-3"
                      onClick={() => setUploadedImage('')}
                    >
                      Replace Image
                    </Button>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                      isDragging 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground mb-2">Drag and drop your image here</p>
                    <p className="text-muted-foreground text-sm mb-4">or</p>
                    <Button 
                      variant="primary" 
                      size="md"
                      onClick={() => setUploadedImage('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwY3VycnklMjBzcGljZXN8ZW58MXx8fHwxNzczNDIwMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')}
                    >
                      Browse Files
                    </Button>
                  </div>
                )}
              </div>

              {/* Video Segment */}
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <h3 className="text-lg text-foreground mb-4">Recipe Video</h3>
                
                <div className="space-y-4">
                  <Input
                    label="Video URL"
                    placeholder="e.g., https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or upload video</span>
                    </div>
                  </div>

                  {uploadedVideo ? (
                    <div className="relative">
                      <div className="w-full h-64 bg-black rounded-lg flex items-center justify-center text-white">
                        <p>Video Uploaded: {uploadedVideo}</p>
                      </div>
                      <button
                        onClick={() => setUploadedVideo('')}
                        className="absolute top-3 right-3 w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingVideo(true); }}
                      onDragLeave={() => setIsDraggingVideo(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingVideo(false);
                        setUploadedVideo('recipe_video.mp4');
                      }}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        isDraggingVideo 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-foreground text-sm mb-1">Drag and drop your video here</p>
                      <p className="text-muted-foreground text-xs mb-3">MP4, WebM or Ogg (max. 50MB)</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setUploadedVideo('recipe_video.mp4')}
                      >
                        Browse Videos
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Ingredients */}
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-foreground">Ingredients</h3>
                  <Button onClick={addIngredient} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Ingredient
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g., 2 cups basmati rice"
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {ingredients.length > 1 && (
                        <button
                          onClick={() => removeIngredient(index)}
                          className="w-10 h-10 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Instructions */}
              <div className="bg-card rounded-xl shadow-sm p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-foreground">Cooking Instructions</h3>
                  <Button onClick={addStep} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Step
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index}>
                      <div className="flex gap-2 mb-2">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <textarea
                          placeholder="Describe this step..."
                          value={step}
                          onChange={(e) => updateStep(index, e.target.value)}
                          rows={3}
                          className="flex-1 px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        />
                        {steps.length > 1 && (
                          <button
                            onClick={() => removeStep(index)}
                            className="w-10 h-10 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
