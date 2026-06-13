import { CountUp } from "react-countup";

function Stats() {
  return (
    <section className="bg-slate-900 text-white py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
        <div>
          <h2 className="text-5xl font-bold">
            <CountUp end={500} duration={2} />+
          </h2>
          <p>Cars</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">
            <CountUp end={10000} duration={2} separator="," />+
          </h2>
          <p>Customers</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">
            <CountUp end={50} duration={2} />+
          </h2>
          <p>Cities</p>
        </div>

        <div>
          <h2 className="text-5xl font-bold">
            <CountUp end={99} duration={2} />%
          </h2>
          <p>Satisfaction</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;
