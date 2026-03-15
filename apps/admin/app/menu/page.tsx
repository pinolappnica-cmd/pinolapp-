import { prisma } from "../../../../database/prisma";

export default async function AdminMenuPage() {
  const menuItems = await prisma.menuItem.findMany({ include: { restaurant: true } });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menús</h1>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.id} className="border p-2 rounded">
            <strong>{item.name}</strong> - ${item.price.toFixed(2)}  
            <span className="text-gray-600"> ({item.restaurant.name})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
