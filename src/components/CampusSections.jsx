import React, { useState, useEffect } from "react";
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
  GraduationCap,
  Sparkles,
  Maximize2,
  X
} from "lucide-react";
import {
  timingsData,
  facilitiesList,
  infrastructureSpecs,
  academicsStreams
} from "../data/schoolData";
import { Reveal, StaggerContainer, StaggerItem, cinematicEase, Card3D, Scroll3DCard, Scroll3DPanel, Scroll3DHeading } from "./MotionPrimitives";
// Exact 3 Winter images requested: Campus 2nd image (8.jpg) + Sports 4th & 5th images (4.jpeg, 7.jpeg)
import winterCampus2 from "../assets/gallery/campus/8.jpg";
import winterSport4 from "../assets/gallery/sports/4.jpeg";
import winterSport5 from "../assets/gallery/sports/7.jpeg";

// Exact 3 Summer images requested from Cultural (events) folder: starting 2nd (10.jpeg), starting 3rd (11.jpeg), last 3rd (9.jpeg)
import summerKids1 from "../assets/gallery/events/10.jpeg";
import summerKids2 from "../assets/gallery/events/11.jpeg";
import summerKids3 from "../assets/gallery/events/9.jpeg";

export default function CampusSections({ onOpenAdmission }) {
  const [season, setSeason] = useState("summer");
  const [popupPhoto, setPopupPhoto] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    setSlideIdx(0);
  }, [season]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, [season]);

  const seasonalMedia = {
    summer: {
      badge: "Summer Schedule • Early Morning Session",
      title: "Summer Morning Students & Outdoor Sports",
      subtitle: "7:20 AM – 1:30 PM • Energized students in summer session enjoying morning athletics, games & bright campus mornings.",
      slides: [
        { src: summerKids1, label: "Summer Session • Morning Ground Activities" },
        { src: summerKids2, label: "Summer Session • Active Outdoor Sports" },
        { src: summerKids3, label: "Summer Session • St. Jude's Young Athletes" }
      ],
      accentGradient: "from-[#E5C158]/35 via-[#C59B27]/15 to-[#7A2021]/85",
      orbColor: "rgba(229, 193, 88, 0.52)"
    },
    winter: {
      badge: "Winter Schedule • Crisp Morning Session",
      title: "Winter Morning Students & Campus Life",
      subtitle: "8:00 AM – 2:10 PM • Students in warm winter uniform & sweaters during morning campus sessions & winter sports.",
      slides: [
        { src: winterCampus2, label: "Winter Campus • Crisp Morning Session" },
        { src: winterSport4, label: "Winter Session • Students in Winter Uniform" },
        { src: winterSport5, label: "Winter Session • Morning Sports & Assembly" }
      ],
      accentGradient: "from-[#93C5FD]/30 via-[#E5C158]/20 to-[#541213]/90",
      orbColor: "rgba(186, 230, 253, 0.48)"
    }
  };

  const activeMedia = seasonalMedia[season];
  const currentSlide = activeMedia.slides[slideIdx % activeMedia.slides.length];
  const nextSlide = activeMedia.slides[(slideIdx + 1) % activeMedia.slides.length];


  return (
    <ScrollytellingChapter chapterLabel="Chapter III • Academics & Campus" watermark="CBSE • EXCELLENCE">
      <>
      <motion.section id="admission" className="py-24 bg-[#FCF7EE]/52 border-y border-[#7A2021]/15 overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          <Scroll3DHeading className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              Enroll &amp; Daily Schedule
            </span>
            <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Admissions &amp; School Timings
            </motion.h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          </Scroll3DHeading>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            <Scroll3DCard direction="left" className="lg:col-span-5">
              <div className="relative h-full min-h-[440px] bg-gradient-to-br from-[#2B1615] via-[#541213] to-[#7A2021] text-[#F6EBD9] rounded-3xl p-6 sm:p-8 border-2 border-[#C59B27] shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Ambient Seasonal Glow Aura */}
                <motion.div
                  key={season + "-aura"}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ background: `radial-gradient(circle, ${activeMedia.orbColor} 0%, transparent 70%)` }}
                  className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full blur-2xl"
                />

                {/* Top Seasonal Header Badge */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <motion.span
                    key={season + "-badge"}
                    initial={{ opacity: 0, y: -12, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C59B27] text-[#2B1615] text-[11px] font-extrabold uppercase tracking-wider shadow-md"
                  >
                    {season === "summer" ? <Sun className="w-3.5 h-3.5" /> : <Snowflake className="w-3.5 h-3.5" />}
                    {activeMedia.badge}
                  </motion.span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-[#E5C158]/90">
                    <Sparkles className="w-3.5 h-3.5" /> 3D View
                  </span>
                </div>

                {/* 3D Pop-Up 3-Image Auto-Slideshow Stage */}
                <div style={{ perspective: 1200 }} className="relative z-10 my-5 flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={season + "-" + slideIdx}
                      initial={{ opacity: 0, scale: 0.76, rotateY: season === "summer" ? -22 : 22, rotateX: 14, y: 24 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateY: season === "summer" ? 20 : -20, rotateX: -12, y: -18 }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="relative w-full"
                    >
                      {/* Main 3D Floating Campus Photo Frame */}
                      <motion.div
                        animate={{ y: [-4, 5, -4], rotateX: [0, 2, 0] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.03, rotateY: -4, rotateX: 3 }}
                        onClick={() => setPopupPhoto({ src: currentSlide.src, title: currentSlide.label, tag: activeMedia.badge })}
                        className="group relative rounded-2xl overflow-hidden border-2 border-[#E5C158]/85 shadow-[0_22px_50px_rgba(0,0,0,0.55)] cursor-pointer aspect-[16/10]"
                      >
                        <img
                          src={currentSlide.src}
                          alt={currentSlide.label}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${activeMedia.accentGradient}`} />
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2B1615]/75 border border-[#E5C158]/70 text-[#E5C158] flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-110 transition">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                        <div className="absolute bottom-3 left-3.5 right-3.5">
                          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#E5C158] bg-[#2B1615]/80 px-2.5 py-0.5 rounded-full border border-[#C59B27]/50 mb-1">
                            Photo {slideIdx + 1} of 3 • Tap to Pop-Up Zoom
                          </span>
                          <p className="text-sm sm:text-base font-bold text-[#FCF7EE] drop-shadow">
                            {currentSlide.label}
                          </p>
                        </div>
                      </motion.div>

                      {/* Floating 3D Next-Slide Preview Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.68, x: 20, y: 16, rotateZ: 7 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotateZ: -3 }}
                        transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ scale: 1.08, rotateZ: 0, y: -4 }}
                        onClick={() => setSlideIdx((prev) => (prev + 1) % 3)}
                        className="hidden sm:block absolute -bottom-5 -right-3 w-36 h-24 rounded-xl overflow-hidden border-2 border-[#E5C158] shadow-[0_16px_35px_rgba(0,0,0,0.65)] cursor-pointer bg-[#2B1615]"
                      >
                        <img
                          src={nextSlide.src}
                          alt={nextSlide.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2B1615]/90 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-[#E5C158] leading-tight line-clamp-1">
                          Next Slide ({((slideIdx + 1) % 3) + 1}/3) →
                        </span>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Slideshow Indicator Dots */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {activeMedia.slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIdx(i)}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          slideIdx === i ? "w-7 bg-[#E5C158]" : "w-2 bg-[#F6EBD9]/40 hover:bg-[#F6EBD9]/75"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Dynamic Seasonal Caption */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={season + "-caption"}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 pt-2 space-y-1 border-t border-[#E5C158]/25"
                  >
                    <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#E5C158]">
                      {activeMedia.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#F6EBD9]/90 leading-relaxed">
                      {activeMedia.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Scroll3DCard>

            <Scroll3DCard direction="right" className="lg:col-span-7">
              <div className="h-full bg-[#F6EBD9]/75 rounded-3xl transition-colors duration-300 hover:border-[#C59B27] p-8 sm:p-10 border border-[#7A2021]/20 shadow-lg space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7A2021]/15 pb-5">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-6 h-6 text-[#7A2021]" />
                  <motion.h3 className="text-xl sm:text-2xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                    School &amp; Office Timings
                  </motion.h3>
                </div>

                <div className="inline-flex p-1 rounded-full bg-[#FCF7EE]/72 border border-[#7A2021]/20">
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
                  <Scroll3DCard direction="left"><div className="h-full bg-[#FCF7EE]/72 p-5 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border border-[#7A2021]/15 space-y-2">
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
                  </div></Scroll3DCard>

                  <Scroll3DCard direction="right"><div className="h-full bg-[#FCF7EE]/72 p-5 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border border-[#7A2021]/15 space-y-2">
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
                  </div></Scroll3DCard>
                </motion.div>
              </AnimatePresence>

              <Scroll3DCard direction="center"><div className="bg-[#7A2021]/10 p-5 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border border-[#7A2021]/20 space-y-1.5">
                <h4 className="font-cinzel font-bold text-base text-[#7A2021]">Office Hours</h4>
                <p className="text-sm text-[#2B1615]">
                  <strong>Principal:</strong> {timingsData.officeHours.principal} &nbsp;|&nbsp;{" "}
                  <strong>General Administration Office:</strong> {timingsData.officeHours.admin}
                </p>
                <p className="text-xs italic text-[#7A2021] font-medium pt-1">
                  Note: {timingsData.officeHours.note}
                </p>
              </div></Scroll3DCard>
            </div>
            </Scroll3DCard>
          </div>
        </div>
      </motion.section>

      <motion.section id="facilities" className="py-24 bg-[#F6EBD9]/52 overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          <div>
            <Scroll3DHeading className="max-w-3xl mx-auto text-center space-y-3 mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
                Modern Learning Ecosystem
              </span>
              <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                World-Class Facilities
              </motion.h2>
              <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
            </Scroll3DHeading>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {facilitiesList.map((fac, idx) => (
                <Scroll3DCard key={fac.title} direction={idx % 3 === 0 ? "left" : idx % 3 === 1 ? "center" : "right"}>
                  <Card3D maxTilt={7}>
                  <div className="h-full bg-[#FCF7EE]/72 p-7 rounded-3xl transition-colors duration-300 hover:border-[#C59B27] border border-[#7A2021]/15 shadow-md hover:shadow-2xl transition-shadow">
                    <motion.div initial={{ scale: 0.72, rotate: -10, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }} whileHover={{ scale: 1.15, rotate: 6 }} viewport={{ once: false, amount: 0.2 }} transition={{ type: "spring", stiffness: 280, damping: 18 }} className="w-11 h-11 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#7A2021] text-[#E5C158] flex items-center justify-center mb-4">
                      <FlaskConical className="w-5 h-5" />
                    </motion.div>
                    <motion.h3 className="text-xl font-bold text-[#7A2021] mb-2" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>{fac.title}</motion.h3>
                    <p className="text-sm text-[#5C3A38] leading-relaxed">{fac.desc}</p>
                  </div>
                </Card3D>
                </Scroll3DCard>
              ))}
            </StaggerContainer>
          </div>

          <div id="infrastructure"><Scroll3DPanel className="bg-[#7A2021] text-[#F6EBD9] rounded-3xl transition-colors duration-300 hover:border-[#C59B27] p-8 sm:p-12 border-2 border-[#C59B27] shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#F6EBD9]/20 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E5C158] mb-1">
                  <Building2 className="w-4 h-4" /> Campus Architecture &amp; Safety
                </div>
                <motion.h3 className="text-2xl sm:text-4xl font-bold text-[#F6EBD9]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
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
                  viewport={{ once: false, amount: 0.35 }}
                  transition={{ duration: 0.85, delay: idx * 0.1, ease: cinematicEase }}
                  whileHover={{ scale: 1.025, rotateX: 3, rotateY: -3 }} style={{ transformPerspective: 1000, willChange: "transform" }}
                  className="bg-[#541213]/85 p-6 rounded-2xl border border-[#C59B27]/40 transition-all duration-300 hover:-translate-y-2.5 hover:scale-[1.03] hover:border-[#E5C158] hover:shadow-[0_22px_45px_rgba(0,0,0,0.45),0_0_25px_rgba(229,193,88,0.35)]"
                >
                  <h4 className="font-cinzel text-lg font-bold text-[#E5C158] mb-1">{spec.label}</h4>
                  <p className="text-sm text-[#F6EBD9]/90 leading-relaxed">{spec.value}</p>
                </motion.div>
              ))}
            </div>
          </Scroll3DPanel></div>
        </div>
      </motion.section>

      <motion.section id="academics" className="py-24 bg-[#FCF7EE]/52 border-t border-[#7A2021]/15 overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-7xl mx-auto px-4 space-y-14">
          <Scroll3DHeading className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              CBSE Curriculum &amp; Excellence
            </span>
            <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Academics &amp; Board Toppers
            </motion.h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          </Scroll3DHeading>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicsStreams.map((stream, idx) => (
              <Scroll3DCard key={stream.level} direction={idx % 2 === 0 ? "left" : "right"}>
                <Card3D maxTilt={7}>
                  <div className="h-full bg-[#F6EBD9]/75 p-7 rounded-3xl transition-colors duration-300 hover:border-[#C59B27] border border-[#7A2021]/20 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-xl transition-shadow">
                  <div className="space-y-3">
                    <motion.div initial={{ scale: 0.72, rotate: -10, opacity: 0 }} whileInView={{ scale: 1, rotate: 0, opacity: 1 }} whileHover={{ scale: 1.15, rotate: 6 }} viewport={{ once: false, amount: 0.2 }} transition={{ type: "spring", stiffness: 280, damping: 18 }} className="w-10 h-10 rounded-xl bg-[#7A2021] text-[#E5C158] flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </motion.div>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#7A2021] bg-[#FCF7EE]/72 px-3 py-1 rounded-full">
                      {stream.grades}
                    </span>
                    <motion.h3 className="text-xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>{stream.level}</motion.h3>
                    <p className="text-sm text-[#5C3A38] leading-relaxed">{stream.focus}</p>
                  </div>
                  <div className="pt-3 border-t border-[#7A2021]/10 flex items-center gap-2 text-xs font-bold text-[#7A2021]">
                    <BookOpen className="w-4 h-4 text-[#C59B27]" /> Book List 2025–2026
                  </div>
                </div>
                </Card3D>
              </Scroll3DCard>
            ))}
          </StaggerContainer>
        </div>
      </motion.section>
    </>
      </ScrollytellingChapter>
);
}


