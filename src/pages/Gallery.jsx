import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Images } from "lucide-react";
import { getGalleryItems } from "../api/gallery";
import { getEvents } from "../api/events";
import Reveal from "../components/common/Reveal";
import HeroPhoto from "../components/common/HeroPhoto";
import SectionHeading from "../components/common/SectionHeading";
import FocalImage from "../components/common/FocalImage";
import SkeletonCard from "../components/common/SkeletonCard";
import Lightbox from "../components/common/Lightbox";

export default function GalleryPage() {
  const { t } = useTranslation();
  const [photos, setPhotos] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState("all");
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [galleryRes, eventsRes] = await Promise.all([
          getGalleryItems(),
          getEvents(),
        ]);
        setPhotos(galleryRes.data || []);
        setEvents(eventsRes.data || []);
      } catch (e) {
        /* graceful empty state */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const eventTitleMap = useMemo(() => {
    const map = {};
    events.forEach((ev) => (map[ev.id] = ev.title));
    return map;
  }, [events]);

  const albums = useMemo(() => {
    const withEvent = events.filter((ev) =>
      photos.some((p) => p.eventId === ev.id),
    );
    return withEvent;
  }, [events, photos]);

  const filtered = useMemo(() => {
    const list =
      activeEvent === "all"
        ? photos
        : photos.filter((p) => p.eventId === activeEvent);
    return list.map((p) => ({ ...p, eventTitle: eventTitleMap[p.eventId] }));
  }, [photos, activeEvent, eventTitleMap]);

  return (
    <div>
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-gradient-hero pb-16 pt-32">
        <HeroPhoto />
        <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-wide relative text-center">
          <Reveal>
            <span className="eyebrow border-white/30 bg-white/10 text-gold-300">
              {t("gallery.eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
              {t("gallery.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              {t("gallery.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          {/* Filters */}
          <Reveal className="flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveEvent("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeEvent === "all"
                  ? "bg-gradient-maroon text-white shadow-soft"
                  : "bg-white text-ink-900/60 shadow-card hover:text-primary-900 dark:bg-ink-900 dark:text-cream-100/60 dark:hover:text-gold-400"
              }`}
            >
              {t("gallery.filterAll")}
            </button>
            {albums.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => setActiveEvent(ev.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeEvent === ev.id
                    ? "bg-gradient-maroon text-white shadow-soft"
                    : "bg-white text-ink-900/60 shadow-card hover:text-primary-900 dark:bg-ink-900 dark:text-cream-100/60 dark:hover:text-gold-400"
                }`}
              >
                {ev.title}
              </button>
            ))}
          </Reveal>

          {/* Masonry grid */}
          <div className="mt-12 columns-2 gap-3 sm:columns-3 lg:columns-4">
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard
                  key={i}
                  className={`mb-3 break-inside-avoid ${i % 3 === 0 ? "h-64" : i % 3 === 1 ? "h-44" : "h-52"}`}
                />
              ))
            ) : filtered.length === 0 ? (
              <div className="col-span-full flex flex-col items-center gap-3 py-16 text-center">
                <Images className="h-10 w-10 text-ink-900/20 dark:text-cream-100/20" />
                <p className="text-ink-900/50 dark:text-cream-100/50">
                  {t("common.noData")}
                </p>
              </div>
            ) : (
              filtered.map((photo, i) => (
                <Reveal
                  key={photo.id}
                  delay={(i % 8) * 0.04}
                  className="mb-3 break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="group relative block w-full overflow-hidden rounded-2xl"
                  >
                    <FocalImage
                      src={photo.imageUrl}
                      alt={photo.title || ""}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        aspectRatio:
                          i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/3" : "1/1",
                      }}
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/60 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="text-sm font-medium text-white">
                        {photo.eventTitle}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      <Lightbox
        photos={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
