import { useEffect, useRef } from 'react';
import { RouteOption } from '@/pages/Index';

interface MapViewProps {
  routes: RouteOption[];
  selectedRouteId?: string;
  interactive?: boolean;
  onRouteSelect?: (route: RouteOption) => void;
}

const MapView = ({ routes, selectedRouteId, interactive = false, onRouteSelect }: MapViewProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Implement actual map integration with a mapping service
    // For now, we'll just show a placeholder
    if (mapContainerRef.current) {
      const ctx = document.createElement('canvas').getContext('2d');
      if (ctx) {
        ctx.canvas.width = mapContainerRef.current.clientWidth;
        ctx.canvas.height = mapContainerRef.current.clientHeight;
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = '20px Inter';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('Map View', ctx.canvas.width / 2, ctx.canvas.height / 2);
        mapContainerRef.current.innerHTML = '';
        mapContainerRef.current.appendChild(ctx.canvas);
      }
    }
  }, [routes, selectedRouteId]);

  return (
    <div 
      ref={mapContainerRef} 
      className={`w-full h-full bg-valkyrie-stone ${interactive ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (interactive && onRouteSelect && routes.length === 1) {
          onRouteSelect(routes[0]);
        }
      }}
    />
  );
};

export default MapView;
