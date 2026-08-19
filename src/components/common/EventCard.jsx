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
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-900/[0.06] bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-deep dark:border-white/[0.07] dark:bg-[#18100d]">
      {/* Gradient accent top line on hover */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-ink-900/[0.04] dark:bg-white/[0.04]">
        {event.imageUrl ? (
          <FocalImage
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-maroon text-white/20">
            <Calendar className="h-12 w-12" />
          </div>
        )}

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Date badge */}
        {date && (
          <div className="absolute left-4 top-4 flex w-14 flex-col items-center rounded-xl border border-white/60 bg-white/95 py-2 text-primary-900 shadow-soft backdrop-blur-sm">
            <span className="text-xl font-bold leading-none">{date.day}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700">
              {date.month}
            </span>
          </div>
        )}

        {/* Past badge */}
        {isPast && (
          <div className="absolute right-4 top-4 rounded-full bg-ink-900/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {t("events.past")}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink-900 dark:text-cream-50">
          {event.title}
        </h3>
        {event.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-900/50 dark:text-cream-100/55">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400" />
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
