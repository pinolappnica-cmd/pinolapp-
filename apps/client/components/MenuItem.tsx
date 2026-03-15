"use client";
import { useCart } from "../hooks/useCart";

export default function MenuItem({ item }: { item: any }) {
  const { addItem } = useCart();
  return (
    <div className="border p-4 rounded shadow flex justify-between">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Agregar
      </button>
    </div>
  );
}
