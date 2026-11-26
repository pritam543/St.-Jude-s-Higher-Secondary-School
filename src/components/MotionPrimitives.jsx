import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionTemplate
} from "framer-motion";

export const cinematicEase = [0.22, 1, 0.36, 1];

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
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
  distance = 44,
  duration = 0.8,
  className = ""
}) {
  const getOffset = () => {
    switch (direction) {
      case "left":
        return { x: -distance, y: 0, rotateY: 18, rotateX: 0 };
      case "right":
        return { x: distance, y: 0, rotateY: -18, rotateX: 0 };
      case "down":
        return { x: 0, y: -distance, rotateX: -18, rotateY: 0 };
      case "up":
      default:
        return { x: 0, y: distance, rotateX: 20, rotateY: 0 };
    }
  };

  const offset = getOffset();

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          x: offset.x,
          y: offset.y,
          rotateX: offset.rotateX,
          rotateY: offset.rotateY,
          scale: 0.92
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1
        }}
        viewport={{ once: false, amount: 0.15, margin: "-20px" }}
        transition={{ duration, delay, ease: cinematicEase }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerContainer({ children, className = "", stagger = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15, margin: "-20px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.04 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, direction = "up", className = "" }) {
  const initialX = direction === "left" ? -42 : direction === "right" ? 42 : 0;
  const initialY = direction === "up" ? 38 : 0;
  const initialRotateY = direction === "left" ? 20 : direction === "right" ? -20 : 0;

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: initialX,
          y: initialY,
          rotateX: 22,
          rotateY: initialRotateY,
          scale: 0.9
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          transition: { duration: 0.78, ease: cinematicEase }
        }
      }}
      style={{ transformPerspective: 1100, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ULTRA-RICH 3D HOVER CARD: Heavy ±16deg 3D Tilt + Z-Lift + Royal Gold Rim Glow + Crisp Edge Glare (100% Clear Text!)
export function Card3D({ children, className = "", maxTilt = 16 }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 360,
    damping: 20,
    mass: 0.3
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 360,
    damping: 20,
    mass: 0.3
  });

  // Subtle edge-only golden aura (never washes out text contrast!)
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${glareX}% ${glareY}%, rgba(229, 193, 88, 0.16), transparent 72%)`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    mouseX.set(relX - 0.5);
    mouseY.set(relY - 0.5);
    glareX.set(relX * 100);
    glareY.set(relY * 100);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <div style={{ perspective: 950 }} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
        whileHover={{
          scale: 1.032,
          y: -8,
          boxShadow: "0 30px 65px -10px rgba(122, 32, 33, 0.38), 0 0 0 2px rgba(229, 193, 88, 0.85), 0 0 36px rgba(229, 193, 88, 0.35)"
        }}
        transition={{ type: "spring", stiffness: 340, damping: 20 }}
        className={`group relative h-full overflow-hidden rounded-3xl transition-shadow ${className}`}
      >
        {children}

        {/* Crystal-Clear Edge Spotlight (keeps text 100% sharp) */}
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Crisp Royal Gold Border Frame on Hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-inset ring-[#E5C158]/0 group-hover:ring-[#E5C158]/80 transition-all duration-300"
        />

        {/* Fast Diagonal Light Glint */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-[#E5C158]/20 to-transparent skew-x-[-24deg] group-hover:left-[150%] transition-all duration-700 ease-out"
        />
      </motion.div>
    </div>
  );
}

// SCROLL 3D CARD WITH BUILT-IN HEAVY 3D INTERACTIVE HOVER (Every single card gets both Scroll Video + Heavy 3D Hover!)
export function Scroll3DCard({ children, className = "", direction = "center" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "end 8%"]
  });

  const sign = direction === "left" ? -1 : direction === "right" ? 1 : 0;

  const rotateX = useTransform(scrollYProgress, [0, 0.32, 0.72, 1], [26, 0, 0, -18]);
  const rotateY = useTransform(scrollYProgress, [0, 0.32, 0.72, 1], [sign * -28, 0, 0, sign * 18]);
  const x = useTransform(scrollYProgress, [0, 0.32, 0.72, 1], [sign * 56, 0, 0, sign * -32]);
  const y = useTransform(scrollYProgress, [0, 0.32, 0.72, 1], [44, 0, 0, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.32, 0.72, 1], [0.84, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.15, 1, 1, 0.5]);

  const sheen1X = useTransform(scrollYProgress, [0.05, 0.85], ["-140%", "160%"]);
  const sheen2X = useTransform(scrollYProgress, [0.15, 0.95], ["160%", "-140%"]);

  return (
    <div ref={ref} style={{ perspective: 1150 }} className={`h-full w-full ${className}`}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          x,
          y,
          scale,
          opacity,
          backfaceVisibility: "hidden",
          willChange: "transform, opacity"
        }}
        className="relative h-full w-full rounded-3xl"
      >
        <Card3D maxTilt={15} className="h-full w-full">
          {children}
        </Card3D>

        {/* Auto-Sweeping Cinema Light Beam */}
        <motion.div
          aria-hidden="true"
          style={{ x: sheen1X }}
          className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#E5C158]/22 to-transparent skew-x-[-22deg]"
        />
        <motion.div
          aria-hidden="true"
          style={{ x: sheen2X }}
          className="pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-[22deg]"
        />
      </motion.div>
    </div>
  );
}

// SCROLL 3D PANEL WITH BUILT-IN 3D HOVER LIFT & GOLD RIM (Institutional Chronicle, Digital Infrastructure, Contact & Gallery Panels!)
export function Scroll3DPanel({ children, className = "", wrapperClassName = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "end 8%"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.32, 0.74, 1], [22, 0, 0, -14]);
  const scale = useTransform(scrollYProgress, [0, 0.32, 0.74, 1], [0.87, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.32, 0.74, 1], [40, 0, 0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.18, 1, 1, 0.55]);
  const sheenX = useTransform(scrollYProgress, [0.05, 0.9], ["-140%", "160%"]);

  return (
    <div ref={ref} style={{ perspective: 1350 }} className={`w-full ${wrapperClassName}`}>
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          backfaceVisibility: "hidden",
          willChange: "transform, opacity"
        }}
        whileHover={{
          y: -7,
          scale: 1.015,
          boxShadow: "0 32px 70px -12px rgba(122, 32, 33, 0.35), 0 0 0 2px rgba(229, 193, 88, 0.8), 0 0 35px rgba(229, 193, 88, 0.28)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`group relative overflow-hidden rounded-3xl ${className}`}
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ x: sheenX }}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#E5C158]/20 to-transparent skew-x-[-22deg]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-inset ring-[#E5C158]/0 group-hover:ring-[#E5C158]/75 transition-all duration-300"
        />
      </motion.div>
    </div>
  );
}

export function Scroll3DHeading({ children, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "center 42%"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [34, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [44, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.12, 0.92, 1]);

  return (
    <div ref={ref} style={{ perspective: 1000 }} className="w-full">
      <motion.div
        style={{
          rotateX,
          y,
          scale,
          opacity,
          willChange: "transform, opacity"
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ENHANCED 3D VIDEO STAGE BACKDROP (Continuous 3D Gyroscope + Orbiting Elements + Depth Waves)
export function SchoolScrollBackdrop() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 25%"]
  });

  const stageOpacity = useTransform(scrollYProgress, [0, 0.04, 0.94, 1], [0, 1, 1, 0]);

  const archScale = useTransform(scrollYProgress, [0, 0.22, 0.48], [0.65, 1.35, 1.85]);
  const archOpacity = useTransform(scrollYProgress, [0, 0.15, 0.38, 0.5], [0.15, 0.95, 0.75, 0]);
  const archRotateY = useTransform(scrollYProgress, [0, 0.48], [-35, 35]);

  const capX = useTransform(scrollYProgress, [0.12, 0.45, 0.75], ["-36vw", "20vw", "42vw"]);
  const capY = useTransform(scrollYProgress, [0.12, 0.45, 0.75], ["-22vh", "10vh", "32vh"]);
  const capRotate = useTransform(scrollYProgress, [0.12, 0.75], [-45, 65]);
  const capScale = useTransform(scrollYProgress, [0.12, 0.45, 0.75], [0.75, 1.45, 0.85]);

  const bookX = useTransform(scrollYProgress, [0.18, 0.5, 0.8], ["38vw", "-16vw", "-40vw"]);
  const bookY = useTransform(scrollYProgress, [0.18, 0.5, 0.8], ["25vh", "-8vh", "-28vh"]);
  const bookRotate = useTransform(scrollYProgress, [0.18, 0.8], [50, -50]);
  const bookScale = useTransform(scrollYProgress, [0.18, 0.5, 0.8], [0.75, 1.45, 0.85]);

  const atomX = useTransform(scrollYProgress, [0.45, 0.75, 1], ["-36vw", "14vw", "36vw"]);
  const atomY = useTransform(scrollYProgress, [0.45, 0.75, 1], ["26vh", "-6vh", "-26vh"]);
  const atomSpin = useTransform(scrollYProgress, [0.45, 1], [0, 720]);
  const atomScale = useTransform(scrollYProgress, [0.45, 0.75, 1], [0.75, 1.5, 0.9]);

  const torchX = useTransform(scrollYProgress, [0.48, 0.8, 1], ["34vw", "-12vw", "-34vw"]);
  const torchY = useTransform(scrollYProgress, [0.48, 0.8, 1], ["-24vh", "8vh", "28vh"]);
  const torchRotate = useTransform(scrollYProgress, [0.48, 1], [-35, 45]);

  const prism1Y = useTransform(scrollYProgress, [0, 0.5, 1], ["32vh", "-10vh", "-36vh"]);
  const prism1Rotate = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const prism2Y = useTransform(scrollYProgress, [0, 0.5, 1], ["-30vh", "12vh", "36vh"]);
  const prism2Rotate = useTransform(scrollYProgress, [0, 1], [420, 0]);

  const ribbonX = useTransform(scrollYProgress, [0, 0.5, 1], ["-26%", "26%", "-22%"]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const crestSpin = useTransform(scrollYProgress, [0, 1], [0, 620]);
  const crestTiltX = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [54, 14, 50, 12]);

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(197,155,39,0.34),rgba(122,32,33,0.09)_55%,transparent_82%)]" />

        <motion.div
          style={{ x: ribbonX, rotate: ribbonRotate, willChange: "transform" }}
          className="absolute -inset-x-32 top-[28%] h-44 bg-gradient-to-r from-transparent via-[#C59B27]/28 to-transparent blur-2xl"
        />

        {/* Multi-Ring 3D Gyroscope */}
        <motion.div
          style={{
            rotateZ: crestSpin,
            rotateX: crestTiltX,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
          className="w-[380px] h-[380px] sm:w-[640px] sm:h-[640px] rounded-full border-2 border-[#C59B27]/65 shadow-[0_0_95px_rgba(197,155,39,0.32)] flex items-center justify-center"
        >
          <div className="w-[82%] h-[82%] rounded-full border-2 border-dashed border-[#7A2021]/55" />
          <div className="absolute w-[62%] h-[62%] rounded-3xl border border-[#C59B27]/50 rotate-45" />
        </motion.div>

        {/* Floating 3D Geometric Prisms */}
        <motion.div
          style={{ y: prism1Y, rotateZ: prism1Rotate, rotateY: prism1Rotate, willChange: "transform" }}
          className="absolute left-[9%] w-16 h-16 sm:w-24 sm:h-24 border-2 border-[#C59B27]/60 bg-[#E5C158]/12 rounded-2xl shadow-[0_0_30px_rgba(197,155,39,0.28)]"
        />
        <motion.div
          style={{ y: prism2Y, rotateZ: prism2Rotate, rotateX: prism2Rotate, willChange: "transform" }}
          className="absolute right-[9%] w-20 h-20 sm:w-28 sm:h-28 border-2 border-[#7A2021]/50 bg-[#7A2021]/12 rounded-full shadow-[0_0_30px_rgba(122,32,33,0.24)]"
        />

        <motion.svg
          style={{
            scale: archScale,
            opacity: archOpacity,
            rotateY: archRotateY,
            willChange: "transform, opacity"
          }}
          viewBox="0 0 400 500"
          className="absolute w-[320px] sm:w-[460px] h-auto text-[#7A2021]/38"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
        >
          <path d="M70 470 V205 C70 112 132 52 200 52 C268 52 330 112 330 205 V470" />
          <path d="M98 470 V210 C98 130 146 80 200 80 C254 80 302 130 302 210 V470" />
          <line x1="200" y1="20" x2="200" y2="96" />
          <line x1="172" y1="48" x2="228" y2="48" />
        </motion.svg>

        <motion.div
          style={{
            x: capX,
            y: capY,
            rotateZ: capRotate,
            rotateY: capRotate,
            scale: capScale,
            willChange: "transform"
          }}
          className="absolute"
        >
          <svg viewBox="0 0 64 64" className="w-24 h-24 sm:w-36 sm:h-36 text-[#7A2021]/60 drop-shadow-[0_14px_28px_rgba(197,155,39,0.4)]" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M32 12L4 26L32 40L60 26L32 12Z" fill="rgba(197,155,39,0.28)" />
            <path d="M15 32V45C15 49 22 53 32 53C42 53 49 49 49 45V32" />
            <path d="M56 28V44" />
            <circle cx="56" cy="46" r="2.5" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div
          style={{
            x: bookX,
            y: bookY,
            rotateZ: bookRotate,
            rotateX: bookRotate,
            scale: bookScale,
            willChange: "transform"
          }}
          className="absolute"
        >
          <svg viewBox="0 0 64 64" className="w-24 h-24 sm:w-36 sm:h-36 text-[#7A2021]/60 drop-shadow-[0_14px_28px_rgba(122,32,33,0.3)]" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M32 18C26 14 14 14 8 18V50C14 46 26 46 32 50C38 46 50 46 56 50V18C50 14 38 14 32 18Z" fill="rgba(197,155,39,0.28)" />
            <line x1="32" y1="18" x2="32" y2="50" />
            <line x1="14" y1="26" x2="26" y2="26" />
            <line x1="14" y1="34" x2="26" y2="34" />
            <line x1="38" y1="26" x2="50" y2="26" />
            <line x1="38" y1="34" x2="50" y2="34" />
          </svg>
        </motion.div>

        <motion.div
          style={{
            x: atomX,
            y: atomY,
            rotateZ: atomSpin,
            scale: atomScale,
            willChange: "transform"
          }}
          className="absolute"
        >
          <svg viewBox="0 0 64 64" className="w-24 h-24 sm:w-36 sm:h-36 text-[#9E7818]/65 drop-shadow-[0_14px_28px_rgba(197,155,39,0.4)]" fill="none" stroke="currentColor" strokeWidth="2.3">
            <circle cx="32" cy="32" r="4.5" fill="rgba(122,32,33,0.45)" />
            <ellipse cx="32" cy="32" rx="24" ry="9" />
            <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(60 32 32)" />
            <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(120 32 32)" />
          </svg>
        </motion.div>

        <motion.div
          style={{
            x: torchX,
            y: torchY,
            rotateZ: torchRotate,
            rotateY: torchRotate,
            scale: atomScale,
            willChange: "transform"
          }}
          className="absolute"
        >
          <svg viewBox="0 0 64 64" className="w-24 h-24 sm:w-36 sm:h-36 text-[#7A2021]/60 drop-shadow-[0_14px_28px_rgba(122,32,33,0.3)]" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M32 8L12 16V32C12 45 20 53 32 58C44 53 52 45 52 32V16L32 8Z" fill="rgba(197,155,39,0.26)" />
            <path d="M32 18V46" />
            <path d="M21 30H43" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Showcase3DBackdrop() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const stageOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);
  const beamRotateLeft = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 14, -14]);
  const beamRotateRight = useTransform(scrollYProgress, [0, 0.5, 1], [18, -14, 14]);
  const medallionSpin = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const medallionScale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.95, 1.22, 0.92, 1.12]);

  const frame1X = useTransform(scrollYProgress, [0.1, 0.52, 1], ["-32vw", "16vw", "38vw"]);
  const frame1Y = useTransform(scrollYProgress, [0.1, 0.52, 1], ["-18vh", "10vh", "28vh"]);
  const frame1Rotate = useTransform(scrollYProgress, [0.1, 1], [-22, 30]);

  const frame2X = useTransform(scrollYProgress, [0.2, 0.62, 1], ["35vw", "-15vw", "-36vw"]);
  const frame2Y = useTransform(scrollYProgress, [0.2, 0.62, 1], ["22vh", "-8vh", "-26vh"]);
  const frame2Rotate = useTransform(scrollYProgress, [0.2, 1], [24, -26]);

  const crownY = useTransform(scrollYProgress, [0, 0.5, 1], ["-12vh", "14vh", "-10vh"]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <motion.div
        style={{ opacity: stageOpacity, perspective: 1100 }}
        className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(197,155,39,0.38),rgba(122,32,33,0.14)_56%,transparent_84%)]" />

        <motion.div
          style={{
            rotate: beamRotateLeft,
            transformOrigin: "top center",
            willChange: "transform"
          }}
          className="absolute -top-20 left-[14%] w-72 sm:w-[440px] h-[125vh] bg-gradient-to-b from-[#C59B27]/36 via-[#E5C158]/16 to-transparent blur-2xl"
        />
        <motion.div
          style={{
            rotate: beamRotateRight,
            transformOrigin: "top center",
            willChange: "transform"
          }}
          className="absolute -top-20 right-[14%] w-72 sm:w-[440px] h-[125vh] bg-gradient-to-b from-[#7A2021]/30 via-[#C59B27]/18 to-transparent blur-2xl"
        />

        <motion.div
          style={{
            rotateZ: medallionSpin,
            rotateX: 35,
            scale: medallionScale,
            willChange: "transform"
          }}
          className="w-[380px] h-[380px] sm:w-[600px] sm:h-[600px] rounded-[3.5rem] border-[3px] border-[#C59B27]/75 shadow-[0_0_100px_rgba(197,155,39,0.42)] flex items-center justify-center"
        >
          <div className="w-[78%] h-[78%] rounded-[2.5rem] border-[3px] border-dashed border-[#7A2021]/60 rotate-45" />
        </motion.div>

        <motion.div
          style={{ y: crownY, scale: medallionScale, willChange: "transform" }}
          className="absolute top-[15%] text-[#7A2021]/45 drop-shadow-[0_10px_25px_rgba(197,155,39,0.35)]"
        >
          <svg viewBox="0 0 120 80" className="w-44 sm:w-64 h-auto" fill="none" stroke="currentColor" strokeWidth="2.8">
            <path d="M24 62 C12 48, 12 26, 28 14" />
            <path d="M96 62 C108 48, 108 26, 92 14" />
            <path d="M40 48 L46 28 L60 38 L74 28 L80 48 Z" fill="rgba(197,155,39,0.35)" />
            <circle cx="60" cy="20" r="3.5" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div
          style={{
            x: frame1X,
            y: frame1Y,
            rotateZ: frame1Rotate,
            rotateY: frame1Rotate,
            willChange: "transform"
          }}
          className="absolute w-40 h-48 sm:w-52 sm:h-60 rounded-2xl bg-[#FCF7EE]/85 border-[2.5px] border-[#C59B27]/85 p-3 shadow-[0_22px_50px_rgba(122,32,33,0.28)] flex flex-col justify-between"
        >
          <div className="w-full h-3/4 rounded-xl bg-gradient-to-br from-[#7A2021]/30 via-[#C59B27]/35 to-[#541213]/30 border border-[#C59B27]/60 flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="w-12 h-12 text-[#7A2021]/70" fill="none" stroke="currentColor" strokeWidth="2.4">
              <rect x="6" y="10" width="36" height="28" rx="4" />
              <circle cx="17" cy="20" r="3" />
              <path d="M8 34 L19 24 L28 31 L34 26 L40 34" />
            </svg>
          </div>
          <div className="h-2.5 w-2/3 rounded-full bg-[#7A2021]/45 mx-auto" />
        </motion.div>

        <motion.div
          style={{
            x: frame2X,
            y: frame2Y,
            rotateZ: frame2Rotate,
            rotateX: frame2Rotate,
            willChange: "transform"
          }}
          className="absolute w-40 h-48 sm:w-52 sm:h-60 rounded-2xl bg-[#FCF7EE]/85 border-[2.5px] border-[#7A2021]/70 p-3 shadow-[0_22px_50px_rgba(197,155,39,0.32)] flex flex-col justify-between"
        >
          <div className="w-full h-3/4 rounded-xl bg-gradient-to-tr from-[#C59B27]/35 via-[#7A2021]/28 to-[#E5C158]/35 border border-[#7A2021]/50 flex items-center justify-center">
            <svg viewBox="0 0 48 48" className="w-12 h-12 text-[#7A2021]/70" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M24 8 L28 18 L39 19 L31 26 L33 37 L24 31 L15 37 L17 26 L9 19 L20 18 Z" />
            </svg>
          </div>
          <div className="h-2.5 w-1/2 rounded-full bg-[#C59B27]/70 mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
