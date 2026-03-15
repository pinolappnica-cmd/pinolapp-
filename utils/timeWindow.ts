// Verifica si la app está disponible entre 6pm y 11pm
export const isAppAvailable = (): boolean => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 18 && hour < 23;
};
