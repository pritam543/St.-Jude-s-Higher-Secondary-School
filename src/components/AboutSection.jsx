import React from "react";
import { ScrollytellingChapter } from "./ScrollytellingEngine";
import { motion } from "framer-motion";
import { Compass, Eye, HeartHandshake, Sparkles, Landmark } from "lucide-react";
import { schoolInfo, historyTimeline } from "../data/schoolData";
import { Reveal, StaggerContainer, StaggerItem } from "./MotionPrimitives";

export default function AboutSection() {
  return (
    <ScrollytellingChapter chapterLabel="Chapter I • Heritage & Legacy" watermark="EST. 1985 • NIMAR">
      <motion.section id="about" className="py-24 bg-[#FCF7EE] border-y border-[#7A2021]/15 overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
      <div className="max-w-7xl mx-auto px-4 space-y-20">
        <Reveal direction="up" className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
            Our Heritage &amp; Legacy
          </span>
          <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            About St. Jude&apos;s H.S. School
          </motion.h2>
          <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          <p className="text-[#5C3A38] text-base sm:text-lg leading-relaxed pt-2">
            Operated by the <strong className="text-[#7A2021]">Catholic Diocese of Khandwa (Registered)</strong> under the chairmanship of{" "}
            <strong className="text-[#7A2021]">Most Rev. Augustine Madathikunnel</strong>, Bishop of Khandwa, St. Jude&apos;s embraces students of all backgrounds without regard to caste, creed, or religion.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          <Reveal direction="left" delay={0.05}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="h-full bg-[#F6EBD9] p-8 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border border-[#7A2021]/20 shadow-md hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#7A2021] text-[#E5C158] flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <motion.h3 className="text-2xl font-bold text-[#7A2021] mb-3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>Our Vision</motion.h3>
              <p className="text-sm sm:text-base text-[#2B1615]/85 leading-relaxed">
                {schoolInfo.vision}
              </p>
            </motion.div>
          </Reveal>

          <Reveal direction="up" delay={0.18}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="h-full bg-[#7A2021] text-[#F6EBD9] p-8 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border-2 border-[#C59B27] shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#C59B27] text-[#2B1615] flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <motion.h3 className="text-2xl font-bold text-[#E5C158] mb-3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>Our Mission</motion.h3>
              <p className="text-sm sm:text-base text-[#F6EBD9]/90 leading-relaxed">
                {schoolInfo.mission}
              </p>
            </motion.div>
          </Reveal>

          <Reveal direction="right" delay={0.3}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="h-full bg-[#F6EBD9] p-8 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border border-[#7A2021]/20 shadow-md hover:shadow-2xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#7A2021] text-[#E5C158] flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <motion.h3 className="text-2xl font-bold text-[#7A2021] mb-3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>Core Values</motion.h3>
              <ul className="space-y-2.5 pt-1">
                {schoolInfo.coreValues.map((val) => (
                  <li key={val} className="flex items-center gap-2.5 text-sm font-semibold text-[#2B1615]">
                    <Sparkles className="w-4 h-4 text-[#C59B27] shrink-0" />
                    {val}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <Reveal direction="left" className="lg:col-span-6 space-y-5 bg-[#F6EBD9]/70 p-8 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border border-[#7A2021]/15">
            <div className="inline-flex items-center gap-2 text-[#7A2021] font-bold text-xs uppercase tracking-widest">
              <Landmark className="w-4 h-4 text-[#C59B27]" /> Institutional Chronicle
            </div>
            <motion.h3 className="text-2xl sm:text-3xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
              Four Decades of Shaping Young Minds in Khargone
            </motion.h3>
            <p className="text-sm sm:text-base text-[#5C3A38] leading-relaxed">
              Established in 1985 under the visionary leadership of the late <strong>Most Rev. Dr. Abraham Viruthakulangara</strong>, St. Jude&apos;s began through the initiative of <strong>Rev. Fr. M. Chinnappar</strong> alongside FSMA sisters <strong>Rev. Sr. Maria Lawrence</strong>, <strong>Rev. Sr. Rose</strong>, and <strong>Rev. Sr. Deepti</strong>.
            </p>
            <p className="text-sm sm:text-base text-[#5C3A38] leading-relaxed">
              In 1992, academic management was entrusted to the <strong>Dominican Sisters of the Presentation</strong>, guided by esteemed Principals <strong>Rev. Sr. Deepa Moonely OP</strong>, <strong>Rev. Sr. Elsy OP</strong>, and <strong>Rev. Sr. Teresa D&apos;Souza</strong>, alongside dedicated Managers who transformed Mangrul Road into an educational landmark.
            </p>
          </Reveal>

          <StaggerContainer className="lg:col-span-6 space-y-4">
            {historyTimeline.map((item) => (
              <StaggerItem key={item.year} direction="right">
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="p-6 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#F6EBD9] border-l-4 border-[#7A2021] shadow-sm hover:shadow-md transition"
                >
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#7A2021] text-[#E5C158] text-xs font-bold mb-2">
                    {item.year}
                  </span>
                  <h4 className="font-cinzel text-lg font-bold text-[#7A2021]">{item.title}</h4>
                  <p className="text-sm text-[#5C3A38] mt-1 leading-relaxed">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </motion.section>
      </ScrollytellingChapter>
);
}


