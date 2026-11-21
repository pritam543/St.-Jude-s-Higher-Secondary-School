import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, RotateCcw, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Navbar from "./Navbar";
import ManagementSection from "./ManagementSection";
import ArchivalGallerySection from "./ArchivalGallerySection";
import { Showcase3DBackdrop } from "./MotionPrimitives";

const royalClothEase = [0.19, 1, 0.22, 1];

const primaryVelvetWaves = {
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      rgba(22, 3, 4, 0.82) 0px,
      rgba(130, 34, 35, 0.28) 14px,
      rgba(184, 54, 55, 0.38) 26px,
      rgba(36, 6, 7, 0.85) 42px,
      rgba(115, 28, 29, 0.22) 58px
    ),
    radial-gradient(circle at 50% 30%, #992627 0%, #541213 55%, #240405 100%)
  `
};

const secondaryRippleOverlay = {
  backgroundImage: `
    repeating-linear-gradient(
      86deg,
      transparent 0px,
      rgba(229, 193, 88, 0.06) 16px,
      rgba(18, 2, 3, 0.45) 34px,
      transparent 52px
    )
  `
};

export default function ShowcasePage({ onBack, initialSection = "leadership" }) {
  const [curtainOpen, setCurtainOpen] = useState(false);

  // Always open at the top so Management/Leadership appears first; scroll to Gallery only when Gallery was clicked
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (curtainOpen) {
      const hash = window.location.hash.toLowerCase();
      if (initialSection === "gallery" || hash.includes("gallery") || hash.includes("album")) {
        setTimeout(() => {
          const galleryEl = document.getElementById("gallery");
          if (galleryEl) {
            galleryEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 450);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [curtainOpen, initialSection]);

  const [curtainKey, setCurtainKey] = useState(0);

  return (
    <div className="min-h-screen bg-[#F6EBD9] text-[#2B1615] relative overflow-x-hidden flex flex-col">
      {/* Main Website Navbar */}
      <div className="relative z-50"><Navbar onBack={onBack} /></div>

      {/* Clear Spacing Below Fixed Navbar + Visible Heritage Action Strip */}
      <div className="pt-28 sm:pt-32 md:pt-36 bg-[#541213] border-b-2 border-[#C59B27]/60 text-[#F6EBD9] shadow-lg relative z-20 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              if (typeof onBack === "function") onBack();
              if (window.location.hash) {
                window.history.pushState("", document.title, window.location.pathname + window.location.search);
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#7A2021] hover:bg-[#912829] text-[#E5C158] border border-[#C59B27] text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#E5C158] font-bold">
              Rubilume 40th Year Chronicles
            </p>
            <h1 className="font-cinzel text-sm sm:text-lg font-bold text-[#F6EBD9]">
              School Leadership &amp; Archival Photo Gallery
            </h1>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurtainKey((prev) => prev + 1);
              setCurtainOpen(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B0B0C] hover:bg-[#7A2021] border border-[#C59B27]/60 text-[#E5C158] text-xs font-bold tracking-wider uppercase transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Replay Curtain
          </button>
        </div>
      </div>

      {/* Main Page Content Behind Curtains with Distinct 3D Rubilume Stage & Archival Backdrop */}
      <main className="relative z-30 flex-grow pointer-events-auto">
        <Showcase3DBackdrop />
        <div className="relative z-10">
          <ManagementSection />
          <ArchivalGallerySection />
        </div>
      </main>

      {/* HERITAGE FOOTER WITH INSTAGRAM & YOUTUBE CONNECT */}
      <footer className="bg-[#2B0809] text-[#F6EBD9] border-t-4 border-[#C59B27] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid md:grid-cols-3 gap-10">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.28em] text-[#E5C158]">
              Est. 1986 • CBSE Affiliated
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F6EBD9]">
              St. Jude&apos;s Higher Secondary School
            </h3>
            <p className="text-xs sm:text-sm text-[#F6EBD9]/75 leading-relaxed">
              Celebrating four decades of academic excellence, holistic values, and Rubilume legacy in Khargone, Madhya Pradesh.
            </p>
          </div>

          {/* Column 2: Quick Campus Contact */}
          <div className="space-y-3 text-xs sm:text-sm text-[#F6EBD9]/80">
            <h4 className="font-cinzel text-base font-bold text-[#E5C158] uppercase tracking-wider">
              Campus Address &amp; Office
            </h4>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
              <span>Sanawad Road, Khargone, Madhya Pradesh - 451001</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
              <span>+91 7282-232456</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
              <span>office@stjudeskhargone.edu.in</span>
            </p>
          </div>

          {/* Column 3: Official Social Media Connect */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-base font-bold text-[#E5C158] uppercase tracking-wider">
              Connect With Us
            </h4>
            <p className="text-xs text-[#F6EBD9]/75">
              Follow campus events, Rubilume celebrations, and student milestones on our official handles:
            </p>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              {/* Instagram Official Link */}
              <a
                href="https://www.instagram.com/sjskhargone_official?cplk=Z2xqZHR2Y3Bobmd3"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#541213] hover:bg-[#7A2021] border border-[#C59B27]/50 hover:border-[#E5C158] transition shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#F6EBD9]">Instagram</p>
                    <p className="text-[11px] text-[#E5C158]">@sjskhargone_official</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#E5C158]/70 group-hover:text-[#E5C158]" />
              </a>

              {/* YouTube Official Link */}
              <a
                href="https://youtube.com/@st.judesschoolkharogne4464?si=iKWHVDqm7SP-oqWX"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#541213] hover:bg-[#7A2021] border border-[#C59B27]/50 hover:border-[#E5C158] transition shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[#FF0000] flex items-center justify-center text-white shadow">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#F6EBD9]">YouTube Channel</p>
                    <p className="text-[11px] text-[#E5C158]">St. Jude&apos;s School Khargone</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#E5C158]/70 group-hover:text-[#E5C158]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="border-t border-[#C59B27]/25 py-4 px-4 text-center text-[11px] text-[#F6EBD9]/65 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
          <p>© {new Date().getFullYear()} St. Jude&apos;s Higher Secondary School, Khargone. All Rights Reserved.</p>
          <button
            onClick={() => {
              if (typeof onBack === "function") onBack();
              if (window.location.hash) {
                window.history.pushState("", document.title, window.location.pathname + window.location.search);
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[#E5C158] hover:underline font-semibold cursor-pointer"
          >
            Return to Main Campus Portal →
          </button>
        </div>
      </footer>

      {/* ROYAL VELVET V-DRAPE STAGE CURTAINS */}
      <AnimatePresence>
        {!curtainOpen && (
          <motion.div
            key={`velvet-stage-curtains-${curtainKey}`}
            onClick={() => setCurtainOpen(true)}
            exit={{ opacity: 0, pointerEvents: "none", transition: { duration: 0.6, delay: 2.4 } }}
            style={{ pointerEvents: curtainOpen ? "none" : "auto" }}
            className="fixed inset-0 z-[999] cursor-pointer overflow-hidden select-none pointer-events-auto"
          >
            {/* Top Royal Valance Pelmet */}
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: "-105%" }}
              transition={{ duration: 2.3, delay: 0.65, ease: royalClothEase }}
              className="absolute top-0 inset-x-0 h-16 sm:h-24 z-30 bg-gradient-to-b from-[#1F0304] via-[#681819] to-[#450B0C] border-b-4 border-[#C59B27] shadow-[0_14px_35px_rgba(0,0,0,0.85)] flex flex-col justify-end pointer-events-none"
            >
              <div className="w-full h-4 bg-[radial-gradient(circle_at_50%_0%,#7A2021_60%,transparent_62%)] bg-[length:48px_16px] opacity-90" />
              <div className="w-full h-1.5 bg-[repeating-linear-gradient(90deg,#C59B27_0px,#E5C158_10px,#8C6914_20px)]" />
            </motion.div>

            {/* LEFT VELVET CURTAIN */}
            <motion.div
              initial={{ x: "0%", skewX: 0, scaleX: 1, rotate: 0 }}
              exit={{ x: "-84%", skewX: -16, scaleX: 0.56, rotate: -2.5 }}
              transition={{ duration: 2.95, ease: royalClothEase }}
              style={{ ...primaryVelvetWaves, transformOrigin: "bottom left" }}
              className="absolute top-0 bottom-0 -left-[14%] w-[64.5%] z-20 shadow-[24px_0_60px_rgba(0,0,0,0.9)] flex justify-end overflow-hidden pointer-events-none"
            >
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                exit={{ scaleX: 0.45, opacity: 0.95 }}
                style={secondaryRippleOverlay}
                className="absolute inset-0 pointer-events-none"
              />
              <div className="w-full h-full bg-gradient-to-r from-black/50 via-transparent to-black/55" />
              <div className="w-2.5 sm:w-3.5 h-full bg-gradient-to-b from-[#E5C158] via-[#C59B27] to-[#8C6914] shadow-[-5px_0_18px_rgba(197,155,39,0.55)] relative z-10" />
            </motion.div>

            {/* RIGHT VELVET CURTAIN */}
            <motion.div
              initial={{ x: "0%", skewX: 0, scaleX: 1, rotate: 0 }}
              exit={{ x: "84%", skewX: 16, scaleX: 0.56, rotate: 2.5 }}
              transition={{ duration: 2.95, ease: royalClothEase }}
              style={{ ...primaryVelvetWaves, transformOrigin: "bottom right" }}
              className="absolute top-0 bottom-0 -right-[14%] w-[64.5%] z-20 shadow-[-24px_0_60px_rgba(0,0,0,0.9)] flex justify-start overflow-hidden pointer-events-none"
            >
              <motion.div
                animate={{ x: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                exit={{ scaleX: 0.45, opacity: 0.95 }}
                style={secondaryRippleOverlay}
                className="absolute inset-0 pointer-events-none"
              />
              <div className="w-2.5 sm:w-3.5 h-full bg-gradient-to-b from-[#E5C158] via-[#C59B27] to-[#8C6914] shadow-[5px_0_18px_rgba(197,155,39,0.55)] relative z-10" />
              <div className="w-full h-full bg-gradient-to-l from-black/50 via-transparent to-black/55" />
            </motion.div>

            {/* Center Royal Seal / Tap Prompt */}
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#36090A]/90 border-2 border-[#E5C158] shadow-[0_0_55px_rgba(229,193,88,0.45)] flex flex-col items-center justify-center mb-6"
              >
                <Sparkles className="w-8 h-8 text-[#E5C158] mb-1" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#F6EBD9]">
                  40 Years
                </span>
              </motion.div>

              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#E5C158] mb-2">
                Rubilume Heritage Showcase
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-[#F6EBD9] drop-shadow-[0_4px_22px_rgba(0,0,0,0.95)] max-w-2xl">
                Tap Anywhere to Unveil the Chronicles
              </h2>
              <p className="mt-4 px-6 py-2 rounded-full bg-[#240405]/85 border border-[#C59B27]/55 text-xs sm:text-sm text-[#E5C158] tracking-widest uppercase">
                Click to Part the Velvet Curtains
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
