import { OrderItem } from "./menu";
import { Payment } from "./payment";

export interface Order {
  id: number;
  customerId: number;
  restaurantId: number;
  status: "PENDIENTE" | "EN_PROCESO" | "ENTREGADO" | "CANCELADO";
  total: number;
  items: OrderItem[];
  payment?: Payment;
}
