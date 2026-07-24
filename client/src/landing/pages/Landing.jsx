import { useState } from "react";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import ATSPreview from "../components/ATSPreview/ATSPreview";
import Testimonials from "../components/Testimonials/Testimonials";
import Pricing from "../components/Pricing/Pricing";
import Footer from "../components/Footer/Footer";
import AuthModal from "../components/Auth/AuthModal";

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openLogin = () => {
    setAuthMode("login");
    setShowModal(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setShowModal(true);
  };

  return (
    <>
      <Navbar
        openLogin={openLogin}
        openRegister={openRegister}
      />

      <Hero
        openLogin={openLogin}
        openRegister={openRegister}
      />

      <Features />
      <HowItWorks />
      <ATSPreview />
      <Testimonials />
      <Pricing />
      <Footer />

      {showModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Landing;