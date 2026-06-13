function Testimonials() {
  const reviews = [
    {
      name: "Ansh",
      text: "Amazing experience renting a BMW.",
    },
    {
      name: "Ayasha",
      text: "Best car rental platform I have used.",
    },
    {
      name: "Amit",
      text: "Smooth booking and premium cars.",
    },
  ];

  return (
    <section className="bg-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white shadow-xl rounded-xl p-8">
              <p>{review.text}</p>

              <h3 className="font-bold mt-4">{review.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
