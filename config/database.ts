import { PrismaClient } from "@prisma/client";

// Cliente Prisma para conexión a PostgreSQL
export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
