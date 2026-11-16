import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, ShieldCheck, GraduationCap } from "lucide-react";
import { schoolInfo } from "../data/schoolData";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Management", href: "#management" },
  { label: "Admission", href: "#admission" },
  { label: "Facilities", href: "#facilities" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Academics", href: "#academics" },
  { label: "TC", href: "#tc" },
  { label: "Gallery", href: "#gallery" },
  { label: "Mandatory Disclosure", href: "#disclosure" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar({ onOpenAdmission }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Top Maroon Heritage Bar */}
      <div className="bg-[#541213] text-[#F6EBD9] text-xs py-2 px-4 border-b border-[#C59B27]/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#E5C158]">
              <ShieldCheck className="w-3.5 h-3.5" />
              CBSE Affiliation No.: {schoolInfo.affiliationNo}
            </span>
            <span className="hidden md:inline text-[#F6EBD9]/70">|</span>
            <span className="hidden md:inline text-[#F6EBD9]/90">{schoolInfo.address}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${schoolInfo.phone}`} className="inline-flex items-center gap-1 hover:text-[#E5C158] transition">
              <Phone className="w-3 h-3" /> {schoolInfo.phone}
            </a>
            <a href={`mailto:${schoolInfo.email}`} className="hidden sm:inline-flex items-center gap-1 hover:text-[#E5C158] transition">
              <Mail className="w-3 h-3" /> {schoolInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation */}
      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[#FCF7EE]/95 backdrop-blur-md shadow-lg border-b border-[#7A2021]/15 py-2.5"
            : "bg-[#F6EBD9]/90 backdrop-blur-sm py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-[#7A2021] text-[#F6EBD9] flex items-center justify-center border-2 border-[#C59B27] shadow-md group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6 text-[#E5C158]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-[#7A2021] tracking-wide leading-tight">
                ST. JUDE&apos;S H.S. SCHOOL
              </h1>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#5C3A38] font-medium">
                Khargone (M.P.) • Est. 1985
              </p>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-5">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-wider text-[#2B1615] hover:text-[#7A2021] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#7A2021] hover:after:w-full after:transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmission}
              className="hidden sm:inline-flex items-center gap-2 bg-[#7A2021] hover:bg-[#541213] text-[#F6EBD9] text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full border border-[#C59B27]/60 shadow-md transition cursor-pointer"
            >
              Admission 2026-27
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg text-[#7A2021] hover:bg-[#7A2021]/10"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="xl:hidden bg-[#FCF7EE] border-t border-[#7A2021]/15 px-6 py-5 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#2B1615] hover:text-[#7A2021] py-2 border-b border-[#7A2021]/10"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenAdmission();
              }}
              className="w-full mt-3 bg-[#7A2021] text-[#F6EBD9] text-xs font-semibold uppercase tracking-wider py-3 rounded-full"
            >
              Apply For Admission
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
