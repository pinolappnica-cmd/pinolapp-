import RestaurantList from "../components/RestaurantList";
import { prisma } from "../../../database/prisma";

export default async function HomePage() {
  const restaurants = await prisma.restaurant.findMany();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Restaurants</h1>
      <RestaurantList restaurants={restaurants} />
    </div>
  );
}
