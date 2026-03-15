import axios from "axios";

export const getCart = async (customerId: number) => {
  const res = await axios.get(`/api/cart?customerId=${customerId}`);
  return res.data;
};

export const addToCart = async (customerId: number, itemId: number, quantity: number) => {
  const res = await axios.post("/api/cart", { customerId, itemId, quantity });
  return res.data;
};

export const removeFromCart = async (customerId: number, itemId: number) => {
  const res = await axios.delete("/api/cart", { data: { customerId, itemId } });
  return res.data;
};
