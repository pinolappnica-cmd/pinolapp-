import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../services/orders";

export default function OwnerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const restaurantId = 2; // ejemplo: ID del restaurante logueado

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrders(undefined, restaurantId);
      setOrders(data);
    };
    fetchData();
  }, []);

  const handleStatus = async (orderId: number, status: string) => {
    await updateOrderStatus(orderId, status);
    const data = await getOrders(undefined, restaurantId);
    setOrders(data);
  };

  return (
    <div>
      <h1>Órdenes recibidas</h1>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            Orden #{o.id} - Total: C${o.total} - Estado: {o.status}
            <button onClick={() => handleStatus(o.id, "EN_PROCESO")}>Aceptar</button>
            <button onClick={() => handleStatus(o.id, "ENTREGADO")}>Marcar entregada</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
