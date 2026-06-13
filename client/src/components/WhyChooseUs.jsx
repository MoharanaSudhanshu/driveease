import { FaCar, FaShieldAlt, FaBolt, FaMapMarkerAlt } from "react-icons/fa";

function WhyChooseUs() {
  const items = [
    {
      icon: <FaCar size={40} />,
      title: "Premium Fleet",
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Full Insurance",
    },
    {
      icon: <FaBolt size={40} />,
      title: "Instant Booking",
    },
    {
      icon: <FaMapMarkerAlt size={40} />,
      title: "Nationwide Coverage",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>

      <div className="grid md:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-xl p-8 text-center"
          >
            <div className="flex justify-center mb-4 text-blue-600">
              {item.icon}
            </div>

            <h3 className="font-bold text-xl">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
