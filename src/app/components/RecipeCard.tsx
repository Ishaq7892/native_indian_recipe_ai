import React from 'react';
import { Clock, ChefHat } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RecipeCardProps {
  title: string;
  region: string;
  image: string;
  prepTime?: string;
  onClick?: () => void;
}

export function RecipeCard({ title, region, image, prepTime = '30 min', onClick }: RecipeCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {prepTime}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg mb-1 text-card-foreground">{title}</h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <ChefHat className="w-4 h-4" />
          <span>{region}</span>
        </div>
      </div>
    </div>
  );
}
