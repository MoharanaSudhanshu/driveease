import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function FleetCharts({ cars }) {
  const available = cars.filter((car) => car.available).length;
  const unavailable = cars.filter((car) => !car.available).length;

  const pieData = [
    { name: "Available", value: available },
    { name: "Unavailable", value: unavailable },
  ];

  const priceData = cars.slice(0, 6).map((car) => ({
    name: car.make,
    price: car.pricePerDay,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">
      {/* Pie Chart */}

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Fleet Availability</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={120} label>
                <Cell />
                <Cell />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Price Per Day</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default FleetCharts;
