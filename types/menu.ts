export interface MenuItem {
  id: number;
  name: string;
  price: number;
  restaurantId: number;
}

export interface OrderItem {
  menuItemId: number;
  quantity: number;
  price: number;
}
