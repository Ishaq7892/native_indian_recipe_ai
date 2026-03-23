import React from 'react';
import { Plus, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { RecipeCard } from '../components/RecipeCard';
import { Button } from '../components/Button';

export function Dashboard() {
  const navigate = useNavigate();
  
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
      region: 'Delhi',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwY3VycnklMjBzcGljZXN8ZW58MXx8fHwxNzczNDIwMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      prepTime: '35 min'
    },
  ];
  
  const stats = [
    { icon: BookOpen, label: 'Total Recipes', value: '24', color: 'bg-primary' },
    { icon: TrendingUp, label: 'This Month', value: '+8', color: 'bg-secondary' },
    { icon: Clock, label: 'Avg. Prep Time', value: '42 min', color: 'bg-accent' },
  ];
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-card rounded-xl p-6 shadow-sm border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl text-card-foreground">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-foreground mb-1">Your Recipes</h2>
              <p className="text-muted-foreground">Manage and explore your culinary collection</p>
            </div>
            <Button onClick={() => navigate('/create')} variant="primary" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create New Recipe
            </Button>
          </div>
          
          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
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
        </div>
      </div>
    </div>
  );
}
