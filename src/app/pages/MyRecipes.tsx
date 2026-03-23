import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { RecipeCard } from '../components/RecipeCard';
import { Button } from '../components/Button';

export function MyRecipes() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedRegion, setSelectedRegion] = useState('All');
  
  const regions = ['All', 'Kerala', 'Punjab', 'Tamil Nadu', 'Gujarat', 'Maharashtra', 'Karnataka', 'Hyderabad'];
  
  const recipes = [
    {
      id: 1,
      title: 'Chicken Biryani',
      region: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzczMzkzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      prepTime: '45 min'
    },
    {
      id: 2,
      title: 'Masala Dosa',
      region: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1665660710687-b44c50751054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3NhJTIwc291dGglMjBpbmRpYW58ZW58MXx8fHwxNzczMzgwNTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      prepTime: '30 min'
    },
    {
      id: 3,
      title: 'Punjabi Samosa',
      region: 'Punjab',
      image: 'https://images.unsplash.com/photo-1627670381055-487000952cb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBmcmllZCUyMHNuYWNrfGVufDF8fHx8MTc3MzM5NTkxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      prepTime: '40 min'
    },
    {
      id: 4,
      title: 'Tandoori Chicken',
      region: 'Punjab',
      image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5kb29yaSUyMGNoaWNrZW4lMjBpbmRpYW58ZW58MXx8fHwxNzczNDExNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      prepTime: '60 min'
    },
    {
      id: 5,
      title: 'Paneer Butter Masala',
      region: 'Punjab',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwY3VycnklMjBzcGljZXN8ZW58MXx8fHwxNzczNDIwMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      prepTime: '35 min'
    },
    {
      id: 6,
      title: 'Fish Curry',
      region: 'Kerala',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwY3VycnklMjBzcGljZXN8ZW58MXx8fHwxNzczNDIwMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      prepTime: '50 min'
    }
  ];
  
  const filteredRecipes = selectedRegion === 'All' 
    ? recipes 
    : recipes.filter(r => r.region === selectedRegion);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h2 className="text-2xl text-foreground mb-1">My Recipes</h2>
            <p className="text-muted-foreground">Browse and manage your recipe collection</p>
          </div>
          
          {/* Filters and View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-card p-4 rounded-xl border border-border">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedRegion === region
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-card shadow-sm' : 'hover:bg-card/50'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-card shadow-sm' : 'hover:bg-card/50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
            </p>
          </div>
          
          {/* Recipe Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  region={recipe.region}
                  image={recipe.image}
                  prepTime={recipe.prepTime}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className="bg-card rounded-xl shadow-sm border border-border p-4 hover:shadow-lg transition-all cursor-pointer flex gap-4"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg text-foreground mb-2">{recipe.title}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>📍 {recipe.region}</span>
                      <span>⏱️ {recipe.prepTime}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Recipe</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
