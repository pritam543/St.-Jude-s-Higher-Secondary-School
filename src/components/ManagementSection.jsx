import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Users, Award } from "lucide-react";
import { leadershipMessages, managingCommittee } from "../data/schoolData";
import { Reveal, cinematicEase } from "./MotionPrimitives";

export default function ManagementSection() {
  const [activeLeader, setActiveLeader] = useState(0);

  return (
    <section id="management" className="py-24 bg-[#F6EBD9]">
      <div className="max-w-7xl mx-auto px-4 space-y-20">
        <div>
          <Reveal className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#7A2021]">
              Governance &amp; Guidance
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#7A2021]">
              Messages From Leadership
            </h2>
            <div className="w-24 h-1 bg-[#C59B27] mx-auto rounded-full" />
          </Reveal>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {leadershipMessages.map((leader, idx) => (
              <button
                key={leader.role}
                onClick={() => setActiveLeader(idx)}
                className={`relative px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeLeader === idx
                    ? "text-[#F6EBD9]"
                    : "bg-[#FCF7EE] text-[#7A2021] border border-[#7A2021]/20 hover:bg-[#E8D5B7]/60"
                }`}
              >
                {activeLeader === idx && (
                  <motion.span
                    layoutId="leaderPill"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-[#7A2021] border border-[#C59B27] shadow-lg"
                  />
                )}
                <span className="relative z-10">{leader.role}</span>
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-[#FCF7EE] rounded-3xl p-8 sm:p-12 border-2 border-[#7A2021]/20 shadow-xl relative overflow-hidden">
            <Quote className="w-12 h-12 text-[#C59B27]/30 absolute top-8 right-8" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLeader}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: cinematicEase }}
              >
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#7A2021]/10 text-[#7A2021] text-xs font-bold uppercase tracking-widest mb-4">
                  {leadershipMessages[activeLeader].role}
                </span>
                <p className="font-serif-editorial text-xl sm:text-2xl text-[#2B1615] leading-relaxed italic mb-8">
                  &ldquo;{leadershipMessages[activeLeader].message}&rdquo;
                </p>
                <div className="border-t border-[#7A2021]/15 pt-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#7A2021] text-[#E5C158] flex items-center justify-center font-cinzel font-bold text-lg">
                    {leadershipMessages[activeLeader].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-[#7A2021]">
                      {leadershipMessages[activeLeader].name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C3A38] font-medium">
                      {leadershipMessages[activeLeader].designation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="bg-[#FCF7EE] rounded-3xl p-6 sm:p-10 border border-[#7A2021]/20 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-[#7A2021]/15 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7A2021] mb-1">
                <Users className="w-4 h-4 text-[#C59B27]" /> CBSE Bye-Laws Section 20 &amp; 21
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#7A2021]">
                Members of the Managing Committee
              </h3>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#7A2021] text-[#F6EBD9] text-xs font-semibold px-4 py-2 rounded-full">
              <Award className="w-4 h-4 text-[#E5C158]" /> 14 Esteemed Members
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#7A2021] text-[#F6EBD9] text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4 rounded-tl-xl">S.No.</th>
                  <th className="py-3.5 px-4">Member Name</th>
                  <th className="py-3.5 px-4 rounded-tr-xl">Designation / Representation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7A2021]/10 text-sm">
                {managingCommittee.map((member) => (
                  <tr key={member.sno} className="hover:bg-[#F6EBD9]/70 transition">
                    <td className="py-3.5 px-4 font-bold text-[#7A2021]">{member.sno}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#2B1615]">{member.name}</td>
                    <td className="py-3.5 px-4 text-[#5C3A38]">{member.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
