import React, { useRef } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";

export const cinematicEase = [0.16, 1, 0.3, 1];

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#7A2021] via-[#E5C158] to-[#7A2021] origin-left z-[60]"
    />
  );
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 55,
  duration = 1.05,
  className = ""
}) {
  const getOffset = () => {
    switch (direction) {
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "down":
        return { x: 0, y: -distance };
      case "up":
      default:
        return { x: 0, y: distance };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.32, margin: "-60px" }}
      transition={{ duration, delay, ease: cinematicEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "", stagger = 0.14 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.08 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, direction = "up", className = "" }) {
  const initialX = direction === "left" ? -45 : direction === "right" ? 45 : 0;
  const initialY = direction === "up" ? 42 : 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: initialX, y: initialY, scale: 0.96 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.95, ease: cinematicEase }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Card3D({ children, className = "", maxTilt = 7 }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 280,
    damping: 24,
    mass: 0.4
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 280,
    damping: 24,
    mass: 0.4
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
        whileHover={{ z: 16, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`h-full ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Scroll3DCard({ children, className = "", direction = "center" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 98%", "center 55%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.45,
    restDelta: 0.0005
  });

  const initialRotateY = direction === "left" ? 14 : direction === "right" ? -14 : 0;
  const rotateX = useTransform(smoothProgress, [0, 1], [18, 0]);
  const rotateY = useTransform(smoothProgress, [0, 1], [initialRotateY, 0]);
  const z = useTransform(smoothProgress, [0, 1], [-90, 0]);
  const y = useTransform(smoothProgress, [0, 1], [48, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.91, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.25, 1], [0.2, 0.92, 1]);

  return (
    <div ref={ref} style={{ perspective: 1200 }} className={`h-full w-full ${className}`}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          z,
          y,
          scale,
          opacity,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity"
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Scroll3DPanel({ children, className = "", wrapperClassName = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "center 55%"]
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 22,
    mass: 0.45,
    restDelta: 0.0005
  });

  const rotateX = useTransform(smooth, [0, 1], [15, 0]);
  const scale = useTransform(smooth, [0, 1], [0.92, 1]);
  const y = useTransform(smooth, [0, 1], [46, 0]);
  const opacity = useTransform(smooth, [0, 0.25, 1], [0.25, 0.94, 1]);

  return (
    <div ref={ref} style={{ perspective: 1400 }} className={`w-full ${wrapperClassName}`}>
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformStyle: "preserve-3d",
          willChange: "transform, opacity"
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function SchoolScrollBackdrop() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"]
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.45,
    restDelta: 0.0005
  });

  // Active strictly between Hero and Footer
  const stageOpacity = useTransform(smooth, [0, 0.04, 0.94, 1], [0, 1, 1, 0]);

  // Multi-stage 3D journey progression (0 -> 0.33 -> 0.66 -> 1.0)
  // Stage 1: Heritage Bell-Tower Arch & Crest (0.0 -> 0.35)
  const archScale = useTransform(smooth, [0, 0.2, 0.4], [0.65, 1.25, 1.65]);
  const archOpacity = useTransform(smooth, [0, 0.15, 0.35, 0.48], [0.1, 0.95, 0.7, 0]);
  const archRotateY = useTransform(smooth, [0, 0.4], [-25, 25]);

  // Stage 2: Orbiting Graduation Cap & Open Book sweeping across viewport (0.2 -> 0.68)
  const capX = useTransform(smooth, [0.15, 0.45, 0.72], ["-35vw", "18vw", "42vw"]);
  const capY = useTransform(smooth, [0.15, 0.45, 0.72], ["-22vh", "8vh", "32vh"]);
  const capRotate = useTransform(smooth, [0.15, 0.72], [-35, 45]);
  const capScale = useTransform(smooth, [0.15, 0.45, 0.72], [0.7, 1.35, 0.8]);

  const bookX = useTransform(smooth, [0.2, 0.5, 0.78], ["38vw", "-15vw", "-40vw"]);
  const bookY = useTransform(smooth, [0.2, 0.5, 0.78], ["25vh", "-6vh", "-28vh"]);
  const bookRotate = useTransform(smooth, [0.2, 0.78], [40, -40]);
  const bookScale = useTransform(smooth, [0.2, 0.5, 0.78], [0.7, 1.35, 0.8]);

  // Stage 3: Science Atom, Compass & Torch of Excellence sweeping in lower sections (0.5 -> 1.0)
  const atomX = useTransform(smooth, [0.48, 0.75, 1], ["-36vw", "12vw", "36vw"]);
  const atomY = useTransform(smooth, [0.48, 0.75, 1], ["26vh", "-4vh", "-26vh"]);
  const atomSpin = useTransform(smooth, [0.48, 1], [0, 540]);
  const atomScale = useTransform(smooth, [0.48, 0.75, 1], [0.7, 1.4, 0.85]);

  const torchX = useTransform(smooth, [0.52, 0.8, 1], ["34vw", "-10vw", "-34vw"]);
  const torchY = useTransform(smooth, [0.52, 0.8, 1], ["-24vh", "6vh", "28vh"]);
  const torchRotate = useTransform(smooth, [0.52, 1], [-25, 30]);

  // Continuous 3D Golden Ribbon Wave sweeping across entire page
  const ribbonX = useTransform(smooth, [0, 0.5, 1], ["-22%", "22%", "-18%"]);
  const ribbonRotate = useTransform(smooth, [0, 1], [-14, 14]);
  const crestSpin = useTransform(smooth, [0, 1], [0, 480]);
  const crestTiltX = useTransform(smooth, [0, 0.33, 0.66, 1], [48, 15, 45, 12]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <motion.div
        style={{ opacity: stageOpacity, perspective: 1000 }}
        className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0"
      >
        {/* Warm Royal Gold Radial Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(197,155,39,0.26),rgba(122,32,33,0.06)_55%,transparent_80%)]" />

        {/* Sweeping 3D Royal Gold Silk Wave */}
        <motion.div
          style={{ x: ribbonX, rotate: ribbonRotate, willChange: "transform" }}
          className="absolute -inset-x-32 top-[28%] h-40 bg-gradient-to-r from-transparent via-[#C59B27]/20 to-transparent blur-2xl"
        />

        {/* Continuous 3D Gyroscope Heritage Halo */}
        <motion.div
          style={{
            rotateZ: crestSpin,
            rotateX: crestTiltX,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
          className="w-[380px] h-[380px] sm:w-[620px] sm:h-[620px] rounded-full border-2 border-[#C59B27]/55 shadow-[0_0_80px_rgba(197,155,39,0.25)] flex items-center justify-center"
        >
          <div className="w-[82%] h-[82%] rounded-full border-2 border-dashed border-[#7A2021]/45" />
        </motion.div>

        {/* STAGE 1: Heritage School Bell-Tower Arch (Zooms through 3D space in top sections) */}
        <motion.svg
          style={{
            scale: archScale,
            opacity: archOpacity,
            rotateY: archRotateY,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity"
          }}
          viewBox="0 0 400 500"
          className="absolute w-[320px] sm:w-[460px] h-auto text-[#7A2021]/30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
        >
          <path d="M70 470 V205 C70 112 132 52 200 52 C268 52 330 112 330 205 V470" />
          <path d="M98 470 V210 C98 130 146 80 200 80 C254 80 302 130 302 210 V470" />
          <line x1="200" y1="20" x2="200" y2="96" />
          <line x1="172" y1="48" x2="228" y2="48" />
        </motion.svg>

        {/* STAGE 2A: Sweeping 3D Graduation Mortarboard Cap */}
        <motion.div
          style={{
            x: capX,
            y: capY,
            rotateZ: capRotate,
            rotateY: capRotate,
            scale: capScale,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
          className="absolute"
        >
          <svg viewBox="0 0 64 64" className="w-24 h-24 sm:w-36 sm:h-36 text-[#7A2021]/50 drop-shadow-[0_14px_28px_rgba(197,155,39,0.35)]" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M32 12L4 26L32 40L60 26L32 12Z" fill="rgba(197,155,39,0.22)" />
            <path d="M15 32V45C15 49 22 53 32 53C42 53 49 49 49 45V32" />
            <path d="M56 28V44" />
            <circle cx="56" cy="46" r="2.5" fill="currentColor" />
          </svg>
        </motion.div>

        {/* STAGE 2B: Sweeping 3D Open Book of Wisdom */}
        <motion.div
          style={{
            x: bookX,
            y: bookY,
            rotateZ: bookRotate,
            rotateX: bookRotate,
            scale: bookScale,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
          className="absolute"
        >
          <svg viewBox="0 0 64 64" className="w-24 h-24 sm:w-36 sm:h-36 text-[#7A2021]/50 drop-shadow-[0_14px_28px_rgba(122,32,33,0.25)]" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M32 18C26 14 14 14 8 18V50C14 46 26 46 32 50C38 46 50 46 56 50V18C50 14 38 14 32 18Z" fill="rgba(197,155,39,0.22)" />
            <line x1="32" y1="18" x2="32" y2="50" />
            <line x1="14" y1="26" x2="26" y2="26" />
            <line x1="14" y1="34" x2="26" y2="34" />
            <line x1="38" y1="26" x2="50" y2="26" />
            <line x1="38" y1="34" x2="50" y2="34" />
          </svg>
        </motion.div>

        {/* STAGE 3A: Sweeping 3D Science & Discovery Atom (Facilities & Academics) */}
        <motion.div
          style={{
            x: atomX,
            y: atomY,
            rotateZ: atomSpin,
            scale: atomScale,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
          className="absolute"
        >
          <svg viewBox="0 0 64 64" className="w-24 h-24 sm:w-36 sm:h-36 text-[#9E7818]/55 drop-shadow-[0_14px_28px_rgba(197,155,39,0.35)]" fill="none" stroke="currentColor" strokeWidth="2.1">
            <circle cx="32" cy="32" r="4.5" fill="rgba(122,32,33,0.4)" />
            <ellipse cx="32" cy="32" rx="24" ry="9" />
            <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(60 32 32)" />
            <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(120 32 32)" />
          </svg>
        </motion.div>

        {/* STAGE 3B: Sweeping 3D Royal School Shield & Torch Crest */}
        <motion.div
          style={{
            x: torchX,
            y: torchY,
            rotateZ: torchRotate,
            rotateY: torchRotate,
            scale: atomScale,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
          className="absolute"
        >
          <svg viewBox="0 0 64 64" className="w-24 h-24 sm:w-36 sm:h-36 text-[#7A2021]/50 drop-shadow-[0_14px_28px_rgba(122,32,33,0.25)]" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M32 8L12 16V32C12 45 20 53 32 58C44 53 52 45 52 32V16L32 8Z" fill="rgba(197,155,39,0.2)" />
            <path d="M32 18V46" />
            <path d="M21 30H43" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
