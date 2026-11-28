import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileCheck2,
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import Navbar from "./Navbar";
import { Scroll3DPanel, Scroll3DHeading } from "./MotionPrimitives";
import {
  schoolInfo,
  mandatoryDisclosures,
  sampleTCs
} from "../data/schoolData";
import { fetchTcRecordsFromSheet } from "../services/googleSheets";


export default function CompliancePortalPage({
  onBackHome,
  onNavigate,
  onOpenAdmission,
  initialSection = "tc"
}) {
  const [tcQuery, setTcQuery] = useState("");
  const [tcResult, setTcResult] = useState(null);
  const [tcRecords, setTcRecords] = useState(sampleTCs);

  React.useEffect(() => {
    fetchTcRecordsFromSheet(sampleTCs).then((records) => {
      if (records && records.length) setTcRecords(records);
    });
  }, []);

  const scrollToSection = (sectionId) => {
    const id = sectionId === "disclosure" ? "disclosure" : "tc";
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 145;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === "#disclosure" || initialSection === "disclosure") {
      scrollToSection("disclosure");
    } else {
      scrollToSection("tc");
    }
  }, [initialSection]);

  const handleTcSearch = async (e) => {
    e.preventDefault();
    const q = tcQuery.trim().toLowerCase();
    if (!q) {
      setTcResult({ found: false, msg: "Please enter a TC Number or Admission Number." });
      return;
    }
    const liveRecords = await fetchTcRecordsFromSheet(tcRecords);
    setTcRecords(liveRecords);
    const match = liveRecords.find(
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
    <div className="min-h-screen bg-[#F6EBD9] text-[#2B1615] flex flex-col">
      {/* Main Website Navbar */}
      <Navbar
        onOpenAdmission={onOpenAdmission}
        onNavigate={onNavigate}
        showMainNav={true}
      />

      {/* Heritage Compliance Action Header */}
      <div className="pt-28 sm:pt-32 md:pt-36 bg-[#541213] border-b-2 border-[#C59B27]/60 text-[#F6EBD9] shadow-lg relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              if (typeof onBackHome === "function") onBackHome();
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#7A2021] hover:bg-[#912829] text-[#E5C158] border border-[#C59B27] text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#E5C158] font-bold">
              CBSE Affiliation No. {schoolInfo.affiliationNo} • Official Portal
            </p>
            <h1 className="font-cinzel text-sm sm:text-lg font-bold text-[#F6EBD9]">
              Transfer Certificate Verification &amp; Public Disclosure
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.history.pushState(null, "", "#tc");
                scrollToSection("tc");
              }}
              className="px-3.5 py-2 rounded-full bg-[#3B0B0C] hover:bg-[#7A2021] border border-[#C59B27]/60 text-[#E5C158] text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Verify TC
            </button>
            <button
              type="button"
              onClick={() => {
                window.history.pushState(null, "", "#disclosure");
                scrollToSection("disclosure");
              }}
              className="px-3.5 py-2 rounded-full bg-[#3B0B0C] hover:bg-[#7A2021] border border-[#C59B27]/60 text-[#E5C158] text-[11px] font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Disclosure
            </button>
          </div>
        </div>
      </div>

      {/* Main Compliance Sections */}
      <main className="flex-grow">
        {/* 1. TRANSFER CERTIFICATE (TC) VERIFICATION SECTION */}
        <motion.section
          id="tc"
          className="scroll-mt-40 py-20 bg-[#F6EBD9]/75 border-b border-[#7A2021]/15"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-5xl mx-auto px-4 space-y-10">
            <Scroll3DHeading className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A2021]/10 border border-[#7A2021]/20 text-[#7A2021] text-xs font-bold uppercase tracking-widest">
                <FileCheck2 className="w-4 h-4 text-[#C59B27]" />
                CBSE Digital Compliance
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#7A2021]">
                Transfer Certificate (TC) Portal
              </h2>
              <p className="text-[#5C3A38] max-w-2xl mx-auto text-sm sm:text-base">
                Verify issued Transfer Certificates online using Admission Number or TC Serial Number as per CBSE Affiliation guidelines.
              </p>
            </Scroll3DHeading>

            <Scroll3DPanel>
              <div className="bg-[#FCF7EE] rounded-3xl p-6 sm:p-10 border-2 border-[#C59B27]/40 shadow-xl space-y-6">
                <form onSubmit={handleTcSearch} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-[#7A2021]/60 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={tcQuery}
                      onChange={(e) => setTcQuery(e.target.value)}
                      placeholder="Enter TC No. (e.g., SJHS/2025/1042) or Admission No. (e.g., 4892)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-[#7A2021]/25 text-[#2B1615] text-sm focus:outline-none focus:border-[#7A2021]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-xl bg-[#7A2021] hover:bg-[#541213] text-[#F6EBD9] font-bold text-sm uppercase tracking-wider shadow-lg transition cursor-pointer shrink-0"
                  >
                    Verify TC
                  </button>
                </form>

                {tcResult && (
                  <div className="pt-2">
                    {tcResult.found ? (
                      <div className="p-6 rounded-2xl bg-emerald-950/5 border border-emerald-700/30 space-y-4">
                        <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-base">
                          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                          Verified Genuine Transfer Certificate — St. Jude&apos;s H.S. School
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-xs uppercase text-[#5C3A38] block">Student Name</span>
                            <strong className="text-[#2B1615]">{tcResult.record.student}</strong>
                          </div>
                          <div>
                            <span className="text-xs uppercase text-[#5C3A38] block">Admission No.</span>
                            <strong className="text-[#2B1615]">{tcResult.record.admNo}</strong>
                          </div>
                          <div>
                            <span className="text-xs uppercase text-[#5C3A38] block">TC Serial No.</span>
                            <strong className="text-[#7A2021]">{tcResult.record.tcNo}</strong>
                          </div>
                          <div>
                            <span className="text-xs uppercase text-[#5C3A38] block">Class Left</span>
                            <strong className="text-[#2B1615]">{tcResult.record.classLeft}</strong>
                          </div>
                          <div>
                            <span className="text-xs uppercase text-[#5C3A38] block">Academic Session</span>
                            <strong className="text-[#2B1615]">{tcResult.record.session || tcResult.record.issueDate}</strong>
                          </div>
                          <div>
                            <span className="text-xs uppercase text-[#5C3A38] block">Status</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-xs font-semibold">
                              {tcResult.record.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-amber-950/5 border border-amber-700/30 flex items-center gap-3 text-sm text-[#5C3A38]">
                        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                        <span>{tcResult.msg}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Scroll3DPanel>
          </div>
        </motion.section>

        {/* 2. MANDATORY PUBLIC DISCLOSURE SECTION */}
        <motion.section
          id="disclosure"
          className="scroll-mt-40 py-20 bg-[#FCF7EE]"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-6xl mx-auto px-4 space-y-10">
            <Scroll3DHeading className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7A2021]/10 border border-[#7A2021]/20 text-[#7A2021] text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
                Appendix IX • Statutory Records
              </div>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#7A2021]">
                Mandatory Public Disclosure
              </h2>
              <p className="text-[#5C3A38] max-w-2xl mx-auto text-sm sm:text-base">
                Statutory affiliation documents, safety certificates, academic calendars, and examination records maintained in accordance with CBSE norms.
              </p>
            </Scroll3DHeading>

            <Scroll3DPanel>
              <div className="overflow-x-auto rounded-3xl border-2 border-[#C59B27]/40 shadow-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#541213] text-[#F6EBD9] text-xs uppercase tracking-wider">
                      <th className="py-4 px-6 font-bold">Document / Statutory Information</th>
                      <th className="py-4 px-6 font-bold">Reference Code</th>
                      <th className="py-4 px-6 font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#7A2021]/10 text-sm">
                    {mandatoryDisclosures.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#F6EBD9]/50 transition-colors"
                      >
                        <td className="py-4 px-6 font-medium text-[#2B1615]">
                          {item.doc}
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-[#7A2021] font-semibold">
                          {item.code}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/10 text-emerald-900 border border-emerald-700/25 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Scroll3DPanel>
          </div>
        </motion.section>
      </main>

      {/* Heritage Footer */}
      <footer className="bg-[#2B0809] text-[#F6EBD9] border-t-4 border-[#C59B27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6EBD9]/75">
          <div>
            <p className="font-cinzel text-sm font-bold text-[#E5C158]">
              St. Jude&apos;s Higher Secondary School, Khargone
            </p>
            <p className="mt-1">
              © {new Date().getFullYear()} All Rights Reserved • Managed by Catholic Diocese of Khandwa
            </p>
          </div>
          <button
            onClick={() => {
              if (typeof onBackHome === "function") onBackHome();
            }}
            className="inline-flex items-center gap-1.5 text-[#E5C158] hover:underline font-semibold cursor-pointer"
          >
            Return to Main Campus Portal <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
