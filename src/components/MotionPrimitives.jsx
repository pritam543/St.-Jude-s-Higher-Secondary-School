import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

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
