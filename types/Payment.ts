export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: "PENDIENTE" | "COMPLETADO" | "FALLIDO";
  method: string;
  transactionId: string;
}
