import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Menu, Zap, Theater, Package, Shuffle, History, Wine, Drama, Box, FlaskConical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Prompt, PromptCategory } from "@shared/schema";
import avatarImage from "@assets/IMG_3071_1756310229679.jpeg";

interface CategoryInfo {
  id: PromptCategory;
  name: string;
  description: string;
  icon: typeof Wine;
  color: string;
}

const categories: CategoryInfo[] = [
  {
    id: "scenarios",
    name: "Scenarios", 
    description: "Complete scenes",
    icon: Wine,
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "characters",
    name: "Characters",
    description: "Personality quirks", 
    icon: Theater,
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: "props",
    name: "Props & Lines",
    description: "Objects & phrases",
    icon: Box,
    color: "bg-green-100 text-green-700"
  },
  {
    id: "mixed",
    name: "Spin the Bottle",
    description: "Random mix",
    icon: FlaskConical,
    color: "bg-orange-100 text-orange-700"
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>("scenarios");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentPrompts, setRecentPrompts] = useState<Prompt[]>([]);
  const { toast } = useToast();

  const { data: currentPrompt, refetch, isLoading } = useQuery<Prompt>({
    queryKey: ["/api/prompts/random", selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/prompts/random?category=${selectedCategory}`);
      if (!response.ok) {
        throw new Error('Failed to fetch prompt');
      }
      return response.json();
    },
    enabled: true
  });

  const handleGeneratePrompt = async () => {
    setIsGenerating(true);
    try {
      // Add current prompt to recent prompts before generating new one
      if (currentPrompt) {
        setRecentPrompts(prev => {
          const newRecents = [currentPrompt, ...prev.filter(p => p.id !== currentPrompt.id)];
          return newRecents.slice(0, 10); // Keep only last 10
        });
      }
      
      await new Promise(resolve => setTimeout(resolve, 800)); // Add suspense
      await refetch();
      toast({
        title: "New prompt generated!",
        description: "Fresh inspiration for your improv session."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseRecentPrompt = (prompt: Prompt) => {
    setSelectedCategory(prompt.category as PromptCategory);
    // Remove from recent prompts and set as current
    setRecentPrompts(prev => prev.filter(p => p.id !== prompt.id));
    refetch();
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryInfo = categories.find(c => c.id === category);
    return categoryInfo?.name || category;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with background image */}
      <header className="cool-gradient text-white p-6 pb-12 relative overflow-hidden">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${avatarImage})`,
            filter: 'blur(1px) brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-gray-900/40 to-stone-900/60" />
        
        <div className="relative z-10">
          <div className="text-center pt-8">
            <h1 className="text-4xl font-bold mb-2 tracking-tight">Joey's Party Tricks</h1>
            <p className="text-lg opacity-90 mb-1 font-medium">The Punchbowl</p>
          </div>
        </div>
        
        {/* Minimal decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-3xl -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-2xl translate-y-10 -translate-x-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 -mt-6 relative z-10">
        {/* Prompt Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPrompt?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Card className="gradient-card shadow-lg mb-6 border" data-testid="card-prompt">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-accent text-accent-foreground">
                    <Zap className="w-3 h-3 mr-1" />
                    {currentPrompt ? getCategoryDisplayName(currentPrompt.category) : "Loading..."}
                  </Badge>
                  
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-medium">Fresh</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">The Scene</h3>
                    <p className="text-foreground text-base leading-relaxed" data-testid="text-prompt-content">
                      {isLoading ? "Generating your perfect prompt..." : currentPrompt?.content}
                    </p>
                  </div>
                  
                  {currentPrompt?.specialElements && currentPrompt.specialElements.length > 0 && (
                    <div className="border-t border-border pt-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Special Elements</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentPrompt.specialElements.map((element, index) => (
                          <Badge 
                            key={index}
                            className="text-xs bg-blue-500 text-white border-0 font-medium"
                            data-testid={`badge-element-${index}`}
                          >
                            {element}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleGeneratePrompt}
            disabled={isGenerating || isLoading}
            className="w-full pastel-rainbow-button text-slate-700 font-semibold py-4 px-6 h-auto shadow-lg hover:shadow-xl transition-all duration-200"
            data-testid="button-generate"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                <span className="text-lg">Generating...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-6 h-6 mr-3" />
                <span className="text-lg">Generate New Prompt</span>
              </>
            )}
          </Button>
        </div>

        {/* Recent Prompts */}
        {recentPrompts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide flex items-center">
              <History className="w-4 h-4 mr-2" />
              Recent Prompts
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {recentPrompts.map((prompt) => (
                <Card 
                  key={prompt.id} 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-accent"
                  onClick={() => handleUseRecentPrompt(prompt)}
                  data-testid={`card-recent-${prompt.id}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {getCategoryDisplayName(prompt.category)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {prompt.content.length > 100 ? `${prompt.content.substring(0, 100)}...` : prompt.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Selector */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Categories
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant="outline"
                  className={cn(
                    "h-auto p-4 justify-start transition-all",
                    isSelected ? "bg-slate-700 text-white border-slate-700" : "bg-card text-foreground border-border hover:bg-slate-50"
                  )}
                  data-testid={`button-category-${category.id}`}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      isSelected ? "bg-white text-slate-700" : category.color
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium">{category.name}</div>
                      <div className={cn(
                        "text-xs",
                        isSelected ? "text-white/80" : "text-slate-600"
                      )}>{category.description}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 pt-0">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Made with 🖤 for the <span className="font-medium text-primary">Designated Driver</span> improv group
          </p>
        </div>
      </footer>
    </div>
  );
}
