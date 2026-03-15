import prisma from "../lib/prisma";

export async function createCustomer(data: {
  name: string;
  email: string;
  phone: string;
  address: string;
}) {
  return prisma.customer.create({ data });
}

export async function getCustomerById(id: number) {
  return prisma.customer.findUnique({ where: { id } });
}

export async function updateCustomer(id: number, data: any) {
  return prisma.customer.update({ where: { id }, data });
}
