export default function OrderTracker({ status }: { status: string }) {
  const steps = ["pending", "preparing", "delivering", "delivered"];
  return (
    <div className="flex space-x-2 mt-2">
      {steps.map((step) => (
        <div
          key={step}
          className={`px-3 py-1 rounded ${
            steps.indexOf(step) <= steps.indexOf(status)
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
