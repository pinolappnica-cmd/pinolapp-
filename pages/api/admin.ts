import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    // Devuelve un resumen global para el panel admin
    const stats = {
      users: await prisma.user.count(),
      restaurants: await prisma.restaurant.count(),
      orders: await prisma.order.count(),
      drivers: await prisma.driver.count(),
    };
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      case "createRestaurant":
        return NextResponse.json(
          await prisma.restaurant.create({ data })
        );
      case "createDriver":
        return NextResponse.json(
          await prisma.driver.create({ data })
        );
      case "updateOrder":
        return NextResponse.json(
          await prisma.order.update({ where: { id: data.id }, data })
        );
      default:
        return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error en acción admin" }, { status: 500 });
  }
}
