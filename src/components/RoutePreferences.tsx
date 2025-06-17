import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Heart, Clock, Users, Sun, Moon } from 'lucide-react';

interface Preference {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof PreferenceIcons;
  selected: boolean;
}

const PreferenceIcons = {
  Shield,
  Heart,
  Clock,
  Users,
  Sun,
  Moon,
} as const;

interface RoutePreferencesProps {
  onSubmit: () => void;
  onBack: () => void;
}

const RoutePreferences = ({ onSubmit, onBack }: RoutePreferencesProps) => {
  const [preferences, setPreferences] = useState<Preference[]>([
    {
      id: 'safety',
      name: 'Safety First',
      description: 'Well-lit streets and populated areas',
      icon: 'Shield',
      selected: true,
    },
    {
      id: 'comfort',
      name: 'Maximum Comfort',
      description: 'Avoid steep hills and rough terrain',
      icon: 'Heart',
      selected: false,
    },
    {
      id: 'speed',
      name: 'Quick Route',
      description: 'Fastest path to destination',
      icon: 'Clock',
      selected: false,
    },
    {
      id: 'accessibility',
      name: 'Accessibility',
      description: 'Step-free routes with ramps',
      icon: 'Users',
      selected: false,
    },
    {
      id: 'daytime',
      name: 'Daytime Friendly',
      description: 'Routes optimized for daylight hours',
      icon: 'Sun',
      selected: false,
    },
    {
      id: 'nighttime',
      name: 'Night Safety',
      description: 'Extra precautions for evening travel',
      icon: 'Moon',
      selected: false,
    },
  ]);

  const togglePreference = (id: string) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.id === id ? { ...pref, selected: !pref.selected } : pref
      )
    );
  };

  const handleSubmit = () => {
    // TODO: Pass selected preferences to parent component if needed
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              Route Preferences
            </h1>
            <p className="text-valkyrie-warm-grey mt-2 text-lg font-inter">
              Help us find the best route for you
            </p>
          </div>
        </div>

        {/* Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {preferences.map((pref) => {
            const IconComponent = PreferenceIcons[pref.icon];
            return (
              <Card
                key={pref.id}
                className={`p-6 cursor-pointer transition-all transform hover:scale-[1.01] rounded-lg border-2 ${
                  pref.selected
                    ? 'border-valkyrie-charcoal bg-valkyrie-stone'
                    : 'border-valkyrie-stone bg-white hover:border-valkyrie-charcoal'
                }`}
                onClick={() => togglePreference(pref.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    pref.selected ? 'bg-valkyrie-charcoal text-white' : 'bg-valkyrie-stone text-valkyrie-charcoal'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-valkyrie-charcoal mb-1 font-playfair">
                      {pref.name}
                    </h3>
                    <p className="text-valkyrie-warm-grey font-inter">
                      {pref.description}
                    </p>
                  </div>
                  {pref.selected && (
                    <Badge className="bg-valkyrie-charcoal text-white border-none">
                      Selected
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            className="bg-valkyrie-charcoal hover:bg-valkyrie-charcoal/90 text-white p-6 rounded-lg text-lg font-inter min-w-[200px]"
          >
            Find Routes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoutePreferences;
