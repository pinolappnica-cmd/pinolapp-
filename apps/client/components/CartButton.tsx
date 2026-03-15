"use client";
import Link from "next/link";
import { useCart } from "../hooks/useCart";

export default function CartButton() {
  const { items } = useCart();
  return (
    <Link href="/cart" className="relative">
      <span className="bg-blue-600 text-white px-3 py-1 rounded">Carrito</span>
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
          {items.length}
        </span>
      )}
    </Link>
  );
}
