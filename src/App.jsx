import React, { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import CampusSections from "./components/CampusSections";
import PortalAndFooter from "./components/PortalAndFooter";
import ShowcasePage from "./components/ShowcasePage";
import CompliancePortalPage from "./components/CompliancePortalPage";
import { ScrollProgressBar, SchoolScrollBackdrop } from "./components/MotionPrimitives";
import { ScrollShutterStage, GoldenAtmosphere } from "./components/CinematicEffects";

export default function App() {
  const [admissionOpen, setAdmissionOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [showcaseTarget, setShowcaseTarget] = useState("leadership");
  const [complianceSection, setComplianceSection] = useState("tc");

  useEffect(() => {
    const isTouchMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lenis = isTouchMobile
      ? null
      : new Lenis({
          duration: 0.95,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          smoothWheel: true,
          wheelMultiplier: 1.05
        });

    let rafId = null;
    if (lenis) {
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    const handleScroll = () => {
      const shutterOpenThreshold = window.innerHeight * 0.95;
      setShowNavbar(window.scrollY > shutterOpenThreshold);
    };

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#management" || hash === "#gallery" || hash === "#showcase") {
        setShowcaseTarget(hash === "#gallery" ? "gallery" : "leadership");
        setActivePage("showcase");
      } else if (hash === "#tc" || hash === "#disclosure") {
        setComplianceSection(hash === "#disclosure" ? "disclosure" : "tc");
        setActivePage("compliance");
      } else {
        setActivePage("home");
      }
    };

    handleHashChange();
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      if (lenis) lenis.destroy();
    };
  }, []);

  const goHome = () => {
    window.history.pushState(null, "", "#home");
    setActivePage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHash = (hash) => {
    const cleanHash = hash.toLowerCase();
    window.history.pushState(null, "", cleanHash);
    if (cleanHash === "#management" || cleanHash === "#gallery" || cleanHash === "#showcase") {
      setShowcaseTarget(cleanHash === "#gallery" ? "gallery" : "leadership");
      setActivePage("showcase");
    } else if (cleanHash === "#tc" || cleanHash === "#disclosure") {
      const sec = cleanHash === "#disclosure" ? "disclosure" : "tc";
      setComplianceSection(sec);
      setActivePage("compliance");
      setTimeout(() => {
        const el = document.getElementById(sec);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 145;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      }, 120);
    } else {
      setActivePage("home");
      setTimeout(() => {
        const targetId = cleanHash.replace("#", "");
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F6EBD9] text-[#2B1615] relative">
        <GoldenAtmosphere />
        <ScrollProgressBar />

        {activePage === "compliance" ? (
          <CompliancePortalPage
            onBackHome={goHome}
            onNavigate={navigateToHash}
            onOpenAdmission={() => setAdmissionOpen(true)}
            initialSection={complianceSection}
          />
        ) : activePage === "showcase" ? (
          <div id="showcase-interactive-root" className="relative z-50 min-h-screen pointer-events-auto bg-[#F6EBD9]"><ShowcasePage
            onBackHome={goHome}
            onOpenAdmission={() => setAdmissionOpen(true)}
            
           initialSection={showcaseTarget} /></div>
        ) : (
          <>
            <Navbar
              onOpenAdmission={() => setAdmissionOpen(true)}
              onNavigate={navigateToHash}
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

