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
      directions: {
        totalTime: '12 minutes',
        totalDistance: '0.8 miles',
        description: 'This route avoids poorly lit alleys and takes 12 minutes. There are 2 street crossings with traffic lights.',
        steps: [
          'Head north on Cedar Street for 0.2 miles (about a 5-minute walk past the coffee shop with the red awning)',
          'Turn right onto Oak Avenue and walk for 0.3 miles - you\'ll see a lovely park with a fountain on your left',
          'Cross at the traffic light by the bookstore and continue straight',
          'Turn left onto Maple Boulevard just after the flower shop with the blue door',
          'Your destination will be on the right, next to the bakery with the striped canopy'
        ]
      },
      localTips: [{
        title: 'Local Tip',
        content: 'The crosswalk at Oak Avenue can get busy during rush hour. If you\'re walking between 5-6pm, you might want to use the pedestrian bridge about 100ft further down the street. Also, the park along the route has public water fountains if you need a quick break!'
      }]
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
      directions: {
        totalTime: '18 minutes',
        totalDistance: '1.1 miles',
        description: 'A scenic route through Riverside Park with beautiful views and plenty of shade.',
        steps: [
          'Start on Cedar Street and head towards the park entrance',
          'Follow the main path through Riverside Park for 0.4 miles',
          'Take the riverside trail when you reach the fork in the path',
          'Exit the park at the north gate and continue on Oak Avenue',
          'Your destination will be on the left after the park'
        ]
      },
      localTips: [{
        title: 'Local Tip',
        content: 'The park has beautiful cherry blossoms in spring and colorful foliage in fall. The riverside trail can get muddy after rain, so consider the main path if it\'s been wet recently.'
      }]
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
      directions: {
        totalTime: '15 minutes',
        totalDistance: '0.9 miles',
        description: 'A fully accessible route with no stairs, gentle slopes, and wide sidewalks.',
        steps: [
          'Begin on Cedar Street and follow the wide sidewalk',
          'Take the ramp at the corner of Oak Avenue',
          'Continue on the accessible path through the plaza',
          'Use the pedestrian crossing with audio signals',
          'Your destination will be on the right with a wheelchair-accessible entrance'
        ]
      },
      localTips: [{
        title: 'Local Tip',
        content: 'The plaza has several benches and rest areas along the way. There\'s also an accessible public restroom near the fountain if needed.'
      }]
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
