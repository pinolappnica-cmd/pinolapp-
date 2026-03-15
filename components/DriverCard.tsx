export default function DriverCard({ driver }: { driver: any }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-semibold">Driver #{driver.id}</h3>
      <p>Email: {driver.user.email}</p>
      <p>Teléfono: {driver.phone}</p>
    </div>
  );
}
