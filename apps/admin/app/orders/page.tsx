import { prisma } from "../../../../database/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, driver: true, items: { include: { menuItem: true } } },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Órdenes</h1>
      {orders.map((order) => (
        <div key={order.id} className="border p-4 rounded mb-4">
          <h2 className="font-semibold">Orden #{order.id}</h2>
          <p>Cliente: {order.user.email}</p>
          <p>Estado: {order.status}</p>
          <p>Repartidor: {order.driver ? order.driver.userId : "No asignado"}</p>
          <ul className="mt-2">
            {order.items.map((i) => (
              <li key={i.id}>
                {i.menuItem.name} x {i.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
