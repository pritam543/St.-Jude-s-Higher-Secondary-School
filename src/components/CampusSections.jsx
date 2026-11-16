import React, { useState } from "react";
import { ScrollytellingChapter } from "./ScrollytellingEngine";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Sun,
  Snowflake,
  Building2,
  FlaskConical,
  BookOpen,
  CheckCircle2,
  ArrowUpRight,
  GraduationCap
} from "lucide-react";
import {
  timingsData,
  facilitiesList,
  infrastructureSpecs,
  academicsStreams
} from "../data/schoolData";
import { Reveal, StaggerContainer, StaggerItem, cinematicEase } from "./MotionPrimitives";

export default function CampusSections({ onOpenAdmission }) {
  const [season, setSeason] = useState("summer");

  return (
    <ScrollytellingChapter chapterLabel="Chapter III • Academics & Campus" watermark="CBSE • EXCELLENCE">
      <>
      <motion.section id="admission" className="py-24 bg-[#FCF7EE] border-y border-[#7A2021]/15 overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <Reveal direction="up" className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              Enroll &amp; Daily Schedule
            </span>
            <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Admissions &amp; School Timings
            </motion.h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            <Reveal direction="left" className="lg:col-span-5 bg-[#7A2021] text-[#F6EBD9] rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] p-8 sm:p-10 border-2 border-[#C59B27] shadow-xl flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#C59B27] text-[#2B1615] text-xs font-extrabold uppercase tracking-wider">
                  Session 2026–2027 Open
                </span>
                <motion.h3 className="text-2xl sm:text-3xl font-bold text-[#E5C158]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                  Begin Your Journey at St. Jude&apos;s
                </motion.h3>
                <p className="text-sm text-[#F6EBD9]/90 leading-relaxed">
                  Admissions open for Nursery to Class IX &amp; Class XI (Science, Commerce &amp; Humanities). Experience CBSE excellence rooted in discipline, values, and holistic growth.
                </p>
                <ul className="space-y-2.5 pt-2 text-xs sm:text-sm">
                  {[
                    "Birth Certificate & Previous Report Card",
                    "Original Transfer Certificate (TC) from Previous School",
                    "Aadhaar Card & Passport Size Photographs",
                    "Interaction / Entrance Assessment as per CBSE Norms"
                  ].map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenAdmission}
                className="w-full bg-[#E5C158] hover:bg-[#C59B27] text-[#2B1615] font-bold text-xs sm:text-sm uppercase tracking-wider py-4 rounded-full shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Online Admission Enquiry <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </Reveal>

            <Reveal direction="right" delay={0.12} className="lg:col-span-7 bg-[#F6EBD9] rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] p-8 sm:p-10 border border-[#7A2021]/20 shadow-lg space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7A2021]/15 pb-5">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-6 h-6 text-[#7A2021]" />
                  <motion.h3 className="text-xl sm:text-2xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                    School &amp; Office Timings
                  </motion.h3>
                </div>

                <div className="inline-flex p-1 rounded-full bg-[#FCF7EE] border border-[#7A2021]/20">
                  <button
                    onClick={() => setSeason("summer")}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      season === "summer"
                        ? "bg-[#7A2021] text-[#F6EBD9]"
                        : "text-[#7A2021]"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" /> Summer
                  </button>
                  <button
                    onClick={() => setSeason("winter")}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      season === "winter"
                        ? "bg-[#7A2021] text-[#F6EBD9]"
                        : "text-[#7A2021]"
                    }`}
                  >
                    <Snowflake className="w-3.5 h-3.5" /> Winter
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={season}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: cinematicEase }}
                  className="grid sm:grid-cols-2 gap-5"
                >
                  <div className="bg-[#FCF7EE] p-5 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border border-[#7A2021]/15 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                      Nursery to U.K.G.
                    </span>
                    <h4 className="font-cinzel font-bold text-lg text-[#7A2021]">
                      Pre-Primary Wing
                    </h4>
                    <p className="text-sm text-[#2B1615]">
                      <strong>Mon – Fri:</strong> {timingsData.nurseryToUkg[season].monFri}
                    </p>
                    <p className="text-sm text-[#2B1615]">
                      <strong>Saturday:</strong> {timingsData.nurseryToUkg[season].sat}
                    </p>
                  </div>

                  <div className="bg-[#FCF7EE] p-5 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border border-[#7A2021]/15 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27]">
                      Classes I to XII
                    </span>
                    <h4 className="font-cinzel font-bold text-lg text-[#7A2021]">
                      Primary to Sr. Secondary
                    </h4>
                    <p className="text-sm text-[#2B1615]">
                      <strong>Mon – Fri:</strong> {timingsData.class1To12[season].monFri}
                    </p>
                    <p className="text-sm text-[#2B1615]">
                      <strong>Saturday:</strong> {timingsData.class1To12[season].sat}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="bg-[#7A2021]/10 p-5 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border border-[#7A2021]/20 space-y-1.5">
                <h4 className="font-cinzel font-bold text-base text-[#7A2021]">Office Hours</h4>
                <p className="text-sm text-[#2B1615]">
                  <strong>Principal:</strong> {timingsData.officeHours.principal} &nbsp;|&nbsp;{" "}
                  <strong>General Administration Office:</strong> {timingsData.officeHours.admin}
                </p>
                <p className="text-xs italic text-[#7A2021] font-medium pt-1">
                  Note: {timingsData.officeHours.note}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </motion.section>

      <motion.section id="facilities" className="py-24 bg-[#F6EBD9] overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          <div>
            <Reveal direction="up" className="max-w-3xl mx-auto text-center space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
                Modern Learning Ecosystem
              </span>
              <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                World-Class Facilities
              </motion.h2>
              <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
            </Reveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {facilitiesList.map((fac, idx) => (
                <StaggerItem key={fac.title} direction={idx % 2 === 0 ? "left" : "right"}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 230, damping: 18 }}
                    className="h-full bg-[#FCF7EE] p-7 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border border-[#7A2021]/15 shadow-md hover:shadow-2xl transition-shadow"
                  >
                    <div className="w-11 h-11 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#7A2021] text-[#E5C158] flex items-center justify-center mb-4">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <motion.h3 className="text-xl font-bold text-[#7A2021] mb-2" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>{fac.title}</motion.h3>
                    <p className="text-sm text-[#5C3A38] leading-relaxed">{fac.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <Reveal direction="up" id="infrastructure" className="bg-[#7A2021] text-[#F6EBD9] rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] p-8 sm:p-12 border-2 border-[#C59B27] shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#F6EBD9]/20 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-1">
                  <Building2 className="w-4 h-4" /> Campus Architecture &amp; Safety
                </div>
                <motion.h3 className="text-2xl sm:text-4xl font-bold text-[#F6EBD9]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                  Infrastructure Highlights
                </motion.h3>
              </div>
              <span className="text-xs uppercase tracking-widest bg-[#541213] px-4 py-2 rounded-full border border-[#C59B27]/50 text-[#E5C158]">
                CBSE Digital Infrastructure 2025–2026
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {infrastructureSpecs.map((spec, idx) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -35 : 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.85, delay: idx * 0.1, ease: cinematicEase }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#541213]/80 p-6 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border border-[#C59B27]/30"
                >
                  <h4 className="font-cinzel text-lg font-bold text-[#E5C158] mb-1">{spec.label}</h4>
                  <p className="text-sm text-[#F6EBD9]/90 leading-relaxed">{spec.value}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </motion.section>

      <motion.section id="academics" className="py-24 bg-[#FCF7EE] border-t border-[#7A2021]/15 overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-7xl mx-auto px-4 space-y-14">
          <Reveal direction="up" className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              CBSE Curriculum &amp; Excellence
            </span>
            <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Academics &amp; Board Toppers
            </motion.h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          </Reveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicsStreams.map((stream, idx) => (
              <StaggerItem key={stream.level} direction={idx < 2 ? "left" : "right"}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 230, damping: 18 }}
                  className="h-full bg-[#F6EBD9] p-7 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border border-[#7A2021]/20 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7A2021] text-[#E5C158] flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#7A2021] bg-[#FCF7EE] px-3 py-1 rounded-full">
                      {stream.grades}
                    </span>
                    <motion.h3 className="text-xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>{stream.level}</motion.h3>
                    <p className="text-sm text-[#5C3A38] leading-relaxed">{stream.focus}</p>
                  </div>
                  <div className="pt-3 border-t border-[#7A2021]/10 flex items-center gap-2 text-xs font-bold text-[#7A2021]">
                    <BookOpen className="w-4 h-4 text-[#C59B27]" /> Book List 2025–2026
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </motion.section>
    </>
      </ScrollytellingChapter>
);
}


