import React from "react";
import { ScrollytellingChapter } from "./ScrollytellingEngine";
import { motion } from "framer-motion";
import { Compass, Eye, HeartHandshake, Sparkles, Landmark } from "lucide-react";
import { schoolInfo, historyTimeline } from "../data/schoolData";
import { Reveal, StaggerContainer, StaggerItem, Card3D, Scroll3DCard, Scroll3DPanel, Scroll3DHeading } from "./MotionPrimitives";

export default function AboutSection() {
  return (
    <ScrollytellingChapter chapterLabel="Chapter I • Heritage & Legacy" watermark="EST. 1985 • NIMAR">
      <motion.section id="about" className="py-24 bg-[#FCF7EE]/52 border-y border-[#7A2021]/15 overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
      <div className="max-w-7xl mx-auto px-4 space-y-20">
        <Scroll3DHeading className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
            Our Heritage &amp; Legacy
          </span>
          <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            About St. Jude&apos;s H.S. School
          </motion.h2>
          <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          <p className="text-[#5C3A38] text-base sm:text-lg leading-relaxed pt-2">
            Operated by the <strong className="text-[#7A2021]">Catholic Diocese of Khandwa (Registered)</strong> under the chairmanship of{" "}
            <strong className="text-[#7A2021]">Most Rev. Augustine Madathikunnel</strong>, Bishop of Khandwa, St. Jude&apos;s embraces students of all backgrounds without regard to caste, creed, or religion.
          </p>
        </Scroll3DHeading>

        <div className="grid md:grid-cols-3 gap-8">
          <Scroll3DCard direction="left">
            <Card3D maxTilt={7}>
            <div className="h-full bg-[#F6EBD9]/88 p-8 rounded-3xl transition-colors duration-300 hover:border-[#C59B27] border border-[#7A2021]/20 shadow-md hover:shadow-2xl transition-shadow">
              <motion.div initial={{ scale: 0.72, rotate: -10, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }} whileHover={{ scale: 1.15, rotate: 6 }} viewport={{ once: false, amount: 0.2 }} transition={{ type: "spring", stiffness: 280, damping: 18 }} className="w-12 h-12 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#7A2021] text-[#E5C158] flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </motion.div>
              <motion.h3 className="text-2xl font-bold text-[#7A2021] mb-3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>Our Vision</motion.h3>
              <p className="text-sm sm:text-base text-[#2B1615]/85 leading-relaxed">
                {schoolInfo.vision}
              </p>
            </div>
          </Card3D>
          </Scroll3DCard>

          <Scroll3DCard direction="center">
            <Card3D maxTilt={7}>
            <div className="h-full bg-[#7A2021] text-[#F6EBD9] p-8 rounded-3xl transition-colors duration-300 hover:border-[#C59B27] border-2 border-[#C59B27] shadow-xl hover:shadow-2xl transition-shadow">
              <motion.div initial={{ scale: 0.72, rotate: -10, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }} whileHover={{ scale: 1.15, rotate: 6 }} viewport={{ once: false, amount: 0.2 }} transition={{ type: "spring", stiffness: 280, damping: 18 }} className="w-12 h-12 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#C59B27] text-[#2B1615] flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </motion.div>
              <motion.h3 className="text-2xl font-bold text-[#E5C158] mb-3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>Our Mission</motion.h3>
              <p className="text-sm sm:text-base text-[#F6EBD9]/90 leading-relaxed">
                {schoolInfo.mission}
              </p>
            </div>
          </Card3D>
          </Scroll3DCard>

          <Scroll3DCard direction="right">
            <Card3D maxTilt={7}>
            <div className="h-full bg-[#F6EBD9]/88 p-8 rounded-3xl transition-colors duration-300 hover:border-[#C59B27] border border-[#7A2021]/20 shadow-md hover:shadow-2xl transition-shadow">
              <motion.div initial={{ scale: 0.72, rotate: -10, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }} whileHover={{ scale: 1.15, rotate: 6 }} viewport={{ once: false, amount: 0.2 }} transition={{ type: "spring", stiffness: 280, damping: 18 }} className="w-12 h-12 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#7A2021] text-[#E5C158] flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </motion.div>
              <motion.h3 className="text-2xl font-bold text-[#7A2021] mb-3" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>Core Values</motion.h3>
              <ul className="space-y-2.5 pt-1">
                {schoolInfo.coreValues.map((val) => (
                  <li key={val} className="flex items-center gap-2.5 text-sm font-semibold text-[#2B1615]">
                    <Sparkles className="w-4 h-4 text-[#C59B27] shrink-0" />
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </Card3D>
          </Scroll3DCard>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <Scroll3DPanel wrapperClassName="lg:col-span-6" className="space-y-5 bg-[#F6EBD9]/88 p-8 rounded-3xl transition-colors duration-300 hover:border-[#C59B27] border border-[#7A2021]/15">
            <div className="inline-flex items-center gap-2 text-[#7A2021] font-bold text-xs uppercase tracking-widest">
              <Landmark className="w-4 h-4 text-[#C59B27]" /> Institutional Chronicle
            </div>
            <motion.h3 className="text-2xl sm:text-3xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
              Four Decades of Shaping Young Minds in Khargone
            </motion.h3>
            <p className="text-sm sm:text-base text-[#5C3A38] leading-relaxed">
              Established in 1985 under the visionary leadership of the late <strong>Most Rev. Dr. Abraham Viruthakulangara</strong>, St. Jude&apos;s began through the initiative of <strong>Rev. Fr. M. Chinnappar</strong> alongside FSMA sisters <strong>Rev. Sr. Maria Lawrence</strong>, <strong>Rev. Sr. Rose</strong>, and <strong>Rev. Sr. Deepti</strong>.
            </p>
            <p className="text-sm sm:text-base text-[#5C3A38] leading-relaxed">
              In 1992, academic management was entrusted to the <strong>Dominican Sisters of the Presentation</strong>, guided by esteemed Principals <strong>Rev. Sr. Deepa Moonely OP</strong>, <strong>Rev. Sr. Elsy OP</strong>, and <strong>Rev. Sr. Teresa D&apos;Souza</strong>, alongside dedicated Managers who transformed Mangrul Road into an educational landmark.
            </p>
          </Scroll3DPanel>

          <StaggerContainer className="lg:col-span-6 space-y-4">
            {historyTimeline.map((item) => (
              <Scroll3DCard key={item.year} direction="right">
                <motion.div whileHover={{ x: 8, rotateY: -4, scale: 1.01 }} style={{ transformPerspective: 1000, willChange: "transform" }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="p-6 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#F6EBD9]/88 border-l-4 border-[#7A2021] shadow-sm hover:shadow-md transition"
                >
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#7A2021] text-[#E5C158] text-xs font-bold mb-2">
                    {item.year}
                  </span>
                  <h4 className="font-cinzel text-lg font-bold text-[#7A2021]">{item.title}</h4>
                  <p className="text-sm text-[#5C3A38] mt-1 leading-relaxed">{item.desc}</p>
                </motion.div>
              </Scroll3DCard>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </motion.section>
      </ScrollytellingChapter>
);
}


