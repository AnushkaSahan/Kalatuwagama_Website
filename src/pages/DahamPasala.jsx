import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraduationCap, BookOpen, Users } from "lucide-react";
import { getTeachers } from "../api/teachers";
import { getEvents } from "../api/events";
import { getGalleryItems } from "../api/gallery";
import Reveal from "../components/common/Reveal";
import HeroPhoto from "../components/common/HeroPhoto";
import SectionHeading from "../components/common/SectionHeading";
import EventCard from "../components/common/EventCard";
import FocalImage from "../components/common/FocalImage";
import SkeletonCard from "../components/common/SkeletonCard";
import Lightbox from "../components/common/Lightbox";

const CLASSES = [
  { grade: "Primary (Grade 1-3)", time: "8:30 AM - 9:30 AM", focus: "Buddhist stories, basic precepts, chanting" },
  { grade: "Junior (Grade 4-6)", time: "8:30 AM - 10:00 AM", focus: "Life of the Buddha, Jataka tales, discipline" },
  { grade: "Senior (Grade 7-9)", time: "9:00 AM - 10:30 AM", focus: "Dhamma philosophy, meditation basics" },
  { grade: "Advanced (Grade 10+)", time: "9:00 AM - 11:00 AM", focus: "Exam preparation, Abhidhamma introduction" },
];

export default function DahamPasala() {
  const { t } = useTranslation();
  const [teachers, setTeachers] = useState([]);
  const [events, setEvents] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [teachersRes, eventsRes, galleryRes] = await Promise.all([
          getTeachers(),
          getEvents(),
          getGalleryItems(),
        ]);
        setTeachers(teachersRes.data || []);
        const now = Date.now();
        setEvents(
          (eventsRes.data || [])
            .filter((e) => new Date(e.eventDate || e.date).getTime() >= now)
            .slice(0, 3),
        );
        setPhotos((galleryRes.data || []).slice(0, 8));
      } catch (e) {
        /* graceful empty states */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-gradient-hero pb-16 pt-32">
        <HeroPhoto />
        <div className="pointer-events-none absolute -left-24 top-16 h-96 w-96 rounded-full bg-leaf-500/10 blur-3xl" />
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow border-white/30 bg-white/10 text-gold-300">{t("dahamPasala.eyebrow")}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
              {t("dahamPasala.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-white/75">{t("dahamPasala.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section id="intro" className="section-pad scroll-mt-24">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow={t("nav.introduction")} title={t("dahamPasala.introTitle")} />
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-900/60 dark:text-cream-100/60">
              Every Sunday morning, children from across Kalatuwagama gather at Sri Gunarathana Daham Pasala
              to learn the teachings of the Buddha. Through storytelling, chanting, discussion and gentle
              guidance, our teachers nurture both knowledge and character — helping students carry these
              values into everyday life.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-ink-900 dark:text-cream-50">
                    250+
                  </p>
                  <p className="text-xs text-ink-900/50 dark:text-cream-100/50">{t("dahamPasala.studentsText")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-ink-900 dark:text-cream-50">
                    {teachers.length || "—"}
                  </p>
                  <p className="text-xs text-ink-900/50 dark:text-cream-100/50">Dedicated teachers</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
              {photos[0]?.imageUrl ? (
                <FocalImage src={photos[0].imageUrl} alt="Daham Pasala" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-maroon text-white/30">
                  <BookOpen className="h-14 w-14" />
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="teachers" className="section-pad scroll-mt-24 bg-cream-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading eyebrow={t("nav.teachers")} title={t("dahamPasala.teachersTitle")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              [1, 2, 3, 4].map((i) => <SkeletonCard key={i} className="h-56" />)
            ) : teachers.length === 0 ? (
              <p className="col-span-full text-center text-ink-900/50 dark:text-cream-100/50">{t("common.noData")}</p>
            ) : (
              teachers.map((teacher, i) => (
                <Reveal key={teacher.id} delay={i * 0.07}>
                  <div className="flex flex-col items-center rounded-2xl border border-ink-900/5 bg-white p-6 text-center shadow-card dark:border-white/10 dark:bg-ink-900">
                    {teacher.imageUrl ? (
                      <FocalImage
                        src={teacher.imageUrl}
                        alt={teacher.name}
                        className="h-20 w-20 rounded-full object-cover ring-2 ring-gold-500/20"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-maroon text-xl font-semibold text-white">
                        {teacher.name?.charAt(0)}
                      </div>
                    )}
                    <p className="mt-4 font-display text-base font-semibold text-ink-900 dark:text-cream-50">
                      {teacher.name}
                    </p>
                    {teacher.position && (
                      <p className="mt-1 text-xs font-medium text-gold-600 dark:text-gold-400">{teacher.position}</p>
                    )}
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading eyebrow={t("nav.classes")} title={t("dahamPasala.classesTitle")} />
          <div className="mt-12 overflow-hidden rounded-3xl border border-ink-900/5 shadow-card dark:border-white/10">
            {CLASSES.map((c, i) => (
              <Reveal key={c.grade} delay={i * 0.06}>
                <div
                  className={`flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between ${
                    i % 2 === 0 ? "bg-white dark:bg-ink-900" : "bg-cream-100/60 dark:bg-white/[0.02]"
                  }`}
                >
                  <div>
                    <p className="font-display text-base font-semibold text-ink-900 dark:text-cream-50">
                      {c.grade}
                    </p>
                    <p className="mt-0.5 text-sm text-ink-900/55 dark:text-cream-100/55">{c.focus}</p>
                  </div>
                  <span className="w-fit rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold text-gold-700 dark:text-gold-400">
                    {c.time}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      {(loading || events.length > 0) && (
        <section id="events" className="section-pad scroll-mt-24 bg-cream-100/60 dark:bg-white/[0.02]">
          <div className="container-wide">
            <SectionHeading eyebrow={t("nav.dp_events")} title={t("dahamPasala.eventsTitle")} />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading
                ? [1, 2, 3].map((i) => <SkeletonCard key={i} className="h-80" />)
                : events.map((event, i) => (
                    <Reveal key={event.id} delay={i * 0.1}>
                      <EventCard event={event} />
                    </Reveal>
                  ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      <section id="gallery" className="section-pad scroll-mt-24">
        <div className="container-wide">
          <SectionHeading eyebrow={t("nav.dp_gallery")} title={t("dahamPasala.galleryTitle")} />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} className="aspect-square" />)
              : photos.map((photo, i) => (
                  <Reveal key={photo.id} delay={i * 0.04} className="aspect-square">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="group h-full w-full overflow-hidden rounded-2xl"
                    >
                      <FocalImage
                        src={photo.imageUrl}
                        alt={photo.title || ""}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
