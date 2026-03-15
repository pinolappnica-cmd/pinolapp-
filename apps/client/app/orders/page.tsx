import { prisma } from "../../../database/prisma";
import OrderCard from "../components/OrderCard";

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({ include: { items: { include: { menuItem: true } } } });
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      {orders.map((order) => <OrderCard key={order.id} order={order} />)}
    </div>
  );
}
