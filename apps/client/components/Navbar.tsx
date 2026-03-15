"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">PinolApp</Link>
      <div className="space-x-4">
        <Link href="/restaurants">Restaurantes</Link>
        <Link href="/cart">Carrito</Link>
        <Link href="/orders">Órdenes</Link>
        <Link href="/profile">Perfil</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Registro</Link>
      </div>
    </nav>
  );
}
