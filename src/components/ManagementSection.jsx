import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronDown, ChevronUp } from "lucide-react";
import { leadershipMessages, managingCommittee } from "../data/schoolData";

export default function ManagementSection() {
  const [activeLeader, setActiveLeader] = useState(0);

  const leaders = Array.isArray(leadershipMessages) ? leadershipMessages : [];

  const getLeaderPhoto = (item) => {
    if (item?.image) return item.image;
    const label = ((item?.role || item?.designation || item?.title || "") + " " + (item?.name || "")).toLowerCase();
    if (label.includes("president")) return "/leadership/president.jpg";
    if (label.includes("principal")) return "/leadership/principal.jpg";
    if (label.includes("manager")) return "/leadership/manager.jpg";
    return null;
  };

  const current = leaders[activeLeader] || leaders[0];

  return (
    <section id="leadership" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F6EBD9] text-[#2B1615] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#7A2021] mb-3">
            Guiding Vision &amp; Legacy
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1615]">
            From the Leadership Desk
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C59B27] to-transparent mx-auto mt-4" />
        </div>

        {/* 3 Leadership Cards (President, Principal, Manager) */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {leaders.map((leader, idx) => {
            const isSelected = activeLeader === idx;
            const photoUrl = getLeaderPhoto(leader);

            return (
              <div
                key={leader.id || leader.name || idx}
                onClick={() => setActiveLeader(idx)}
                className={`group rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer border-2 flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#541213] text-[#F6EBD9] border-[#E5C158] shadow-[0_18px_45px_rgba(84,18,19,0.28)] -translate-y-1"
                    : "bg-[#FCF7EE] text-[#2B1615] border-[#C59B27]/40 hover:border-[#7A2021] shadow-md hover:shadow-xl"
                }`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    {photoUrl && (
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-tr from-[#8C6914] via-[#E5C158] to-[#C59B27] shadow-lg shrink-0">
                        <img
                          src={photoUrl}
                          alt={leader.name || "School Leader"}
                          className="w-full h-full object-cover object-top rounded-full border-2 border-[#FCF7EE]"
                        />
                      </div>
                    )}
                    <div>
                      <span
                        className={`inline-block text-[11px] font-bold uppercase tracking-[0.22em] mb-1 ${
                          isSelected ? "text-[#E5C158]" : "text-[#7A2021]"
                        }`}
                      >
                        {leader.role || leader.designation || leader.title}
                      </span>
                      <h3 className="font-cinzel text-lg sm:text-xl font-bold leading-snug">
                        {leader.name}
                      </h3>
                    </div>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                      isSelected ? "text-[#F6EBD9]/85" : "text-[#4A2E2B]"
                    }`}
                  >
                    {leader.quote || leader.excerpt || leader.message || leader.fullMessage}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#C59B27]/25 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className={isSelected ? "text-[#E5C158]" : "text-[#7A2021]"}>
                    {isSelected ? "Reading Full Message" : "Read Full Message"}
                  </span>
                  {isSelected ? (
                    <ChevronUp className="w-4 h-4 text-[#E5C158]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7A2021]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded Full Message Box Directly Underneath the Cards */}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.name || activeLeader}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl bg-[#FCF7EE] border-2 border-[#C59B27] p-6 sm:p-10 shadow-xl relative overflow-hidden"
            >
              <Quote className="w-12 h-12 text-[#C59B27]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 mb-6 border-b border-[#7A2021]/15">
                {getLeaderPhoto(current) && (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#8C6914] via-[#E5C158] to-[#C59B27] shadow-lg shrink-0">
                    <img
                      src={getLeaderPhoto(current)}
                      alt={current.name}
                      className="w-full h-full object-cover object-top rounded-full border-2 border-[#FCF7EE]"
                    />
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
                    {current.role || current.designation || current.title}
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#2B1615] mt-1">
                    {current.name}
                  </h3>
                  {current.qualification && (
                    <p className="text-xs text-[#6B4B47] mt-1 font-medium">
                      {current.qualification}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-sm sm:text-base text-[#3A201E] leading-relaxed whitespace-pre-line space-y-4">
                {current.message || current.fullMessage || current.bio || current.quote}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
