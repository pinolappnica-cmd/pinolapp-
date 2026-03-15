"use client";
import { useEffect, useRef } from "react";

export default function MapRoute({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 14,
      });
      new google.maps.Marker({ position: { lat, lng }, map });
    }
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-64 rounded shadow" />;
}
