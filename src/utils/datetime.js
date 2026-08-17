/**
 * The backend stores publishDate / eventDate as a zone-naive LocalDateTime
 * (e.g. "2026-08-20T10:00:00"). It represents a plain wall-clock time with
 * no timezone attached — it is NOT UTC.
 *
 * `new Date("2026-08-20T10:00:00")` is technically parsed as browser-local
 * time per the ES spec, which usually "just works" for same-timezone
 * viewers — but any string that includes (or picks up) a "Z"/offset
 * anywhere in the pipeline gets shifted by the browser's UTC offset,
 * silently changing the displayed date/time (and sometimes the day).
 *
 * This helper parses the date/time fields directly as plain numbers and
 * builds a local Date with them, so the displayed value always matches
 * exactly what was stored — no implicit timezone conversion, ever.
 */
export const parseLocalDateTime = (value) => {
  if (!value) return null;
  const [datePart, timePart = "00:00:00"] = String(value).split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) return null;
  const [hour = 0, minute = 0, second = 0] = timePart
    .replace("Z", "")
    .split(":")
    .map(Number);
  return new Date(year, month - 1, day, hour || 0, minute || 0, second || 0);
};
