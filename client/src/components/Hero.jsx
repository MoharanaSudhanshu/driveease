import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-6xl text-white font-bold"
          >
            Drive Your Dream Car
          </motion.h1>

          <p className="text-gray-400 mt-6 text-xl">
            Premium luxury cars at affordable prices.
          </p>

          <Link
            to="/cars"
            className="inline-block mt-8 bg-cyan-500 px-8 py-4 rounded-lg text-white"
          >
            Explore Cars
          </Link>
        </div>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt="car"
          className="rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}

export default Hero;
