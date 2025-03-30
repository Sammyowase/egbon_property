'use client'

import { useEffect, useRef, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'

interface Property {
  title: string;
  location: string;
  price: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface PropertyMapProps {
  properties: Property[];
}

function MapComponent({ properties }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initialMap = new google.maps.Map(mapRef.current, {
      center: { lat: 6.5244, lng: 3.3792 }, // Lagos coordinates
      zoom: 10,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d4af37" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }]
        }
      ]
    });

    setMap(initialMap);

    // Clean up markers on unmount
    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    properties.forEach(property => {
      const marker = new google.maps.Marker({
        position: property.position,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#d4af37",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
        title: property.title
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold text-black">${property.title}</h3>
            <p class="text-gray-600">${property.location}</p>
            <p class="text-primary-gold font-bold">${property.price}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        activeInfoWindow?.close();
        infoWindow.open(map, marker);
        setActiveInfoWindow(infoWindow);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, properties]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <MapComponent properties={properties} />
    </Wrapper>
  );
} 