import React, { useState, useMemo } from "react";
import { ScrollytellingChapter } from "./ScrollytellingEngine";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck2,
  Search,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Send,
  X,
  CheckCircle2,
  Award,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  FolderOpen,
  Images
} from "lucide-react";
import {
  schoolInfo,
  mandatoryDisclosures,
  sampleTCs
} from "../data/schoolData";

const cinematicEase = [0.16, 1, 0.3, 1];

// Automatically scans ALL images placed inside src/assets/gallery/<category>/
const rawGalleryFiles = import.meta.glob(
  "../assets/gallery/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" }
);

const categoryMeta = [
  { key: "campus", label: "Campus", subtitle: "Heritage Architecture & Classrooms" },
  { key: "labs", label: "Labs & STEM", subtitle: "Science, Computer & Innovation Hubs" },
  { key: "sports", label: "Sports", subtitle: "Athletics, Tournaments & Physical Education" },
  { key: "events", label: "Events & Cultural", subtitle: "Rubilume Celebrations & Stage Chronicles" },
  { key: "achievements", label: "Achievements", subtitle: "Board Toppers, Honours & Milestones" }
];

export default function PortalAndFooter({ admissionOpen, onCloseAdmission }) {
  const [tcQuery, setTcQuery] = useState("");
  const [tcResult, setTcResult] = useState(null);
  const [contactSent, setContactSent] = useState(false);
  const [admissionSent, setAdmissionSent] = useState(false);

  // null = shows the 5 Category Album Cards; string = shows photos inside that album
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const allPhotos = useMemo(() => {
    return Object.entries(rawGalleryFiles).map(([path, url], idx) => {
      const parts = path.split("/");
      const folder = parts[parts.length - 2]?.toLowerCase() || "campus";
      const rawName = parts[parts.length - 1]?.replace(/\.[^/.]+$/, "") || `Photo ${idx + 1}`;
      const cleanTitle = rawName
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const meta = categoryMeta.find((c) => c.key === folder) || categoryMeta[0];

      return {
        id: path,
        url,
        category: meta.key,
        categoryLabel: meta.label,
        title: cleanTitle
      };
    });
  }, []);

  const albums = useMemo(() => {
    return categoryMeta.map((cat) => {
      const photos = allPhotos.filter((p) => p.category === cat.key);
      return {
        ...cat,
        photos,
        count: photos.length,
        cover: (photos.find((p) => p.id.toLowerCase().includes("/cover.")) || photos[0])?.url || "/school-building.jpg"
      };
    });
  }, [allPhotos]);

  const activeAlbumData = useMemo(() => {
    if (!selectedAlbum) return null;
    return albums.find((a) => a.key === selectedAlbum) || null;
  }, [albums, selectedAlbum]);

  const handleOpenAlbum = (key) => {
    setSelectedAlbum(key);
    const el = document.getElementById("gallery");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTcSearch = (e) => {
    e.preventDefault();
    const q = tcQuery.trim().toLowerCase();
    if (!q) {
      setTcResult({ found: false, msg: "Please enter a TC Number or Admission Number." });
      return;
    }
    const match = sampleTCs.find(
      (item) =>
        item.tcNo.toLowerCase() === q ||
        item.admNo.toLowerCase() === q ||
        item.student.toLowerCase().includes(q)
    );
    if (match) {
      setTcResult({ found: true, record: match });
    } else {
      setTcResult({
        found: false,
        msg: "No digital record matched. Try sample IDs (e.g., 4892 or SJHS/2025/1042) or contact the school office."
      });
    }
  };

  return (
    <ScrollytellingChapter chapterLabel="Chapter IV • Portal & Admissions" watermark="ST. JUDE'S KHARGONE">
      <>
      {/* TRANSFER CERTIFICATE (TC) VERIFICATION SECTION */}
      <motion.section id="tc" className="py-24 bg-[#F6EBD9]" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              CBSE Digital Verification
            </span>
            <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Transfer Certificate (TC) Portal
            </motion.h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-[#5C3A38] max-w-2xl mx-auto">
              Verify issued Transfer Certificates online using Admission Number or TC Serial Number as per CBSE Affiliation guidelines.
            </p>
          </div>

          <div className="bg-[#FCF7EE] p-8 sm:p-10 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border-2 border-[#7A2021]/20 shadow-xl space-y-6">
            <form onSubmit={handleTcSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#7A2021] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tcQuery}
                  onChange={(e) => setTcQuery(e.target.value)}
                  placeholder="Enter TC No. (e.g., SJHS/2025/1042) or Admission No. (e.g., 4892)"
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-[#F6EBD9] border border-[#7A2021]/25 text-sm text-[#2B1615] focus:outline-none focus:border-[#7A2021]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#7A2021] hover:bg-[#541213] text-[#F6EBD9] px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
              >
                Verify TC
              </button>
            </form>

            {tcResult && (
              <div
                className={`p-5 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border ${
                  tcResult.found
                    ? "bg-emerald-950/5 border-emerald-700/30 text-[#2B1615]"
                    : "bg-[#7A2021]/10 border-[#7A2021]/30 text-[#7A2021]"
                }`}
              >
                {tcResult.found ? (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-800">
                        <FileCheck2 className="w-4 h-4" /> Authentic School Record Verified
                      </span>
                      <h4 className="font-cinzel font-bold text-lg text-[#7A2021]">
                        {tcResult.record.student} ({tcResult.record.classLeft})
                      </h4>
                      <p className="text-xs text-[#5C3A38]">
                        TC No: <strong>{tcResult.record.tcNo}</strong> • Admission No:{" "}
                        <strong>{tcResult.record.admNo}</strong> • Session:{" "}
                        <strong>{tcResult.record.session}</strong>
                      </p>
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-[#7A2021] text-[#E5C158] text-xs font-bold">
                      {tcResult.record.status}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm font-medium">{tcResult.msg}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ALBUM-BASED CINEMATIC PHOTO GALLERY */}
      {/* Photo Gallery & Milestones shifted to ShowcasePage */}

      {/* FULLSCREEN LIGHTBOX VIEWER */}
      <AnimatePresence>
        {lightboxIndex !== null && activeAlbumData?.photos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[70] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev === 0 ? activeAlbumData.photos.length - 1 : prev - 1
                );
              }}
              className="absolute left-4 sm:left-8 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: cinematicEase }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full flex flex-col items-center space-y-4"
            >
              <img
                src={activeAlbumData.photos[lightboxIndex].url}
                alt={activeAlbumData.photos[lightboxIndex].title}
                className="max-h-[78vh] w-auto rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border-2 border-[#C59B27] shadow-2xl object-contain"
              />
              <div className="text-center text-[#F6EBD9]">
                <span className="text-xs uppercase tracking-widest text-[#E5C158] font-bold">
                  {activeAlbumData.label} • {lightboxIndex + 1} /{" "}
                  {activeAlbumData.photos.length}
                </span>
                <h4 className="font-cinzel text-xl font-bold mt-1">
                  {activeAlbumData.photos[lightboxIndex].title}
                </h4>
              </div>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) =>
                  prev === activeAlbumData.photos.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-4 sm:right-8 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MANDATORY PUBLIC DISCLOSURE SECTION */}
      <motion.section id="disclosure" className="py-24 bg-[#F6EBD9]" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              CBSE Appendix IX Compliance
            </span>
            <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Mandatory Public Disclosure
            </motion.h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          </div>

          <div className="bg-[#FCF7EE] rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] p-6 sm:p-10 border border-[#7A2021]/20 shadow-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#7A2021] text-[#F6EBD9] text-xs uppercase tracking-wider">
                  <th className="py-4 px-5 rounded-tl-xl">Document / Statutory Information</th>
                  <th className="py-4 px-5">Reference Code</th>
                  <th className="py-4 px-5 rounded-tr-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7A2021]/10 text-sm">
                {mandatoryDisclosures.map((row) => (
                  <tr key={row.doc} className="hover:bg-[#F6EBD9]/70 transition">
                    <td className="py-4 px-5 font-semibold text-[#2B1615]">{row.doc}</td>
                    <td className="py-4 px-5 font-mono text-xs text-[#7A2021]">{row.code}</td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A2021]/10 text-[#7A2021] text-xs font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" /> {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section id="contact" className="py-24 bg-[#FCF7EE] border-t border-[#7A2021]/15" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              Get In Touch
            </span>
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Contact St. Jude&apos;s H.S. School
            </motion.h2>
            <p className="text-sm sm:text-base text-[#5C3A38] leading-relaxed">
              We welcome parents, students, and alumni to reach out during administrative office hours for admissions, academic queries, or campus visits.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#F6EBD9] border border-[#7A2021]/15">
                <MapPin className="w-5 h-5 text-[#7A2021] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-[#7A2021]">Campus Address</h4>
                  <p className="text-sm text-[#2B1615]">{schoolInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#F6EBD9] border border-[#7A2021]/15">
                <Phone className="w-5 h-5 text-[#7A2021] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-[#7A2021]">Telephone</h4>
                  <p className="text-sm text-[#2B1615]">{schoolInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#F6EBD9] border border-[#7A2021]/15">
                <Mail className="w-5 h-5 text-[#7A2021] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-[#7A2021]">Official Email</h4>
                  <p className="text-sm text-[#2B1615]">{schoolInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F6EBD9] p-8 sm:p-10 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border border-[#7A2021]/20 shadow-lg">
            <motion.h3 className="text-2xl font-bold text-[#7A2021] mb-6" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>Send Us a Message</motion.h3>
            {contactSent ? (
              <div className="p-6 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl bg-[#FCF7EE] border border-[#7A2021]/20 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#7A2021] mx-auto" />
                <h4 className="font-cinzel font-bold text-xl text-[#7A2021]">Message Received</h4>
                <p className="text-sm text-[#5C3A38]">
                  Thank you for contacting St. Jude&apos;s Higher Secondary School, Khargone. Our office will respond shortly.
                </p>
                <button
                  onClick={() => setContactSent(false)}
                  className="text-xs font-bold uppercase tracking-wider text-[#7A2021] underline cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSent(true);
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Parent / Student Name"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FCF7EE] border border-[#7A2021]/20 text-sm focus:outline-none focus:border-[#7A2021]"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Contact Phone Number"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#FCF7EE] border border-[#7A2021]/20 text-sm focus:outline-none focus:border-[#7A2021]"
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FCF7EE] border border-[#7A2021]/20 text-sm focus:outline-none focus:border-[#7A2021]"
                />
                <textarea
                  required
                  rows="4"
                  placeholder="Write your query regarding admissions, academics, or administration..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FCF7EE] border border-[#7A2021]/20 text-sm focus:outline-none focus:border-[#7A2021]"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#7A2021] hover:bg-[#541213] text-[#F6EBD9] px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
                >
                  Submit Enquiry <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* LUXURY HERITAGE FOOTER */}
      <footer className="bg-[#541213] text-[#F6EBD9] border-t-4 border-[#C59B27]">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-3 lg:col-span-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E5C158]">
              <Award className="w-4 h-4" /> Affiliation No: {schoolInfo.affiliationNo}
            </div>
            <motion.h3 className="text-2xl font-bold text-[#F6EBD9]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>{schoolInfo.name}</motion.h3>
            <p className="text-sm text-[#F6EBD9]/80 max-w-md leading-relaxed">
              {schoolInfo.address}. Managed by the Catholic Diocese of Khandwa (Regd.) — Sharing Divine Knowledge and Love since 1985.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#E5C158]">
              Popular Links
            </h4>
            <ul className="space-y-2 text-sm text-[#F6EBD9]/85">
              <li><a href="#home" className="hover:text-[#E5C158] transition">Home</a></li>
              <li><a href="#about" className="hover:text-[#E5C158] transition">About Us</a></li>
              <li><a href="#management" className="hover:text-[#E5C158] transition">Managing Committee</a></li>
              <li><a href="#disclosure" className="hover:text-[#E5C158] transition">Mandatory Disclosure</a></li>
              <li><a href="#contact" className="hover:text-[#E5C158] transition">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-[#E5C158]">
              Contact Desk
            </h4>
            <p className="text-sm text-[#F6EBD9]/85">{schoolInfo.phone}</p>
            <p className="text-sm text-[#F6EBD9]/85">{schoolInfo.email}</p>
            <p className="text-xs text-[#E5C158]/90 pt-2">
              Rubilume • 40 Years of Excellence (1985 – 2025)
            </p>
          </div>
        </div>

        
          {/* Official Social Media Connect (Instagram & YouTube) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-6 border-t border-[#C59B27]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E5C158]">
                Connect With St. Jude&apos;s Khargone
              </p>
              <p className="text-xs text-[#F6EBD9]/75">
                Follow campus updates, Rubilume celebrations, and event highlights
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/sjskhargone_official?cplk=Z2xqZHR2Y3Bobmd3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#541213] hover:bg-[#7A2021] border border-[#C59B27]/55 hover:border-[#E5C158] text-[#F6EBD9] transition shadow-md"
              >
                <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <span className="text-xs font-bold tracking-wide">@sjskhargone_official</span>
              </a>

              <a
                href="https://youtube.com/@st.judesschoolkharogne4464?si=iKWHVDqm7SP-oqWX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#541213] hover:bg-[#7A2021] border border-[#C59B27]/55 hover:border-[#E5C158] text-[#F6EBD9] transition shadow-md"
              >
                <span className="w-7 h-7 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </span>
                <span className="text-xs font-bold tracking-wide">St. Jude&apos;s YouTube</span>
              </a>
            </div>
          </div>

          <div className="bg-[#3E0C0D] py-4 px-4 text-center text-xs text-[#F6EBD9]/75">
          © {new Date().getFullYear()} St. Jude&apos;s Higher Secondary School, Khargone (M.P.). All Rights Reserved.
        </div>
      
          </footer>

      {/* ADMISSION ENQUIRY MODAL */}
      {admissionOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCF7EE] max-w-lg w-full rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] border-2 border-[#7A2021] shadow-2xl overflow-hidden">
            <div className="bg-[#7A2021] text-[#F6EBD9] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#E5C158] font-bold">
                  Session 2026–2027
                </p>
                <motion.h3 className="font-cinzel text-lg font-bold" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>Admission Enquiry Form</motion.h3>
              </div>
              <button
                onClick={() => {
                  setAdmissionSent(false);
                  onCloseAdmission();
                }}
                className="p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {admissionSent ? (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle2 className="w-12 h-12 text-[#7A2021] mx-auto" />
                  <h4 className="font-cinzel text-xl font-bold text-[#7A2021]">
                    Application Enquiry Registered
                  </h4>
                  <p className="text-sm text-[#5C3A38]">
                    Our Admissions Desk at Mangrul Road, Khargone will contact you shortly with interaction dates.
                  </p>
                  <button
                    onClick={() => {
                      setAdmissionSent(false);
                      onCloseAdmission();
                    }}
                    className="bg-[#7A2021] text-[#F6EBD9] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setAdmissionSent(true);
                  }}
                  className="space-y-4"
                >
                  <input
                    required
                    type="text"
                    placeholder="Student Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-[#F6EBD9] border border-[#7A2021]/20 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select className="w-full px-4 py-3 rounded-xl bg-[#F6EBD9] border border-[#7A2021]/20 text-sm">
                      <option>Nursery / LKG / UKG</option>
                      <option>Class I – V</option>
                      <option>Class VI – VIII</option>
                      <option>Class IX</option>
                      <option>Class XI (Science)</option>
                      <option>Class XI (Commerce)</option>
                      <option>Class XI (Humanities)</option>
                    </select>
                    <input
                      required
                      type="tel"
                      placeholder="Parent Mobile No."
                      className="w-full px-4 py-3 rounded-xl bg-[#F6EBD9] border border-[#7A2021]/20 text-sm"
                    />
                  </div>
                  <input
                    required
                    type="text"
                    placeholder="Father's / Mother's Name"
                    className="w-full px-4 py-3 rounded-xl bg-[#F6EBD9] border border-[#7A2021]/20 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#7A2021] hover:bg-[#541213] text-[#F6EBD9] py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
                  >
                    Submit Admission Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
      </ScrollytellingChapter>
);
}


