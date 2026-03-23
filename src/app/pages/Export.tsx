import React, { useState } from 'react';
import { Download, FileText, CheckCircle } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Export() {
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  
  const recipes = [
    {
      id: 1,
      title: 'Chicken Biryani',
      region: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzczMzkzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 2,
      title: 'Masala Dosa',
      region: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1665660710687-b44c50751054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3NhJTIwc291dGglMjBpbmRpYW58ZW58MXx8fHwxNzczMzgwNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      title: 'Punjabi Samosa',
      region: 'Punjab',
      image: 'https://images.unsplash.com/photo-1627670381055-487000952cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBmcmllZCUyMHNuYWNrfGVufDF8fHx8MTc3MzM5NTkxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];
  
  const toggleRecipe = (id: number) => {
    setSelectedRecipes(prev =>
      prev.includes(id) ? prev.filter(recipeId => recipeId !== id) : [...prev, id]
    );
  };
  
  const selectAll = () => {
    setSelectedRecipes(recipes.map(r => r.id));
  };
  
  const deselectAll = () => {
    setSelectedRecipes([]);
  };
  
  const handleExport = () => {
    alert(`Exporting ${selectedRecipes.length} recipe(s) as PDF...`);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl text-foreground mb-2">Export Recipes</h2>
              <p className="text-muted-foreground">
                Select recipes to export as beautifully formatted PDF documents
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recipe Selection */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg text-foreground">Select Recipes</h3>
                    <div className="flex gap-2">
                      <Button onClick={selectAll} variant="outline" size="sm">
                        Select All
                      </Button>
                      <Button onClick={deselectAll} variant="ghost" size="sm">
                        Deselect All
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        onClick={() => toggleRecipe(recipe.id)}
                        className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedRecipes.includes(recipe.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedRecipes.includes(recipe.id)
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`}>
                          {selectedRecipes.includes(recipe.id) && (
                            <CheckCircle className="w-5 h-5 text-primary-foreground" />
                          )}
                        </div>
                        <ImageWithFallback
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="text-foreground">{recipe.title}</h4>
                          <p className="text-sm text-muted-foreground">{recipe.region}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Export Options */}
              <div>
                <div className="bg-card rounded-xl shadow-sm border border-border p-6 sticky top-6">
                  <h3 className="text-lg text-foreground mb-4">Export Options</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="text-foreground mb-1">PDF Format</p>
                          <p className="text-sm text-muted-foreground">
                            Professional printable layout with images
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 text-foreground text-sm">Page Size</label>
                      <select className="w-full px-4 py-2.5 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>A4 (Standard)</option>
                        <option>Letter</option>
                        <option>Legal</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm text-foreground">Include images</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm text-foreground">Include regional info</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-foreground">Add cover page</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <p className="text-sm text-foreground">
                      <strong>{selectedRecipes.length}</strong> recipe{selectedRecipes.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleExport}
                    disabled={selectedRecipes.length === 0}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export as PDF
                  </Button>
                </div>
                
                {/* Preview Card */}
                <div className="mt-6 bg-card rounded-xl shadow-sm border border-border p-6">
                  <h3 className="text-foreground mb-3">Export Preview</h3>
                  <div className="bg-muted rounded-lg p-4 border-2 border-dashed border-border">
                    <div className="aspect-[8.5/11] bg-white rounded shadow-sm flex items-center justify-center">
                      <FileText className="w-12 h-12 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Preview will appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
