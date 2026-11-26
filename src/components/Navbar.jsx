import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Menu, X, Award } from "lucide-react";
import { schoolInfo } from "../data/schoolData";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Management", href: "#management" },
  { label: "Academics", href: "#academics" },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "TC Verification", href: "#tc" },
  { label: "Disclosure", href: "#disclosure" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar({ onOpenAdmission, onNavigate, showMainNav = true }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ALWAYS VISIBLE TOP UTILITY BAR (Even when shutter is down) */}
      <div className="bg-[#541213] text-[#F6EBD9] text-xs py-2 px-4 border-b border-[#C59B27]/40 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#E5C158]">
              <Award className="w-3.5 h-3.5" />
              CBSE Affiliation No.: {schoolInfo.affiliationNo}
            </span>
            <span className="hidden md:inline text-[#F6EBD9]/40">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#F6EBD9]/90">
              <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
              {schoolInfo.address}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:07282232557"
              className="inline-flex items-center gap-1.5 hover:text-[#E5C158] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B27]" />
              {schoolInfo.phone}
            </a>
            <a
              href="mailto:stjudeshsschool@gmail.com"
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#E5C158] transition"
            >
              <Mail className="w-3.5 h-3.5 text-[#C59B27]" />
              {schoolInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR (Reveals only after shutter opens) */}
      <AnimatePresence>
        {showMainNav && (
          <motion.nav
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FCF7EE]/95 backdrop-blur-md shadow-md border-b border-[#7A2021]/15"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              {/* School Crest & Name */}
              <a href="#home" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-full bg-[#7A2021] border-2 border-[#C59B27] flex items-center justify-center shadow-md shrink-0">
                  <span className="font-cinzel font-bold text-[#F6EBD9] text-lg tracking-wider">
                    SJ
                  </span>
                </div>
                <div>
                  <h1 className="font-cinzel text-sm sm:text-base lg:text-lg font-bold text-[#7A2021] leading-tight group-hover:text-[#541213] transition">
                    St. Jude&apos;s Higher Secondary School
                  </h1>
                  <p className="text-[11px] font-medium text-[#5C3A38] tracking-wide">
                    Khargone (M.P.) • Est. 1985 • Managed by Catholic Diocese of Khandwa
                  </p>
                </div>
              </a>

              {/* Desktop Menu */}
              <div className="hidden xl:flex items-center gap-5">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate(item.href);
                      }
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-[#2B1615] hover:text-[#7A2021] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C59B27] hover:after:w-full after:transition-all"
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={onOpenAdmission}
                  className="bg-[#7A2021] hover:bg-[#541213] text-[#F6EBD9] text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-full border border-[#C59B27] shadow-sm transition cursor-pointer"
                >
                  Admissions 2026–27
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2 rounded-lg text-[#7A2021] hover:bg-[#F6EBD9]"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Drawer — macOS Genie Minimize/Restore Animation + Outside Touch Auto-Close */}
            <AnimatePresence>
              {mobileOpen && (
                <>
                  {/* Outside Touch / Tap Backdrop (auto-closes drawer when user touches anywhere below navbar) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    onClick={() => setMobileOpen(false)}
                    onTouchStart={() => setMobileOpen(false)}
                    aria-hidden="true"
                    className="xl:hidden fixed inset-0 top-full h-screen bg-[#2B1615]/30 backdrop-blur-[2px] z-10"
                  />

                  {/* macOS Genie Minimize/Restore Animated Menu Sheet */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.22,
                      y: -18,
                      rotateX: -16
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      rotateX: 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.18,
                      y: -20,
                      rotateX: -18
                    }}
                    transition={{
                      duration: 0.72,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    style={{
                      transformOrigin: "top right",
                      transformPerspective: 900,
                      willChange: "transform, opacity"
                    }}
                    className="xl:hidden relative z-20 bg-[#FCF7EE] border-t border-b-2 border-[#C59B27]/50 shadow-[0_24px_50px_rgba(43,22,21,0.28)] px-4 py-4 space-y-3 overflow-hidden"
                  >
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={{
                        closed: {},
                        open: {
                          transition: {
                            staggerChildren: 0.055,
                            delayChildren: 0.12
                          }
                        }
                      }}
                      className="grid grid-cols-2 gap-2"
                    >
                      {navLinks.map((item) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          variants={{
                            closed: { opacity: 0, y: -8, scale: 0.9 },
                            open: {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] }
                            }
                          }}
                          onClick={(e) => {
                            setMobileOpen(false);
                            if (onNavigate && item?.href) {
                              e.preventDefault();
                              onNavigate(item.href);
                            }
                          }}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          className="text-xs font-semibold uppercase tracking-wider text-[#2B1615] hover:text-[#7A2021] transition-all duration-200 py-2.5 px-3 rounded-xl bg-[#F6EBD9]/55 hover:bg-[#F6EBD9] border border-[#7A2021]/15 hover:border-[#C59B27] hover:shadow-[0_6px_16px_rgba(122,32,33,0.16)]"
                        >
                          {item.label}
                        </motion.a>
                      ))}
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 8, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.9 }}
                      transition={{ duration: 0.46, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => {
                        setMobileOpen(false);
                        onOpenAdmission();
                      }}
                      whileHover={{ scale: 1.025, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full bg-[#7A2021] hover:bg-[#541213] transition-all duration-200 text-[#F6EBD9] text-xs font-bold uppercase tracking-wider py-3 rounded-full border border-[#C59B27] hover:border-[#E5C158] shadow-md hover:shadow-[0_10px_24px_rgba(122,32,33,0.32)] cursor-pointer"
                    >
                      Admissions 2026–27
                    </motion.button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
