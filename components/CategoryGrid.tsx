import Image from "next/image";

const categories = [
  { name: "Restaurantes", icon: "/icons/restaurant.png" },
  { name: "Rápido", icon: "/icons/fast.png" },
  { name: "Farmacias", icon: "/icons/farmacia.png" },
  { name: "Mercados", icon: "/icons/market.png" },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 cursor-pointer hover:scale-105 transition"
        >
          <Image src={cat.icon} alt={cat.name} width={64} height={64} />
          <span className="mt-2 text-sm font-semibold">{cat.name}</span>
        </div>
      ))}
    </div>
  );
}
