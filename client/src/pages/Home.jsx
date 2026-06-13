import Hero from "../components/Hero";
import FeaturedCars from "../components/FeaturedCars";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
function Home() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      {/* <Stats /> */}
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
export default Home;
