"use client";
import { useEffect, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const createOrder = async (items: any[], deliveryAddress: string, deliveryLat: number, deliveryLng: number) => {
    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ items, deliveryAddress, deliveryLat, deliveryLng }),
    });
    return await res.json();
  };

  return { orders, createOrder };
}
