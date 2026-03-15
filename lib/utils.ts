// Funciones utilitarias generales

export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
