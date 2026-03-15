import { prisma } from "../../../../database/prisma";

export default async function AdminDriversPage() {
  const drivers = await prisma.driver.findMany({ include: { user: true, orders: true } });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Repartidores</h1>
      <ul className="space-y-4">
        {drivers.map((d) => (
          <li key={d.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">Driver #{d.id}</h2>
            <p>Email: {d.user.email}</p>
            <p>Teléfono: {d.phone}</p>
            <p>Órdenes asignadas: {d.orders.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
