"use client";
import { useCart } from "../../hooks/useCart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      {items.length === 0 ? <p>Empty cart</p> : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between p-2 border">
              <span>{item.name} (${item.price})</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
}
