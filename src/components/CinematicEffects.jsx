import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";

const cinematicEase = [0.16, 1, 0.3, 1];

export function CinematicPreloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: cinematicEase }}
          className="fixed inset-0 z-[100] bg-gradient-to-b from-[#1A0405] via-[#541213] to-[#1A0405] flex flex-col items-center justify-center text-[#F6EBD9] border-b-4 border-[#C59B27]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: cinematicEase }}
            className="text-center space-y-4 px-6"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-[#7A2021] border-2 border-[#E5C158] flex items-center justify-center shadow-[0_0_40px_rgba(229,193,88,0.45)]">
              <Award className="w-8 h-8 text-[#E5C158]" />
            </div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#E5C158] font-bold">
              Est. 1985 • Khargone (M.P.)
            </p>
            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-wider text-[#F6EBD9]">
              St. Jude&apos;s Higher Secondary School
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: cinematicEase }}
              className="h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-[#E5C158] to-transparent origin-center"
            />
            <p className="font-serif-editorial italic text-lg text-[#E5C158]/90">
              &ldquo;Sharing Divine Knowledge and Love&rdquo;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function GoldenAtmosphere() {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const particles = [
    { top: "14%", left: "12%", size: 4, dur: 7 },
    { top: "28%", left: "82%", size: 5, dur: 9 },
    { top: "48%", left: "18%", size: 3, dur: 8 },
    { top: "64%", left: "76%", size: 4, dur: 10 },
    { top: "80%", left: "28%", size: 5, dur: 7.5 },
    { top: "38%", left: "54%", size: 3, dur: 8.5 }
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-[45] overflow-hidden">
      {/* Subtle Golden Cursor Aura */}
      <div
        style={{
          transform: `translate3d(${mousePos.x - 220}px, ${mousePos.y - 220}px, 0)`
        }}
        className="w-[440px] h-[440px] rounded-full bg-[radial-gradient(circle,rgba(197,155,39,0.09)_0%,transparent_70%)] transition-transform duration-300 ease-out hidden md:block"
      />

      {/* Floating Ambient Gold Dust */}
      {particles.map((p, idx) => (
        <motion.span
          key={idx}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{
            y: [-18, 18, -18],
            opacity: [0.15, 0.55, 0.15]
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-[#C59B27] blur-[0.5px]"
        />
      ))}
    </div>
  );
}
