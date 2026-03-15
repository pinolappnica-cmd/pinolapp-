export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const regex = /^[0-9]{8}$/; // ejemplo: 8 dígitos para Nicaragua
  return regex.test(phone);
};
