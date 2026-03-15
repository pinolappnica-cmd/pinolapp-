import prisma from "../lib/prisma";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function createCategory(name: string, icon: string) {
  return prisma.category.create({
    data: { name, icon },
  });
}
