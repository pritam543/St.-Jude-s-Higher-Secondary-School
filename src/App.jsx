import React, { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ManagementSection from "./components/ManagementSection";
import CampusSections from "./components/CampusSections";
import PortalAndFooter from "./components/PortalAndFooter";
import { ScrollProgressBar } from "./components/MotionPrimitives";

export default function App() {
  const [admissionOpen, setAdmissionOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F6EBD9] text-[#2B1615]">
        <ScrollProgressBar />
        <Navbar onOpenAdmission={() => setAdmissionOpen(true)} />
        <main>
          <Hero onOpenAdmission={() => setAdmissionOpen(true)} />
          <AboutSection />
          <ManagementSection />
          <CampusSections onOpenAdmission={() => setAdmissionOpen(true)} />
          <PortalAndFooter
            admissionOpen={admissionOpen}
            onCloseAdmission={() => setAdmissionOpen(false)}
          />
        </main>
      </div>
    </MotionConfig>
  );
}
