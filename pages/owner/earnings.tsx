import { useEffect, useState } from "react";
import { getOrders } from "../../services/orders";
import { formatPrice } from "../../utils/formatPrice";

export default function OwnerEarningsPage() {
  const [earnings, setEarnings] = useState<number>(0);
  const restaurantId = 2; // ejemplo

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrders(undefined, restaurantId);
      const total = data.reduce((sum: number, o: any) => sum + o.total, 0);
      setEarnings(total);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Ganancias del restaurante</h1>
      <p>Total acumulado: {formatPrice(earnings)}</p>
    </div>
  );
}
