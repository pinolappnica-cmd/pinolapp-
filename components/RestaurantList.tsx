import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({ restaurants }: { restaurants: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
    </div>
  );
}
