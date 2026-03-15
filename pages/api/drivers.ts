import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function GET(req: Request) {
  try {
    const driverId = new URL(req.url).searchParams.get("id");

    if (driverId) {
      const driver = await prisma.driver.findUnique({
        where: { id: Number(driverId) },
        include: { user: true },
      });
      if (!driver) {
        return NextResponse.json({ error: "Driver no encontrado" }, { status: 404 });
      }
      return NextResponse.json(driver);
    }

    const drivers = await prisma.driver.findMany({ include: { user: true } });
    return NextResponse.json(drivers);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener drivers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, phone, lat, lng } = await req.json();
    if (!userId || !phone) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const driver = await prisma.driver.create({
      data: { userId, phone, lat, lng },
    });

    return NextResponse.json(driver);
  } catch (error) {
    return NextResponse.json({ error: "Error al crear driver" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, lat, lng } = await req.json();
    if (!id || lat === undefined || lng === undefined) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const driver = await prisma.driver.update({
      where: { id },
      data: { lat, lng },
    });

    return NextResponse.json(driver);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar ubicación del driver" }, { status: 500 });
  }
}
