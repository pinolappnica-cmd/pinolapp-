import MenuItem from "./MenuItem";

export default function MenuList({ items }: { items: any[] }) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}
