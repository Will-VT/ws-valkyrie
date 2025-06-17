import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import RoutePreferences from '@/components/RoutePreferences';
import RouteOptions from '@/components/RouteOptions';
import RouteDetails from '@/components/RouteDetails';

export type RoutePreference = {
  id: string;
  name: string;
  description: string;
  icon: string;
  selected: boolean;
};

export type RouteOption = {
  id: string;
  name: string;
  description: string;
  duration: string;
  distance: string;
  highlights: string[];
  difficulty: 'easy' | 'moderate' | 'challenging';
  safetyScore: number;
  accessibilityScore: number;
};

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'preferences' | 'routes' | 'details'>('welcome');
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);

  const handleStartPlanning = () => {
    setCurrentStep('preferences');
  };

  const handlePreferencesComplete = () => {
    setCurrentStep('routes');
  };

  const handleRouteSelect = (route: RouteOption) => {
    setSelectedRoute(route);
    setCurrentStep('details');
  };

  const handleBack = () => {
    if (currentStep === 'details') setCurrentStep('routes');
    else if (currentStep === 'routes') setCurrentStep('preferences');
    else if (currentStep === 'preferences') setCurrentStep('welcome');
  };

  const handleRouteDetailsBack = () => {
    setCurrentStep('routes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {currentStep === 'welcome' && (
        <WelcomeScreen onStartPlanning={handleStartPlanning} />
      )}
      
      {currentStep === 'preferences' && (
        <RoutePreferences 
          onSubmit={handlePreferencesComplete}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 'routes' && (
        <RouteOptions 
          onRouteSelect={handleRouteSelect}
          onBack={handleBack}
        />
      )}
      
      {currentStep === 'details' && selectedRoute && (
        <RouteDetails 
          route={selectedRoute}
          onBack={handleRouteDetailsBack}
          onStartNavigation={() => {
            // TODO: Implement navigation start logic
            console.log('Starting navigation');
          }}
        />
      )}
    </div>
  );
};

export default Index;
