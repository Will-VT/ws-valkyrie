import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Bell, Map } from 'lucide-react';
import { RouteOption } from '@/pages/Index';
import MapView from './MapView';

interface RouteOptionsProps {
  onRouteSelect: (route: RouteOption) => void;
  onBack: () => void;
}

const RouteOptions = ({ onRouteSelect, onBack }: RouteOptionsProps) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Sample route data - in real app this would come from API
  const routes: RouteOption[] = [
    {
      id: '1',
      name: 'The Quick & Direct',
      description: 'Straight shot down Main Street - efficient and well-lit',
      duration: '12 min',
      distance: '0.8 mi',
      highlights: ['Well-lit sidewalks', 'Busy street with foot traffic', 'Direct path'],
      difficulty: 'easy',
      safetyScore: 8,
      accessibilityScore: 9,
    },
    {
      id: '2',
      name: 'Scenic Park Route',
      description: 'Through Riverside Park with tree-lined paths and water views',
      duration: '18 min',
      distance: '1.1 mi',
      highlights: ['Beautiful river views', 'Shaded walking paths', 'Peaceful atmosphere'],
      difficulty: 'moderate',
      safetyScore: 7,
      accessibilityScore: 8,
    },
    {
      id: '3',
      name: 'The Accessible Route',
      description: 'Completely step-free with gentle slopes and wide sidewalks',
      duration: '15 min',
      distance: '0.9 mi',
      highlights: ['No stairs or steps', 'Wide sidewalks', 'Frequent rest spots'],
      difficulty: 'easy',
      safetyScore: 9,
      accessibilityScore: 10,
    }
  ];

  const getDifficultyColor = (difficulty: 'easy' | 'moderate' | 'challenging') => {
    switch (difficulty) {
      case 'easy': return 'bg-valkyrie-sage/20 text-valkyrie-sage border-valkyrie-sage/30';
      case 'moderate': return 'bg-valkyrie-terracotta/20 text-valkyrie-terracotta border-valkyrie-terracotta/30';
      case 'challenging': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mr-4 rounded-lg"
            >
              <MapPin className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-light text-valkyrie-charcoal font-playfair">
                {routes.length} routes found
              </h1>
              <p className="text-valkyrie-warm-grey mt-2 text-lg font-inter">
                Each tailored to different needs and preferences
              </p>
            </div>
          </div>
          
          {/* View Toggle */}
          <div className="flex bg-valkyrie-stone rounded-lg p-1">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className={`rounded-md ${viewMode === 'list' ? 'bg-white text-valkyrie-charcoal' : 'text-valkyrie-warm-grey'}`}
            >
              List
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              onClick={() => setViewMode('map')}
              className={`rounded-md ${viewMode === 'map' ? 'bg-white text-valkyrie-charcoal' : 'text-valkyrie-warm-grey'}`}
            >
              <Map className="h-4 w-4 mr-2" />
              Map
            </Button>
          </div>
        </div>

        {viewMode === 'map' ? (
          <MapView 
            routes={routes} 
            onRouteSelect={onRouteSelect}
          />
        ) : (
          <>
            {/* Routes List */}
            <div className="space-y-4 mb-8">
              {routes.map((route) => (
                <Card
                  key={route.id}
                  className="p-6 cursor-pointer transition-all transform hover:scale-[1.01] hover:shadow-lg rounded-lg border-2 border-valkyrie-stone hover:border-valkyrie-charcoal"
                  onClick={() => onRouteSelect(route)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-medium text-valkyrie-charcoal font-playfair">
                          {route.name}
                        </h3>
                        <Badge className={`border ${getDifficultyColor(route.difficulty)}`}>
                          {route.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-valkyrie-warm-grey mb-3 text-lg font-inter">
                        {route.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-valkyrie-warm-grey mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{route.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bell className="h-4 w-4" />
                          <span>Safety {route.safetyScore}/10</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>Access {route.accessibilityScore}/10</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {route.highlights.map((highlight, index) => (
                          <Badge 
                            key={index}
                            variant="outline"
                            className="bg-valkyrie-cream text-valkyrie-warm-grey border-valkyrie-stone"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="ml-4 border-valkyrie-charcoal text-valkyrie-charcoal hover:bg-valkyrie-charcoal hover:text-white rounded-lg"
                      onClick={() => onRouteSelect(route)}
                    >
                      Choose route
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RouteOptions;
