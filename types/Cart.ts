import { MenuItem } from "./menu";

export interface CartItem {
  id: number;
  customerId: number;
  menuItemId: number;
  quantity: number;
  menuItem: MenuItem;
}
