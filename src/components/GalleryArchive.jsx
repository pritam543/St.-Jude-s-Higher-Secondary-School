import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Sparkles } from "lucide-react";

const cinematicEase = [0.16, 1, 0.3, 1];

export default function GalleryArchive() {
  const [selectedImg, setSelectedImg] = useState(null);

  // Automatically loads all campus images from /public/gallery or /public/images
  const imageModules = import.meta.glob("/public/**/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default"
  });

  const photos = Object.entries(imageModules)
    .map(([path, url]) => {
      const cleanUrl = url.replace(/^\/public/, "");
      const fileName = path
        .split("/")
        .pop()
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");
      return { url: cleanUrl, title: fileName };
    })
    .filter((item) => !item.url.toLowerCase().includes("vite"));

  return (
    <section id="gallery" className="py-24 bg-[#F6EBD9] relative">
      <div className="max-w-7xl mx-auto px-4 space-y-14">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A2021]">
            <Sparkles className="w-4 h-4 text-[#C59B27]" /> Campus Moments &amp; Celebrations
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold gold-shimmer-text">
            St. Jude&apos;s Photo Gallery
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-[#7A2021] via-[#C59B27] to-[#7A2021] mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.url + idx}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: (idx % 4) * 0.08, ease: cinematicEase }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedImg(photo)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#FCF7EE] border-2 border-[#7A2021]/15 hover:border-[#C59B27] shadow-md hover:shadow-2xl cursor-pointer transition-all"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1615]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-xs font-semibold text-[#F6EBD9] capitalize flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#E5C158]" />
                  {photo.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[90] bg-[#1A0405]/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#FCF7EE] rounded-3xl overflow-hidden border-2 border-[#C59B27] shadow-2xl"
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#7A2021] text-[#F6EBD9] flex items-center justify-center border border-[#E5C158] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedImg.url}
                alt={selectedImg.title}
                className="w-full max-h-[78vh] object-contain bg-[#1A0405]"
              />
              <div className="p-4 text-center bg-[#541213] text-[#F6EBD9]">
                <p className="font-cinzel text-sm sm:text-base capitalize text-[#E5C158]">
                  {selectedImg.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
