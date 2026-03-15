export interface Notification {
  id: number;
  customerId: number;
  message: string;
  type: "PUSH" | "EMAIL" | "SMS";
  status: "ENVIADO" | "PENDIENTE";
}
