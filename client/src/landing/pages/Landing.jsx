import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import ATSPreview from "../components/ATSPreview/ATSPreview";
import Testimonials from "../components/Testimonials/Testimonials";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ATSPreview />
      <Testimonials />
      <Pricing />
      <Footer />
    </>
  );
};

export default Landing;