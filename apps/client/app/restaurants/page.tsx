import { prisma } from "../../../../database/prisma";
import RestaurantList from "../../components/RestaurantList";

export default async function RestaurantsPage() {
  const restaurants = await prisma.restaurant.findMany();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Todos los Restaurantes</h1>
      <RestaurantList restaurants={restaurants} />
    </div>
  );
}
