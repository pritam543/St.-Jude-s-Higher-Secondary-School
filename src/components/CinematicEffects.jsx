import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, ChevronsDown } from "lucide-react";

export function ScrollShutterStage({ children }) {
  const stageRef = useRef(null);

  // Tracks scroll over a 210vh pinned stage:
  // 0.0 -> 0.52: Shutter rises smoothly with scroll while Hero stays pinned
  // 0.52 -> 1.0: Shutter is fully open and Hero begins scrolling upward
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"]
  });

  const shutterY = useTransform(scrollYProgress, [0, 0.52], ["0%", "-102%"]);
  const crestOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const crestScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.9]);
  const heroScale = useTransform(scrollYProgress, [0, 0.52], [1.08, 1]);

  return (
    <div ref={stageRef} className="relative h-[210vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Hero Section Underneath Shutter */}
        <motion.div style={{ scale: heroScale }} className="w-full h-full">
          {children}
        </motion.div>

        {/* Scroll-Driven Royal Heritage Shutter */}
        <motion.div
          style={{ y: shutterY }}
          className="absolute inset-0 z-40 bg-gradient-to-b from-[#1A0405] via-[#541213] to-[#240708] flex flex-col items-center justify-center text-[#F6EBD9] border-b-[6px] border-[#C59B27] shadow-[0_25px_70px_rgba(0,0,0,0.85)] will-change-transform"
        >
          {/* Subtle Royal Texture & Inner Gold Frame */}
          <div className="absolute inset-4 sm:inset-7 border border-[#C59B27]/30 rounded-3xl pointer-events-none" />

          <motion.div
            style={{ opacity: crestOpacity, scale: crestScale }}
            className="text-center space-y-5 px-6 max-w-3xl"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-[#7A2021] border-2 border-[#E5C158] flex items-center justify-center shadow-[0_0_50px_rgba(229,193,88,0.5)]">
              <Award className="w-10 h-10 text-[#E5C158]" />
            </div>

            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#E5C158] font-bold">
              Est. 1985 • CBSE Affiliation No. 1030166 • Khargone (M.P.)
            </p>

            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#F6EBD9] leading-tight">
              St. Jude&apos;s Higher Secondary School
            </h2>

            <div className="h-[2px] w-56 mx-auto bg-gradient-to-r from-transparent via-[#E5C158] to-transparent" />

            <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#E5C158]/95">
              &ldquo;Sharing Divine Knowledge and Love&rdquo;
            </p>

            <div className="pt-8 flex flex-col items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#F6EBD9]/80 font-semibold">
                Scroll Down to Open Campus Gates
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-9 h-9 rounded-full border border-[#E5C158]/50 flex items-center justify-center text-[#E5C158]"
              >
                <ChevronsDown className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Brass Shutter Handle Bar */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1.5 rounded-full bg-[#E5C158]/75" />
        </motion.div>
      </div>
    </div>
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
      <div
        style={{
          transform: `translate3d(${mousePos.x - 22}px, ${mousePos.y - 22}px, 0)`
        }}
        className="w-11 h-11 rounded-full border border-[#C59B27]/65 bg-[radial-gradient(circle,rgba(229,193,88,0.35)_0%,rgba(197,155,39,0.08)_65%,transparent_100%)] shadow-[0_0_16px_rgba(197,155,39,0.35)] transition-transform duration-300 ease-out hidden md:block"
      />

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


