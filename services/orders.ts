import axios from "axios";

export const getOrders = async (customerId?: number, restaurantId?: number) => {
  let url = "/api/orders";
  if (customerId) url += `?customerId=${customerId}`;
  if (restaurantId) url += `?restaurantId=${restaurantId}`;
  const res = await axios.get(url);
  return res.data;
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const res = await axios.post("/api/updateOrderStatus", { orderId, status });
  return res.data;
};

export const assignDriver = async (orderId: number, driverId: number) => {
  const res = await axios.post("/api/assignDriver", { orderId, driverId });
  return res.data;
};

export const getOrderHistory = async (customerId: number) => {
  const res = await axios.get(`/api/orderHistory?customerId=${customerId}`);
  return res.data;
};
