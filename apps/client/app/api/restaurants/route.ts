import { NextResponse } from "next/server";
import { prisma } from "../../../../database/prisma";

export async function GET() {
  const restaurants = await prisma.restaurant.findMany();
  return NextResponse.json(restaurants);
}
