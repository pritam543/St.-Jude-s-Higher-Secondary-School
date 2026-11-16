import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const cinemaCurve = [0.16, 1, 0.3, 1];

export function ScrollytellingChapter({ children, chapterLabel = "", watermark = "", className = "" }) {
  const chapterRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  const watermarkX = useTransform(smoothProgress, [0, 1], ["12%", "-14%"]);
  const contentScale = useTransform(smoothProgress, [0, 0.14, 0.88, 1], [0.96, 1, 1, 0.98]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.12, 0.9, 1], [0.25, 1, 1, 0.65]);
  const lineScaleY = useTransform(smoothProgress, [0.05, 0.85], [0, 1]);

  return (
    <div ref={chapterRef} className={`relative overflow-hidden ${className}`}>
      {/* Scroll-Driven Left Golden Progress Thread */}
      <div className="hidden lg:block pointer-events-none absolute left-5 top-16 bottom-16 w-[2px] bg-[#7A2021]/10 z-20">
        <motion.div
          style={{ scaleY: lineScaleY }}
          className="w-full h-full origin-top bg-gradient-to-b from-[#C59B27] via-[#7A2021] to-[#C59B27]"
        />
      </div>

      {/* Horizontal Scroll-Scrubbed Watermark */}
      {watermark && (
        <motion.div
          style={{ x: watermarkX }}
          className="pointer-events-none absolute top-10 left-0 right-0 select-none z-0 overflow-hidden whitespace-nowrap"
        >
          <span className="font-cinzel text-[90px] sm:text-[150px] font-bold uppercase tracking-[0.18em] text-[#7A2021]/[0.04]">
            {watermark}
          </span>
        </motion.div>
      )}

      {/* Floating Chapter Stamp */}
      {chapterLabel && (
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: cinemaCurve }}
          className="max-w-7xl mx-auto px-4 pt-8 -mb-14 relative z-20"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#7A2021]/75 bg-[#FCF7EE]/85 backdrop-blur-sm border border-[#C59B27]/40 px-3.5 py-1 rounded-full shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] animate-pulse" />
            {chapterLabel}
          </span>
        </motion.div>
      )}

      {/* Scroll-Linked Zoom & Reveal Wrapper */}
      <motion.div
        style={{ scale: contentScale, opacity: contentOpacity }}
        className="relative z-10 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
