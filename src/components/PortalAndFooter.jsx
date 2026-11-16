import React, { useState, useMemo } from "react";
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
    <>
      {/* TRANSFER CERTIFICATE (TC) VERIFICATION SECTION */}
      <section id="tc" className="py-24 bg-[#F6EBD9]">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              CBSE Digital Verification
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]">
              Transfer Certificate (TC) Portal
            </h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-[#5C3A38] max-w-2xl mx-auto">
              Verify issued Transfer Certificates online using Admission Number or TC Serial Number as per CBSE Affiliation guidelines.
            </p>
          </div>

          <div className="bg-[#FCF7EE] p-8 sm:p-10 rounded-3xl border-2 border-[#7A2021]/20 shadow-xl space-y-6">
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
                className={`p-5 rounded-2xl border ${
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
      </section>

      {/* ALBUM-BASED CINEMATIC PHOTO GALLERY */}
      <section id="gallery" className="py-24 bg-[#FCF7EE] border-y border-[#7A2021]/15 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              Campus Life &amp; Chronicles • {allPhotos.length} Archival Photos
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]">
              Photo Gallery &amp; Milestones
            </h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-[#5C3A38]">
              {selectedAlbum
                ? `Exploring ${activeAlbumData?.label} (${activeAlbumData?.count} Photos)`
                : "Select a category album below to explore campus memories"}
            </p>
          </div>

          {/* Quick Category Navigation Bar */}
          <div className="flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => setSelectedAlbum(null)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                selectedAlbum === null
                  ? "bg-[#7A2021] text-[#F6EBD9] border border-[#C59B27] shadow-md"
                  : "bg-[#F6EBD9] text-[#7A2021] border border-[#7A2021]/20 hover:bg-[#E8D5B7]"
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#C59B27]" />
              All Albums (5)
            </button>

            {albums.map((alb) => (
              <button
                key={alb.key}
                onClick={() => handleOpenAlbum(alb.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  selectedAlbum === alb.key
                    ? "bg-[#7A2021] text-[#F6EBD9] border border-[#C59B27] shadow-md"
                    : "bg-[#F6EBD9] text-[#7A2021] border border-[#7A2021]/20 hover:bg-[#E8D5B7]"
                }`}
              >
                {alb.label} ({alb.count})
              </button>
            ))}
          </div>

          {/* Smooth Switch Between 5 Album Cards & Selected Album Photos */}
          <AnimatePresence mode="wait">
            {selectedAlbum === null ? (
              /* VIEW 1: 5 CATEGORY ALBUM SECTIONS */
              <motion.div
                key="albums-overview"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.55, ease: cinematicEase }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {albums.map((album, idx) => (
                  <motion.div
                    key={album.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, delay: idx * 0.08, ease: cinematicEase }}
                    whileHover={{ y: -8 }}
                    onClick={() => handleOpenAlbum(album.key)}
                    className="group relative h-80 rounded-3xl overflow-hidden bg-[#240708] border-2 border-[#7A2021]/25 hover:border-[#C59B27] shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <img
                      src={album.cover}
                      alt={album.label}
                      className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A0405]/95 via-[#1A0405]/35 to-transparent" />

                    {/* Top Photo Count Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C59B27] text-[#2B1615] text-xs font-extrabold uppercase tracking-wider shadow-md">
                        <Images className="w-3.5 h-3.5" /> {album.count} Photos
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#1A0405]/70 backdrop-blur-md text-[#E5C158] text-[11px] font-bold uppercase tracking-wider border border-[#E5C158]/30 group-hover:bg-[#7A2021] transition">
                        Open Album →
                      </span>
                    </div>

                    {/* Bottom Album Title & Description */}
                    <div className="absolute bottom-5 left-6 right-6 text-[#F6EBD9] space-y-1">
                      <h3 className="font-cinzel text-2xl font-bold text-[#F6EBD9] group-hover:text-[#E5C158] transition">
                        {album.label}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#F6EBD9]/85">
                        {album.subtitle}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* VIEW 2: PHOTOS INSIDE THE CLICKED CATEGORY ALBUM */
              <motion.div
                key={`album-${selectedAlbum}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55, ease: cinematicEase }}
                className="space-y-8"
              >
                {/* Album Header Bar with Back Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F6EBD9] px-6 py-4 rounded-2xl border border-[#7A2021]/20">
                  <button
                    onClick={() => setSelectedAlbum(null)}
                    className="inline-flex items-center gap-2 bg-[#7A2021] hover:bg-[#541213] text-[#F6EBD9] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#E5C158]" /> Back to All 5 Albums
                  </button>

                  <div className="text-right">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#7A2021]">
                      {activeAlbumData?.label} ({activeAlbumData?.count})
                    </h3>
                    <p className="text-xs text-[#5C3A38]">{activeAlbumData?.subtitle}</p>
                  </div>
                </div>

                {/* Photos Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeAlbumData?.photos.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(idx * 0.05, 0.5),
                        ease: cinematicEase
                      }}
                      whileHover={{ y: -6 }}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative h-72 rounded-3xl overflow-hidden bg-[#240708] border-2 border-[#7A2021]/20 hover:border-[#C59B27] shadow-lg hover:shadow-2xl transition cursor-pointer"
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0405]/85 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-[#C59B27] text-[#2B1615] text-[10px] font-extrabold uppercase tracking-wider shadow">
                          {item.categoryLabel}
                        </span>
                        <span className="w-9 h-9 rounded-full bg-[#1A0405]/65 backdrop-blur-md text-[#F6EBD9] flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <ZoomIn className="w-4 h-4 text-[#E5C158]" />
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-5 right-5 text-[#F6EBD9]">
                        <h4 className="font-cinzel text-lg font-bold drop-shadow">
                          {item.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

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
                className="max-h-[78vh] w-auto rounded-2xl border-2 border-[#C59B27] shadow-2xl object-contain"
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
      <section id="disclosure" className="py-24 bg-[#F6EBD9]">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              CBSE Appendix IX Compliance
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]">
              Mandatory Public Disclosure
            </h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          </div>

          <div className="bg-[#FCF7EE] rounded-3xl p-6 sm:p-10 border border-[#7A2021]/20 shadow-lg overflow-x-auto">
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
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#FCF7EE] border-t border-[#7A2021]/15">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#7A2021]">
              Contact St. Jude&apos;s H.S. School
            </h2>
            <p className="text-sm sm:text-base text-[#5C3A38] leading-relaxed">
              We welcome parents, students, and alumni to reach out during administrative office hours for admissions, academic queries, or campus visits.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F6EBD9] border border-[#7A2021]/15">
                <MapPin className="w-5 h-5 text-[#7A2021] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-[#7A2021]">Campus Address</h4>
                  <p className="text-sm text-[#2B1615]">{schoolInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F6EBD9] border border-[#7A2021]/15">
                <Phone className="w-5 h-5 text-[#7A2021] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-[#7A2021]">Telephone</h4>
                  <p className="text-sm text-[#2B1615]">{schoolInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F6EBD9] border border-[#7A2021]/15">
                <Mail className="w-5 h-5 text-[#7A2021] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-[#7A2021]">Official Email</h4>
                  <p className="text-sm text-[#2B1615]">{schoolInfo.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F6EBD9] p-8 sm:p-10 rounded-3xl border border-[#7A2021]/20 shadow-lg">
            <h3 className="text-2xl font-bold text-[#7A2021] mb-6">Send Us a Message</h3>
            {contactSent ? (
              <div className="p-6 rounded-2xl bg-[#FCF7EE] border border-[#7A2021]/20 text-center space-y-3">
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
      </section>

      {/* LUXURY HERITAGE FOOTER */}
      <footer className="bg-[#541213] text-[#F6EBD9] border-t-4 border-[#C59B27]">
        <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-3 lg:col-span-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E5C158]">
              <Award className="w-4 h-4" /> Affiliation No: {schoolInfo.affiliationNo}
            </div>
            <h3 className="text-2xl font-bold text-[#F6EBD9]">{schoolInfo.name}</h3>
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

        <div className="bg-[#3E0C0D] py-4 px-4 text-center text-xs text-[#F6EBD9]/75">
          © {new Date().getFullYear()} St. Jude&apos;s Higher Secondary School, Khargone (M.P.). All Rights Reserved.
        </div>
      </footer>

      {/* ADMISSION ENQUIRY MODAL */}
      {admissionOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCF7EE] max-w-lg w-full rounded-3xl border-2 border-[#7A2021] shadow-2xl overflow-hidden">
            <div className="bg-[#7A2021] text-[#F6EBD9] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#E5C158] font-bold">
                  Session 2026–2027
                </p>
                <h3 className="font-cinzel text-lg font-bold">Admission Enquiry Form</h3>
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
  );
}
