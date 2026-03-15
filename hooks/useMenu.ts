"use client";
import { useEffect, useState } from "react";

export function useMenu(restaurantId: number) {
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch(`/api/menu?restaurantId=${restaurantId}`);
      const data = await res.json();
      setMenuItems(data);
    };
    if (restaurantId) {
      fetchMenu();
    }
  }, [restaurantId]);

  return { menuItems };
}
