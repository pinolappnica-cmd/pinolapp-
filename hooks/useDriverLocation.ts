"use client";
import { useEffect, useState } from "react";

export function useDriverLocation(driverId: number) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`/api/driver?id=${driverId}`);
      const data = await res.json();
      if (data && data.lat && data.lng) {
        setLocation({ lat: data.lat, lng: data.lng });
      }
    }, 5000); // cada 5 segundos

    return () => clearInterval(interval);
  }, [driverId]);

  return location;
}
