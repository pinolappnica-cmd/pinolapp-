export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("es-NI", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("es-NI", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
