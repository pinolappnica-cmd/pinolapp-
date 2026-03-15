import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { action, email, password, name } = req.body;

      if (!action || !email || !password) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      // Registro de cliente
      if (action === "register") {
        const existing = await prisma.customer.findUnique({ where: { email } });
        if (existing) {
          return res.status(400).json({ error: "El email ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await prisma.customer.create({
          data: {
            name: name || "Usuario",
            email,
            password: hashedPassword,
            phone: "",
            address: "",
          },
        });

        return res.status(201).json({ message: "Registro exitoso", customer });
      }

      // Login de cliente
      if (action === "login") {
        const customer = await prisma.customer.findUnique({ where: { email } });
        if (!customer) {
          return res.status(404).json({ error: "Cliente no encontrado" });
        }

        const valid = await bcrypt.compare(password, customer.password);
        if (!valid) {
          return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign({ id: customer.id, email: customer.email }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).json({ message: "Login exitoso", token, customer });
      }

      return res.status(400).json({ error: "Acción inválida" });
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error("Error en /api/auth:", error);
    return res.status(500).json({ error: "Error en autenticación" });
  }
}
