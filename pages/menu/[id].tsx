import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getMenu } from "../../services/menuService";
import { addToCart } from "../../services/cartService";

export default function MenuPage() {
  const router = useRouter();
  const { id } = router.query;
  const [menu, setMenu] = useState<any[]>([]);
  const customerId = 1; // ejemplo

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const data = await getMenu(Number(id));
        setMenu(data);
      };
      fetchData();
    }
  }, [id]);

  const handleAdd = async (itemId: number) => {
    await addToCart(customerId, itemId, 1);
    alert("Agregado al carrito");
  };

  return (
    <div>
      <h1>Menú del restaurante {id}</h1>
      <ul>
        {menu.map((item) => (
          <li key={item.id}>
            {item.name} - C${item.price}
            <button onClick={() => handleAdd(item.id)}>Agregar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
