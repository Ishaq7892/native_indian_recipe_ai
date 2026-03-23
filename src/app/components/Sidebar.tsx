import React from 'react';
import { LayoutDashboard, Plus, BookOpen, Mic, Download, ChefHat } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/create', icon: Plus, label: 'Create Recipe' },
    { path: '/recipes', icon: BookOpen, label: 'My Recipes' },
    { path: '/voice-recipe', icon: Mic, label: 'Voice Recipe' },
    { path: '/export', icon: Download, label: 'Export' },
  ];
  
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg text-sidebar-foreground">Native Indian</h1>
            <p className="text-xs text-muted-foreground">Recipe Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <p className="text-sm text-sidebar-accent-foreground mb-2">
            Preserve traditional recipes for future generations
          </p>
        </div>
      </div>
    </div>
  );
}
