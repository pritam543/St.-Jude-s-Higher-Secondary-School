import React, { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import CampusSections from "./components/CampusSections";
import PortalAndFooter from "./components/PortalAndFooter";
import ShowcasePage from "./components/ShowcasePage";
import { ScrollProgressBar, SchoolScrollBackdrop } from "./components/MotionPrimitives";
import { ScrollShutterStage, GoldenAtmosphere } from "./components/CinematicEffects";

export default function App() {
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [showcaseTarget, setShowcaseTarget] = useState("leadership");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const shutterOpenThreshold = window.innerHeight * 0.95;
      setShowNavbar(window.scrollY > shutterOpenThreshold);
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#management" || hash === "#gallery" || hash === "#showcase") {
        setActivePage("showcase");
      } else {
        setActivePage("home");
      }
    };

    handleHashChange();
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      lenis.destroy();
    };
  }, []);

  const goHome = () => {
    window.location.hash = "#home";
    setActivePage("home");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F6EBD9] text-[#2B1615] relative">
        <GoldenAtmosphere />
        <ScrollProgressBar />

        {activePage === "showcase" ? (
          <div id="showcase-interactive-root" className="relative z-50 min-h-screen pointer-events-auto bg-[#F6EBD9]"><ShowcasePage
            onBackHome={goHome}
            onOpenAdmission={() => setAdmissionOpen(true)}
            
           initialSection={showcaseTarget} /></div>
        ) : (
          <>
            <Navbar
              onOpenAdmission={() => setAdmissionOpen(true)}
              showMainNav={showNavbar}
            />

            <main>
              <ScrollShutterStage>
                <Hero onOpenAdmission={() => setAdmissionOpen(true)} />
              </ScrollShutterStage>

              {/* Unified School-Themed 3D Scroll Backdrop strictly between Hero & Footer */}
              <div className="relative">
                <SchoolScrollBackdrop />
                <div className="relative z-[2]">
                  <AboutSection />
                  <CampusSections onOpenAdmission={() => setAdmissionOpen(true)} />
                  <PortalAndFooter
                    admissionOpen={admissionOpen}
                    onCloseAdmission={() => setAdmissionOpen(false)}
                  />
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </MotionConfig>
  );
}

