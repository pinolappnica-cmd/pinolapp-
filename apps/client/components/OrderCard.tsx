import OrderTracker from "./OrderTracker";

export default function OrderCard({ order }: { order: any }) {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h3 className="font-semibold">Orden #{order.id}</h3>
      <p>Estado: {order.status}</p>
      <OrderTracker status={order.status} />
      <ul className="mt-2">
        {order.items.map((i: any) => (
          <li key={i.id}>
            {i.menuItem.name} x {i.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
