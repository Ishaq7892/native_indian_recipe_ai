import React from 'react';
import { Edit, Download, Share2, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopNav } from '../components/TopNav';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function RecipePreview() {
  const navigate = useNavigate();
  
  const recipe = {
    title: "Grandma's Special Chicken Biryani",
    region: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzczMzkzMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    prepTime: '45 min',
    servings: '4-6',
    description: 'A traditional Hyderabadi biryani recipe passed down through generations, featuring fragrant basmati rice layered with succulent chicken pieces and aromatic spices.',
    ingredients: [
      '2 cups basmati rice',
      '500g chicken, cut into pieces',
      '1 cup yogurt',
      '2 large onions, sliced',
      '4 tomatoes, chopped',
      '2 tbsp ginger-garlic paste',
      '1 tsp turmeric powder',
      '2 tsp red chili powder',
      '1 tsp garam masala',
      'Fresh coriander and mint leaves',
      'Saffron strands soaked in warm milk',
      'Ghee for cooking',
      'Salt to taste'
    ],
    steps: [
      'Wash and soak basmati rice for 30 minutes. In a large pot, heat ghee and fry sliced onions until golden brown. Remove half for garnishing.',
      'To the remaining onions, add ginger-garlic paste and sauté for 2 minutes. Add chicken pieces and cook on high heat for 5 minutes.',
      'Mix in yogurt, tomatoes, turmeric, red chili powder, and salt. Cook until chicken is tender and oil separates.',
      'In another pot, boil water with whole spices (bay leaves, cinnamon, cardamom). Add soaked rice and cook until 70% done.',
      'Layer the partially cooked rice over the chicken. Sprinkle fried onions, fresh herbs, and saffron milk on top.',
      'Cover with a tight lid and cook on low heat for 20 minutes. Let it rest for 5 minutes before serving.',
      'Gently mix the biryani and serve hot with raita and pickle.'
    ]
  };
  
  const handleExportPDF = () => {
    // In real app, would generate PDF
    alert('Exporting to PDF...');
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
              <Button onClick={() => navigate('/create')} variant="outline" size="md">
                <Edit className="w-4 h-4 mr-2" />
                Edit Recipe
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" size="md">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={handleExportPDF} variant="primary" size="md">
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
              </div>
            </div>
            
            {/* Recipe Card */}
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
              {/* Hero Image */}
              <div className="relative h-96">
                <ImageWithFallback
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm mb-3">
                    {recipe.region}
                  </div>
                  <h1 className="text-4xl mb-4">{recipe.title}</h1>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                {/* Description */}
                <div className="mb-8">
                  <p className="text-lg text-foreground leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
                
                {/* Ingredients */}
                <div className="mb-8">
                  <h2 className="text-2xl text-foreground mb-4 pb-2 border-b-2 border-primary/20">
                    Ingredients
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-foreground">{ingredient}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Instructions */}
                <div>
                  <h2 className="text-2xl text-foreground mb-4 pb-2 border-b-2 border-primary/20">
                    Cooking Instructions
                  </h2>
                  <div className="space-y-6">
                    {recipe.steps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <p className="text-foreground pt-2 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Traditional Note */}
                <div className="mt-8 p-6 bg-accent/10 border-l-4 border-accent rounded-lg">
                  <h3 className="text-lg text-foreground mb-2">Traditional Recipe Note</h3>
                  <p className="text-foreground">
                    This authentic Hyderabadi biryani recipe has been preserved and passed down through 
                    generations, maintaining the traditional cooking methods and spice combinations that 
                    make it truly special.
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
