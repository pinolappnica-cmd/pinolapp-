export default function CategoryIcon({ category }: { category: string }) {
  return (
    <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
      {category}
    </span>
  );
}
