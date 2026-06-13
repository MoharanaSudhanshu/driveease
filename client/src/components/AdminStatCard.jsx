function AdminStatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className={`text-4xl ${color}`}>{icon}</div>

      <h3 className="text-gray-500 mt-3">{title}</h3>

      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default AdminStatCard;
