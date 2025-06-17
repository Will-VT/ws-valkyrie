import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Bell, ArrowLeft, Share2, Download, Navigation, Lightbulb, ArrowRight } from 'lucide-react';
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

        {/* Step-by-Step Directions */}
        <Card className="p-6 rounded-lg border-2 border-valkyrie-stone mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-valkyrie-charcoal font-playfair">
              Step-by-Step Directions
            </h3>
            <div className="flex items-center space-x-4 text-valkyrie-warm-grey">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {route.directions.totalTime}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {route.directions.totalDistance}
              </span>
            </div>
          </div>
          
          <p className="text-valkyrie-warm-grey mb-6">
            {route.directions.description}
          </p>

          <div className="space-y-4">
            {route.directions.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-valkyrie-cream flex items-center justify-center text-valkyrie-charcoal font-medium">
                  {index + 1}
                </div>
                <p className="text-valkyrie-charcoal leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Local Tips */}
        {route.localTips && route.localTips.length > 0 && (
          <Card className="p-6 rounded-lg border-2 border-valkyrie-stone mb-8 bg-valkyrie-cream/30">
            <div className="flex items-start space-x-4">
              <Lightbulb className="h-6 w-6 text-valkyrie-terracotta flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-medium text-valkyrie-charcoal font-playfair mb-2">
                  {route.localTips[0].title}
                </h3>
                <p className="text-valkyrie-warm-grey leading-relaxed">
                  {route.localTips[0].content}
                </p>
              </div>
            </div>
          </Card>
        )}

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