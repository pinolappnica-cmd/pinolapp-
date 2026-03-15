"use client";
import { useCart } from "../hooks/useCart";

export default function CartExample() {
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Mi Carrito</h2>

      {items.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>{item.name} (${item.price})</span>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="w-12 border rounded"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Quitar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => clearCart()}
        className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
      >
        Vaciar Carrito
      </button>

      <button
        onClick={() => addItem({ id: 1, name: "Producto Demo", price: 10 })}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Agregar Producto Demo
      </button>
    </div>
  );
                     }
