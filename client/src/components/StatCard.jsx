function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-gray-500 text-lg">{title}</h3>

      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default StatCard;
