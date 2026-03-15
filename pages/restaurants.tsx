import { useEffect, useState } from "react";
import { getRestaurants } from "../services/restaurantService";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRestaurants();
      setRestaurants(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Restaurantes</h1>
      <ul>
        {restaurants.map((r) => (
          <li key={r.id}>
            <a href={`/menu/${r.id}`}>{r.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
