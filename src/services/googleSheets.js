// Central Google Sheets 3-Tab Bridge (Admission_Inquiry, Contact_Inquiry, TC_Verification)
const SHEET_API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL || "";

export async function submitToGoogleSheet(payload) {
  if (!SHEET_API_URL) {
    console.warn("VITE_GOOGLE_SHEET_API_URL not set yet — skipping remote sheet post.");
    return { status: "skipped" };
  }

  // Use text/plain to avoid CORS preflight issues with Google Apps Script Web Apps
  await fetch(SHEET_API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  return { status: "sent" };
}

export async function fetchTcRecordsFromSheet(fallbackRecords = []) {
  if (!SHEET_API_URL) {
    return fallbackRecords;
  }

  try {
    const res = await fetch(`${SHEET_API_URL}?action=tc&t=${Date.now()}`);
    if (!res.ok) return fallbackRecords;
    const data = await res.json();
    if (data && data.status === "success" && Array.isArray(data.records)) {
      const mapped = data.records.map((r) => ({
        tcNo: String(r.tcNumber || r.tcNo || "").trim(),
        admNo: String(r.scholarNo || r.admNo || "").trim(),
        student: String(r.studentName || r.student || "").trim(),
        fatherName: String(r.fatherName || "").trim(),
        classLeft: String(r.classPassed || r.classLeft || "").trim(),
        session: String(r.sessionYear || r.session || "").trim(),
        issueDate: String(r.issueDate || "").trim(),
        status: String(r.status || "Verified").trim(),
      }));
      return mapped.length > 0 ? mapped : fallbackRecords;
    }
    return fallbackRecords;
  } catch (err) {
    console.warn("TC Sheet lookup fallback used:", err);
    return fallbackRecords;
  }
}
