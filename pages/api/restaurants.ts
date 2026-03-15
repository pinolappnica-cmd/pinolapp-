import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: { menu: true },
    });
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener restaurantes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, category, address } = await req.json();
    if (!name || !category || !address) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const restaurant = await prisma.restaurant.create({
      data: { name, category, address },
    });

    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear restaurante" }, { status: 500 });
  }
}
