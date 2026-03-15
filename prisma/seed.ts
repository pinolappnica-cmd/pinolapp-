import { prisma } from "../database/prisma";
import { faker } from "@faker-js/faker";

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: { email: "admin@pinolapp.com", password: "hashed", role: "admin" },
  });

  const drivers = await Promise.all(
    Array.from({ length: 3 }).map(async () => {
      const user = await prisma.user.create({
        data: { email: faker.internet.email(), password: "hashed", role: "driver" },
      });
      return prisma.driver.create({ data: { userId: user.id, phone: faker.phone.number() } });
    })
  );

  const customers = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: { email: faker.internet.email(), password: "hashed", role: "customer" },
      })
    )
  );

  const restaurants = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.restaurant.create({
        data: {
          name: faker.company.name(),
          category: faker.commerce.department(),
          address: faker.location.streetAddress(),
          phone: faker.phone.number(),
          menuItems: {
            create: Array.from({ length: 4 }).map(() => ({
              name: faker.commerce.productName(),
              price: parseFloat(faker.commerce.price({ min: 3, max: 20 })),
            })),
          },
        },
        include: { menuItems: true },
      })
    )
  );

  for (let i = 0; i < 10; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    const status = ["pending", "preparing", "delivering", "delivered"][Math.floor(Math.random() * 4)];

    await prisma.order.create({
      data: {
        userId: customer.id,
        status,
        driverId: status !== "pending" ? driver.id : null,
        deliveryAddress: faker.location.streetAddress(),
        deliveryLat: parseFloat(faker.location.latitude()),
        deliveryLng: parseFloat(faker.location.longitude()),
        items: {
          create: [
            {
              menuItemId: restaurant.menuItems[0].id,
              quantity: 2,
            },
          ],
        },
      },
    });
  }

  console.log("✅ Seed complete");
}

main().finally(() => prisma.$disconnect());
