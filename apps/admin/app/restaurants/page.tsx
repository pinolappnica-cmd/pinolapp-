import { prisma } from "../../../../database/prisma";

export default async function AdminRestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany({ include: { menuItems: true } });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurantes</h1>
      <ul className="space-y-4">
        {restaurants.map((r) => (
          <li key={r.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{r.name}</h2>
            <p>{r.category}</p>
            <p>{r.address}</p>
            <p>{r.phone}</p>
            <p>Menú: {r.menuItems.length} items</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
