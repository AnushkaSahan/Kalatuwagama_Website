import { useTranslation } from "react-i18next";
import { Calendar, MapPin } from "lucide-react";
import FocalImage from "./FocalImage";
import { parseLocalDateTime } from "../../utils/datetime";

const formatDate = (value) => {
  if (!value) return null;
  const date = parseLocalDateTime(value);
  if (!date || Number.isNaN(date.getTime())) return null;
  return {
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    full: date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
};

export default function EventCard({ event, index = 0 }) {
  const { t } = useTranslation();
  const date = formatDate(event.eventDate || event.date);
  const isPast =
    date && parseLocalDateTime(event.eventDate || event.date) < new Date();

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/5 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft dark:border-white/10 dark:bg-ink-900">
      <div className="relative h-48 w-full overflow-hidden bg-ink-900/5 dark:bg-white/5">
        {event.imageUrl ? (
          <FocalImage
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-maroon text-white/30">
            <Calendar className="h-10 w-10" />
          </div>
        )}
        {date && (
          <div className="absolute left-4 top-4 flex w-14 flex-col items-center rounded-xl bg-white/95 py-2 text-primary-900 shadow-soft backdrop-blur">
            <span className="text-lg font-bold leading-none">{date.day}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              {date.month}
            </span>
          </div>
        )}
        {isPast && (
          <div className="absolute right-4 top-4 rounded-full bg-ink-900/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur dark:bg-black/60">
            {t("events.past")}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-50">
          {event.title}
        </h3>
        {event.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-900/55 dark:text-cream-100/60">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {event.location}
          </p>
        )}
        {event.description && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-900/55 line-clamp-2 dark:text-cream-100/55">
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}
