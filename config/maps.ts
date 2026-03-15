// Configuración de Google Maps
export const mapsConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  defaultCenter: { lat: 12.1364, lng: -86.2510 }, // Managua como centro por defecto
  defaultZoom: 14,
};
