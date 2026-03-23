import React from 'react';
import { Mic, Upload, Edit, Save, Download, ChefHat, Plus, Clock } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

export function DesignSystemShowcase() {
  return (
    <div className="p-8 space-y-12 bg-background">
      {/* Color Palette */}
      <section>
        <h2 className="text-2xl mb-6 text-foreground">Color Palette</h2>
        <p className="text-muted-foreground mb-6">
          Inspired by Indian food culture - saffron orange, turmeric yellow, leaf green, warm beige
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="bg-primary h-24 rounded-lg mb-2 shadow-md"></div>
            <p className="text-sm text-foreground">Primary</p>
            <p className="text-xs text-muted-foreground">Saffron Orange</p>
          </div>
          <div>
            <div className="bg-secondary h-24 rounded-lg mb-2 shadow-md"></div>
            <p className="text-sm text-foreground">Secondary</p>
            <p className="text-xs text-muted-foreground">Turmeric Yellow</p>
          </div>
          <div>
            <div className="bg-accent h-24 rounded-lg mb-2 shadow-md"></div>
            <p className="text-sm text-foreground">Accent</p>
            <p className="text-xs text-muted-foreground">Leaf Green</p>
          </div>
          <div>
            <div className="bg-muted h-24 rounded-lg mb-2 shadow-md border border-border"></div>
            <p className="text-sm text-foreground">Muted</p>
            <p className="text-xs text-muted-foreground">Warm Beige</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl mb-6 text-foreground">Typography</h2>
        <div className="space-y-4 bg-card p-6 rounded-xl border border-border">
          <div>
            <h1 className="text-foreground">Heading 1 - Large Title</h1>
            <p className="text-sm text-muted-foreground">text-2xl, font-medium</p>
          </div>
          <div>
            <h2 className="text-foreground">Heading 2 - Section Title</h2>
            <p className="text-sm text-muted-foreground">text-xl, font-medium</p>
          </div>
          <div>
            <h3 className="text-foreground">Heading 3 - Subsection</h3>
            <p className="text-sm text-muted-foreground">text-lg, font-medium</p>
          </div>
          <div>
            <p className="text-foreground">Body Text - Regular paragraph content for recipes and descriptions</p>
            <p className="text-sm text-muted-foreground">text-base, font-normal</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl mb-6 text-foreground">Buttons</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 bg-card p-6 rounded-xl border border-border">
            <Button variant="primary" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Primary Large
            </Button>
            <Button variant="primary" size="md">
              <Save className="w-4 h-4 mr-2" />
              Primary Medium
            </Button>
            <Button variant="primary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Primary Small
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 bg-card p-6 rounded-xl border border-border">
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="outline" size="md">Outline</Button>
            <Button variant="ghost" size="md">Ghost</Button>
          </div>
        </div>
      </section>

      {/* Input Fields */}
      <section>
        <h2 className="text-2xl mb-6 text-foreground">Input Fields</h2>
        <div className="bg-card p-6 rounded-xl border border-border space-y-4 max-w-md">
          <Input label="Recipe Title" placeholder="Enter recipe name" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input label="With Error" error="This field is required" />
        </div>
      </section>

      {/* Icons */}
      <section>
        <h2 className="text-2xl mb-6 text-foreground">Icons</h2>
        <p className="text-muted-foreground mb-6">
          Using Lucide React for consistent, crisp iconography
        </p>
        <div className="flex flex-wrap gap-8 bg-card p-6 rounded-xl border border-border">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <Mic className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground">Voice</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <Upload className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground">Upload</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <Edit className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground">Edit</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <Save className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground">Save</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <Download className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground">Export</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-2">
              <ChefHat className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-foreground">Chef</p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl mb-6 text-foreground">Cards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl shadow-md p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg text-card-foreground">Recipe Card</h3>
                <p className="text-sm text-muted-foreground">With icon header</p>
              </div>
            </div>
            <p className="text-card-foreground">
              Clean card design with rounded corners, soft shadows, and proper spacing
            </p>
          </div>
          
          <div className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
            <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Clock className="w-12 h-12 text-primary" />
            </div>
            <div className="p-6">
              <h3 className="text-lg text-card-foreground mb-2">Image Card</h3>
              <p className="text-muted-foreground">
                Perfect for recipe thumbnails with gradient overlays
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section>
        <h2 className="text-2xl mb-6 text-foreground">Design Principles</h2>
        <div className="bg-card rounded-xl shadow-sm p-6 border border-border space-y-4">
          <div>
            <h3 className="text-lg text-foreground mb-2">🎨 Culturally Inspired</h3>
            <p className="text-muted-foreground">
              Colors reflect traditional Indian spices and ingredients - saffron, turmeric, fresh herbs, and warm earthtones
            </p>
          </div>
          <div>
            <h3 className="text-lg text-foreground mb-2">✨ Minimal & Modern</h3>
            <p className="text-muted-foreground">
              Clean interfaces with plenty of white space, rounded corners, and subtle shadows
            </p>
          </div>
          <div>
            <h3 className="text-lg text-foreground mb-2">📱 Mobile-Friendly</h3>
            <p className="text-muted-foreground">
              Responsive layouts that work beautifully on all device sizes
            </p>
          </div>
          <div>
            <h3 className="text-lg text-foreground mb-2">🔍 Clear Hierarchy</h3>
            <p className="text-muted-foreground">
              Consistent typography scale and visual weight guides users through content
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
