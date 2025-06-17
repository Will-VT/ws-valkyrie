
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface WelcomeScreenProps {
  onStartPlanning: (context: string) => void;
}

const WelcomeScreen = ({ onStartPlanning }: WelcomeScreenProps) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = () => {
    if (from && to) {
      onStartPlanning(`From ${from} to ${to}`);
    }
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFrom(`Current location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`);
        },
        (error) => {
          console.error('Error getting location:', error);
          setFrom('Unable to get location');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
      setFrom('Location not supported');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          style={{ filter: 'brightness(0.4) contrast(1.2) sepia(0.1)' }}
          onError={(e) => {
            console.log('Video failed to load:', e);
            // Hide video element if it fails to load
            e.currentTarget.style.display = 'none';
          }}
        >
          <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        {/* Subtle grain texture overlay for midcentury feel */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23000' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/lovable-uploads/c871c807-ca87-44e5-9e92-0a07b769c7a0.png" 
              alt="Valkyrie Logo" 
              className="w-16 h-16 mr-4 drop-shadow-lg"
            />
            <div>
              <h1 className="text-6xl font-light text-white mb-2 font-playfair tracking-tight drop-shadow-xl">Valkyrie</h1>
              <p className="text-lg text-stone-200 font-inter drop-shadow-lg">Navigate with purpose</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-light text-white mb-6 font-playfair max-w-3xl mx-auto leading-tight drop-shadow-xl">
            Thoughtful routing for the way you really move through the city
          </h2>
          <p className="text-xl text-stone-200 leading-relaxed max-w-2xl mx-auto font-inter drop-shadow-lg">
            Routes designed around safety, accessibility, and personal comfort—not just speed.
          </p>
        </div>

        {/* Main Planning Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg p-8 shadow-2xl">
            <div className="space-y-6">
              {/* Location Inputs */}
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-valkyrie-sage" />
                  <Input
                    placeholder="Where are you starting from?"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="pl-14 h-14 text-lg bg-white border-2 border-valkyrie-stone focus:border-valkyrie-charcoal rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUseLocation}
                    className="absolute right-3 top-3 h-8 px-3 text-sm bg-white hover:bg-valkyrie-stone/20 border-valkyrie-stone text-valkyrie-charcoal"
                  >
                    Use location
                  </Button>
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-valkyrie-terracotta" />
                  <Input
                    placeholder="Where would you like to go?"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="pl-14 h-14 text-lg bg-white border-2 border-valkyrie-stone focus:border-valkyrie-charcoal rounded-lg"
                  />
                </div>
              </div>

              {/* Primary CTA */}
              <Button
                onClick={handleSubmit}
                disabled={!from || !to}
                className="w-full bg-valkyrie-charcoal hover:bg-valkyrie-navy text-white h-16 text-xl font-medium rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-inter shadow-lg"
              >
                Plan my route
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-valkyrie-terracotta/90 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3 font-playfair drop-shadow-lg">Safety First</h3>
            <p className="text-stone-200 text-base leading-relaxed font-inter drop-shadow-md">Well-lit paths based on real safety data and local knowledge</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-valkyrie-sage/90 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3 font-playfair drop-shadow-lg">Universal Access</h3>
            <p className="text-stone-200 text-base leading-relaxed font-inter drop-shadow-md">Step-free routes and mobility-conscious pathfinding</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-valkyrie-navy/90 backdrop-blur-sm rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3 font-playfair drop-shadow-lg">Personal Comfort</h3>
            <p className="text-stone-200 text-base leading-relaxed font-inter drop-shadow-md">Routes with the amenities and atmosphere you prefer</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-stone-200 max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed font-inter drop-shadow-md">
            Valkyrie considers your individual needs—safety concerns, accessibility requirements, and personal preferences—to create routes that work for real people navigating real cities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
