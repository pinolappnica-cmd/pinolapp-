import Link from "next/link";

export default function RestaurantCard({ restaurant }: { restaurant: any }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg">
      <h2 className="text-xl font-bold">{restaurant.name}</h2>
      <p className="text-gray-600">{restaurant.category}</p>
      <p className="text-sm">{restaurant.address}</p>
      <Link href={`/restaurants/${restaurant.id}`} className="text-blue-600 hover:underline">
        Ver Menú
      </Link>
    </div>
  );
}
