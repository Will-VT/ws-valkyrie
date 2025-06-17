import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Bell, ArrowLeft, Share2, Download, Navigation } from 'lucide-react';
import { RouteOption } from '@/pages/Index';
import MapView from './MapView';

interface RouteDetailsProps {
  route: RouteOption;
  onBack: () => void;
  onStartNavigation: () => void;
}

const RouteDetails = ({ route, onBack, onStartNavigation }: RouteDetailsProps) => {
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
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mr-4 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-light text-valkyrie-charcoal font-playfair">
              {route.name}
            </h1>
            <p className="text-valkyrie-warm-grey mt-2 text-lg font-inter">
              {route.description}
            </p>
          </div>
        </div>

        {/* Map View */}
        <div className="mb-8 h-[400px] rounded-lg overflow-hidden border-2 border-valkyrie-stone">
          <MapView 
            routes={[route]} 
            selectedRouteId={route.id}
            interactive={true}
          />
        </div>

        {/* Route Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 rounded-lg border-2 border-valkyrie-stone">
            <h3 className="text-xl font-medium text-valkyrie-charcoal font-playfair mb-4">
              Route Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-valkyrie-warm-grey" />
                  <span className="text-valkyrie-charcoal">Duration</span>
                </div>
                <span className="text-valkyrie-warm-grey">{route.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-valkyrie-warm-grey" />
                  <span className="text-valkyrie-charcoal">Distance</span>
                </div>
                <span className="text-valkyrie-warm-grey">{route.distance}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-valkyrie-warm-grey" />
                  <span className="text-valkyrie-charcoal">Safety Score</span>
                </div>
                <div className="flex items-center">
                  <span className="text-valkyrie-warm-grey">{route.safetyScore}/10</span>
                  <Badge className={`ml-2 ${getDifficultyColor(route.difficulty)}`}>
                    {route.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-valkyrie-warm-grey" />
                  <span className="text-valkyrie-charcoal">Accessibility</span>
                </div>
                <span className="text-valkyrie-warm-grey">{route.accessibilityScore}/10</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-lg border-2 border-valkyrie-stone">
            <h3 className="text-xl font-medium text-valkyrie-charcoal font-playfair mb-4">
              Route Highlights
            </h3>
            <div className="space-y-3">
              {route.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Badge 
                    variant="outline"
                    className="bg-valkyrie-cream text-valkyrie-warm-grey border-valkyrie-stone"
                  >
                    {highlight}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            variant="default"
            size="lg"
            className="bg-valkyrie-charcoal text-white hover:bg-valkyrie-charcoal/90 rounded-lg"
            onClick={onStartNavigation}
          >
            <Navigation className="h-5 w-5 mr-2" />
            Start Navigation
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-valkyrie-charcoal text-valkyrie-charcoal hover:bg-valkyrie-charcoal hover:text-white rounded-lg"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Route
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-valkyrie-charcoal text-valkyrie-charcoal hover:bg-valkyrie-charcoal hover:text-white rounded-lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;