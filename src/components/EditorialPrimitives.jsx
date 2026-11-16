import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const luxuryEase = [0.22, 1, 0.36, 1];

export function MaskedHeadline({ text, italicWord, className = "" }) {
  const words = text.split(" ");

  return (
    <h2 className={`font-editorial tracking-tight leading-[1.08] ${className}`}>
      {words.map((word, idx) => {
        const isItalic =
          italicWord &&
          word.toLowerCase().replace(/[^a-z]/g, "") ===
            italicWord.toLowerCase().replace(/[^a-z]/g, "");

        return (
          <span key={idx} className="inline-block overflow-hidden align-bottom mr-[0.26em] pb-1">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.85,
                delay: idx * 0.055,
                ease: luxuryEase
              }}
              className={`inline-block ${isItalic ? "italic font-normal text-[#C5A059]" : ""}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </h2>
  );
}

export function HairlineDivider({ dark = false }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: luxuryEase }}
      className={`h-[1px] w-full origin-left ${
        dark ? "bg-[#C5A059]/25" : "bg-[#1C1917]/15"
      }`}
    />
  );
}

export function ParallaxDepthBox({ children, offset = 35, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
