import { useEffect, useState } from "react";
import { getEarnings } from "../../services/earningsService";
import { formatPrice } from "../../utils/formatPrice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEarnings();
      setData(result);
    };
    fetchData();
  }, []);

  if (!data) return <p>Cargando...</p>;

  // Ejemplo: supongamos que el backend devuelve ingresos por día
  const chartData = {
    labels: data.daily.map((d: any) => d.date), // ["2026-03-01", "2026-03-02", ...]
    datasets: [
      {
        label: "Ingresos diarios",
        data: data.daily.map((d: any) => d.amount),
        borderColor: "#0070f3",
        backgroundColor: "rgba(0,112,243,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h1>Panel de Ganancias</h1>
      <p>Ingresos totales: {formatPrice(data.totalRevenue)}</p>
      <p>Comisión de la app: {formatPrice(data.commission)}</p>
      <p>Pagos a restaurantes: {formatPrice(data.payoutRestaurants)}</p>
      <p>Órdenes completadas: {data.ordersCount}</p>

      <div style={{ maxWidth: "600px", marginTop: "2rem" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}
