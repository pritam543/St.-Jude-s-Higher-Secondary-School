import React, { useState, useEffect, useRef, createContext, useContext } from "react";

export const ShutterScrollContext = createContext(null);
export const useShutterScroll = () => useContext(ShutterScrollContext);
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, ChevronsDown } from "lucide-react";

export function ScrollShutterStage({ children }) {
  const stageRef = useRef(null);

  // Extended 260vh pinned stage:
  // 0.00 -> 0.36: Royal Shutter rises open
  // 0.28 -> 0.75: 4-Corner School Image Quadrants visibly assemble together as you keep scrolling!
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"]
  });

  const shutterY = useTransform(scrollYProgress, [0, 0.24], ["0%", "-103%"]);
  const crestOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  const crestScale = useTransform(scrollYProgress, [0, 0.32], [1, 0.92]);
  const heroScale = useTransform(scrollYProgress, [0, 0.45], [1.04, 1]);

  return (
    <ShutterScrollContext.Provider value={scrollYProgress}>
    <div ref={stageRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Hero Section Underneath Shutter */}
        <motion.div style={{ scale: heroScale }} className="w-full h-full">
          {children}
        </motion.div>

        {/* Scroll-Driven Royal Imperial Crimson & Antique Gold Shutter */}
        <motion.div
          style={{
            y: shutterY,
            backgroundImage:
              "radial-gradient(circle at 50% 42%, #7D1B1D 0%, #4A0D0E 52%, #210405 100%)"
          }}
          className="absolute inset-0 z-40 flex flex-col items-center justify-center text-[#F6EBD9] border-b-[6px] border-[#E5C158] shadow-[0_28px_80px_rgba(0,0,0,0.9)] will-change-transform"
        >
          {/* Ambient Royal Gold Center Aura & Subtle Shimmer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(229,193,88,0.22),transparent_62%)] pointer-events-none" />
          <div className="absolute inset-4 sm:inset-7 border-2 border-[#E5C158]/45 rounded-3xl pointer-events-none shadow-[inset_0_0_50px_rgba(229,193,88,0.12)]" />
          <div className="absolute inset-6 sm:inset-10 border border-[#C59B27]/25 rounded-2xl pointer-events-none" />

          <motion.div
            style={{ opacity: crestOpacity, scale: crestScale }}
            className="relative z-10 text-center space-y-5 px-6 max-w-3xl"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#8F2224] to-[#3D090A] border-2 border-[#E5C158] flex items-center justify-center shadow-[0_0_55px_rgba(229,193,88,0.55)]">
              <Award className="w-10 h-10 text-[#E5C158]" />
            </div>

            <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#E5C158] font-bold">
              Est. 1985 • CBSE Affiliation No. 1030166 • Khargone (M.P.)
            </p>

            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#F6EBD9] leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
              St. Jude&apos;s Higher Secondary School
            </h2>

            <div className="h-[2px] w-60 mx-auto bg-gradient-to-r from-transparent via-[#E5C158] to-transparent" />

            <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#E5C158]">
              &ldquo;Sharing Divine Knowledge and Love&rdquo;
            </p>

            <div className="pt-8 flex flex-col items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#F6EBD9]/90 font-semibold">
                Scroll Down to Open Campus Gates
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-9 h-9 rounded-full border border-[#E5C158]/70 bg-[#E5C158]/10 flex items-center justify-center text-[#E5C158]"
              >
                <ChevronsDown className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Brass Shutter Handle Bar */}
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full bg-gradient-to-r from-[#C59B27] via-[#F5D77F] to-[#C59B27] shadow-[0_0_12px_rgba(229,193,88,0.8)]" />
        </motion.div>
      </div>
    </div>
    </ShutterScrollContext.Provider>
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
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      <div
        style={{
          transform: `translate3d(${mousePos.x - 22}px, ${mousePos.y - 22}px, 0)`
        }}
        className="fixed top-0 left-0 w-11 h-11 rounded-full border border-[#C59B27]/75 bg-[radial-gradient(circle,rgba(229,193,88,0.38)_0%,rgba(197,155,39,0.1)_65%,transparent_100%)] shadow-[0_0_18px_rgba(197,155,39,0.4)] transition-transform duration-200 ease-out"
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


