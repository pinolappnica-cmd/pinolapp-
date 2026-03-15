import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categorías
  await prisma.category.createMany({
    data: [
      { name: "Restaurantes", icon: "/icons/restaurant.png" },
      { name: "Comida rápida", icon: "/icons/fast.png" },
      { name: "Farmacias", icon: "/icons/farmacia.png" },
      { name: "Mercados", icon: "/icons/market.png" },
    ],
  });

  // Clientes
  await prisma.customer.createMany({
    data: [
      {
        name: "Carlos López",
        email: "carlos@example.com",
        phone: "+50588889999",
        address: "Managua, Colonia Centroamérica",
      },
      {
        name: "María Pérez",
        email: "maria@example.com",
        phone: "+50577778888",
        address: "Granada, Calle Real",
      },
      {
        name: "José Martínez",
        email: "jose@example.com",
        phone: "+50566667777",
        address: "León, Barrio El Laborío",
      },
    ],
  });

  // Restaurantes
  await prisma.restaurant.createMany({
    data: [
      {
        name: "El Buen Sabor",
        rating: 4.5,
        deliveryTime: 25,
        priceRange: "C$100 - C$550",
      },
      {
        name: "Súper Típico",
        rating: 4.2,
        deliveryTime: 30,
        priceRange: "C$80 - C$500",
      },
      {
        name: "Pizza Express",
        rating: 4.7,
        deliveryTime: 20,
        priceRange: "C$150 - C$600",
      },
    ],
  });

  // Órdenes
  await prisma.order.createMany({
    data: [
      {
        customerId: 1,
        restaurantId: 1,
        status: "EN_CAMINO",
        total: 180,
      },
      {
        customerId: 2,
        restaurantId: 2,
        status: "PREPARANDO",
        total: 250,
      },
    ],
  });

  // Pagos
  await prisma.payment.createMany({
    data: [
      {
        orderId: 1,
        amount: 180,
        status: "CONFIRMADO",
        method: "Tarjeta",
        transactionId: "pi_123456789",
      },
      {
        orderId: 2,
        amount: 250,
        status: "PENDIENTE",
        method: "Tarjeta",
        transactionId: "pi_987654321",
      },
    ],
  });

  // Notificaciones
  await prisma.notification.createMany({
    data: [
      {
        customerId: 1,
        message: "Tu pedido está en camino 🚚",
        type: "PUSH",
        status: "ENVIADO",
      },
      {
        customerId: 2,
        message: "Tu pago está pendiente de confirmación 💳",
        type: "EMAIL",
        status: "ENVIADO",
      },
    ],
  });

  console.log("✅ Seed completado con categorías, clientes, restaurantes, órdenes, pagos y notificaciones.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
