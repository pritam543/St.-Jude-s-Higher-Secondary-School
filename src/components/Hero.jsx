import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, ArrowRight, BookOpen, FileText, Sparkles, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { schoolInfo } from "../data/schoolData";
import { cinematicEase } from "./MotionPrimitives";
import { useShutterScroll } from "./CinematicEffects";

export default function Hero({ onOpenAdmission }) {
  const heroRef = useRef(null);
  const shutterProgress = useShutterScroll();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], ["0%", "18%"]);

  // 4-Corner Puzzle Assembly synchronized with Shutter opening (0.05 -> 0.50)
  const activeProgress = shutterProgress || scrollYProgress;
  const tlX = useTransform(activeProgress, [0.05, 0.5], ["-28%", "0%"]);
  const tlY = useTransform(activeProgress, [0.05, 0.5], ["-28%", "0%"]);
  const trX = useTransform(activeProgress, [0.05, 0.5], ["28%", "0%"]);
  const trY = useTransform(activeProgress, [0.05, 0.5], ["-28%", "0%"]);
  const blX = useTransform(activeProgress, [0.05, 0.5], ["-28%", "0%"]);
  const blY = useTransform(activeProgress, [0.05, 0.5], ["28%", "0%"]);
  const brX = useTransform(activeProgress, [0.05, 0.5], ["28%", "0%"]);
  const brY = useTransform(activeProgress, [0.05, 0.5], ["28%", "0%"]);
  const quadOpacity = useTransform(activeProgress, [0.04, 0.45], [0.25, 0.72]);


  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-36 sm:pt-40 pb-12 overflow-hidden bg-[#240708] text-[#F6EBD9]"
    >
      {/* Full-Bleed Widescreen Campus Backdrop with Slow Cinema Zoom */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        initial={{ scale: 1.16, opacity: 0.35 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 2.2, ease: cinematicEase }}
        className="absolute inset-0 z-0"
      >
        {/* 4-Corner Assembling School Image Quadrants (Slightly lower opacity for crisp foreground text) */}
        <motion.div style={{ opacity: quadOpacity }} className="absolute inset-0 w-full h-full">
          {/* Top-Left Quadrant */}
          <motion.div
            style={{
              x: tlX,
              y: tlY,
              backgroundImage: 'url("/school-building.jpg")',
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 0%"
            }}
            className="absolute top-0 left-0 w-1/2 h-1/2 bg-no-repeat will-change-transform"
          />
          {/* Top-Right Quadrant */}
          <motion.div
            style={{
              x: trX,
              y: trY,
              backgroundImage: 'url("/school-building.jpg")',
              backgroundSize: "200% 200%",
              backgroundPosition: "100% 0%"
            }}
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-no-repeat will-change-transform"
          />
          {/* Bottom-Left Quadrant */}
          <motion.div
            style={{
              x: blX,
              y: blY,
              backgroundImage: 'url("/school-building.jpg")',
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 100%"
            }}
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-no-repeat will-change-transform"
          />
          {/* Bottom-Right Quadrant */}
          <motion.div
            style={{
              x: brX,
              y: brY,
              backgroundImage: 'url("/school-building.jpg")',
              backgroundSize: "200% 200%",
              backgroundPosition: "100% 100%"
            }}
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-no-repeat will-change-transform"
          />
        </motion.div>
        {/* Luxury Heritage Maroon & Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0405]/55 via-[#240708]/30 to-[#1A0405]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#1A0405_100%)] opacity-45" />
      </motion.div>

      {/* Subtle Floating Gold Dust Orbs */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#C59B27]/15 blur-[110px] z-0" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#7A2021]/30 blur-[110px] z-0" />

      {/* Top Marquee Ticker */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: cinematicEase }}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 mt-2"
      >
        <div className="bg-[#1A0405]/70 backdrop-blur-md text-[#F6EBD9] rounded-full px-3 py-2 flex items-center gap-3 border border-[#C59B27]/40 shadow-2xl overflow-hidden">
          <span className="bg-[#C59B27] text-[#240708] text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full shrink-0">
            Rubilume 40
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee gap-10 text-xs sm:text-sm font-medium tracking-wide">
              {[...schoolInfo.announcements, ...schoolInfo.announcements].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 shrink-0 text-[#F6EBD9]/95">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center-Stage Widescreen Typography */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-4 text-center my-auto py-12 space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: cinematicEase }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#F6EBD9]/10 backdrop-blur-md border border-[#E5C158]/40 text-[#E5C158] text-xs font-bold uppercase tracking-[0.25em]"
        >
          <ShieldCheck className="w-4 h-4" />
          CBSE Affiliation No. {schoolInfo.affiliationNo} • Est. 1985
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, delay: 0.35, ease: cinematicEase }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F6EBD9] leading-[1.08] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        >
          St. Jude&apos;s Higher Secondary School
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.52, ease: cinematicEase }}
          className="font-serif-editorial italic text-2xl sm:text-4xl text-[#E5C158] font-semibold tracking-wide"
        >
          &ldquo;{schoolInfo.motto}&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.65, ease: cinematicEase }}
          className="text-[#F6EBD9]/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Celebrating <strong className="text-[#E5C158]">40 Years of Educational Excellence (1985 – 2025)</strong> at Mangrul Road, Khargone, under the Catholic Diocese of Khandwa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.78, ease: cinematicEase }}
          className="flex flex-wrap items-center justify-center gap-4 pt-3"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAdmission}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#C59B27] to-[#E5C158] text-[#240708] px-8 py-4 rounded-full text-sm font-extrabold uppercase tracking-wider shadow-[0_12px_35px_rgba(197,155,39,0.4)] transition cursor-pointer"
          >
            Admissions 2026–27 <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="#disclosure"
            className="inline-flex items-center gap-2 bg-[#F6EBD9]/10 hover:bg-[#F6EBD9]/20 backdrop-blur-md text-[#F6EBD9] border border-[#F6EBD9]/35 px-7 py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition"
          >
            Mandatory Disclosure
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom Glass Dock Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.9, ease: cinematicEase }}
        className="relative z-10 max-w-5xl w-full mx-auto px-4"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#1A0405]/65 backdrop-blur-xl p-3 rounded-2xl border border-[#C59B27]/30 shadow-2xl">
          {[
            { label: "Campus Gallery", href: "#gallery", icon: ImageIcon },
            { label: "Book List 25–26", href: "#academics", icon: BookOpen },
            { label: "Rubilume (40 Yrs)", href: "#about", icon: Award },
            { label: "Annual Report", href: "#disclosure", icon: FileText }
          ].map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              className="flex items-center justify-center gap-2.5 bg-[#F6EBD9]/5 hover:bg-[#7A2021] text-[#F6EBD9] p-3.5 rounded-xl border border-[#F6EBD9]/10 hover:border-[#E5C158]/50 transition-all duration-300 text-xs font-bold uppercase tracking-wider"
            >
              <pill.icon className="w-4 h-4 text-[#E5C158] shrink-0" />
              <span>{pill.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
