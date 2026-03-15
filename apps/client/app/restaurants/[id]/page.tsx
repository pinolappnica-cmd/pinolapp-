import { prisma } from "../../../../database/prisma";
import MenuItem from "../../components/MenuItem";

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: Number(params.id) },
    include: { menuItems: true },
  });

  if (!restaurant) return <p>Restaurant not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <div className="grid gap-4 mt-4">
        {restaurant.menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
