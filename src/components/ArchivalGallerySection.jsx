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


export default function ArchivalGallerySection() {
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
      <motion.section id="gallery" className="py-24 bg-[#FCF7EE]/42 border-y border-[#7A2021]/15 overflow-hidden" initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              Campus Life &amp; Chronicles • {allPhotos.length} Archival Photos
            </span>
            <motion.h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 28, letterSpacing: "0.06em" }} whileInView={{ opacity: 1, y: 0, letterSpacing: "0.01em" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              Photo Gallery &amp; Milestones
            </motion.h2>
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
                  : "bg-[#F6EBD9]/42 text-[#7A2021] border border-[#7A2021]/20 hover:bg-[#E8D5B7]"
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
                    : "bg-[#F6EBD9]/42 text-[#7A2021] border border-[#7A2021]/20 hover:bg-[#E8D5B7]"
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
                    className="group relative h-80 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] overflow-hidden bg-[#240708] border-2 border-[#7A2021]/25 hover:border-[#C59B27] shadow-xl hover:shadow-2xl transition-all cursor-pointer"
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
                      <motion.h3 className="font-cinzel text-2xl font-bold text-[#F6EBD9] group-hover:text-[#E5C158] transition" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                        {album.label}
                      </motion.h3>
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
                <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F6EBD9]/42 px-6 py-4 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl border border-[#7A2021]/20">
                  <button
                    onClick={() => setSelectedAlbum(null)}
                    className="inline-flex items-center gap-2 bg-[#7A2021] hover:bg-[#541213] text-[#F6EBD9] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#E5C158]" /> Back to All 5 Albums
                  </button>

                  <div className="text-right">
                    <motion.h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#7A2021]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                      {activeAlbumData?.label} ({activeAlbumData?.count})
                    </motion.h3>
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
                      className="group relative h-72 rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(122,32,33,0.18)] hover:border-[#C59B27] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(122,32,33,0.15)] overflow-hidden bg-[#240708] border-2 border-[#7A2021]/20 hover:border-[#C59B27] shadow-lg hover:shadow-2xl transition cursor-pointer"
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
      </motion.section>
    </>
  );
}
