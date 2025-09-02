function parseDate(str) {
  if (typeof str === "string" && str.includes("T")) {
    // ISO string, e.g., 2025-09-02T07:18:19.354Z
    return new Date(str);
  }
  // custom format: hh-mm-ss-d-m-yyyy
  const [hh, mm, ss, d, m, y] = str.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, ss ?? 0);
}

function startOfDayLocal(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfWeekMonday(d) {
  const today0 = startOfDayLocal(d);
  const offset = (today0.getDay() + 6) % 7; // Mon=0 ... Sun=6
  const mon = new Date(today0);
  mon.setDate(today0.getDate() - offset);
  return mon;
}

function localDayKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export { localDayKey, parseDate, startOfDayLocal, startOfWeekMonday };

