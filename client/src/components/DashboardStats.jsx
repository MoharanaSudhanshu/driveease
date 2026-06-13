function DashboardStats({ title, value, color = "bg-white" }) {
  return (
    <div className={`${color} shadow-lg rounded-xl p-6`}>
      <h3 className="text-white">{title}</h3>
      <h2 className="text-4xl font-bold text-white">{value}</h2>
    </div>
  );
}

export default DashboardStats;
