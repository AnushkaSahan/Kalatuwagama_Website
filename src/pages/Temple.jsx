import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Sunrise, Sunset, Sparkles, Landmark } from "lucide-react";
import { getTempleHistories } from "../api/templeHistory";
import { getMonks } from "../api/monks";
import { getGalleryItems } from "../api/gallery";
import Reveal from "../components/common/Reveal";
import HeroPhoto from "../components/common/HeroPhoto";
import SectionHeading from "../components/common/SectionHeading";
import FocalImage from "../components/common/FocalImage";
import SkeletonCard from "../components/common/SkeletonCard";
import Lightbox from "../components/common/Lightbox";

const SERVICES = [
  {
    title: "Pirith Chanting",
    desc: "Protective chanting sessions held for devotees seeking blessings and peace.",
  },
  {
    title: "Bodhi Pooja",
    desc: "Weekly offerings at the sacred Bodhi tree, open to the whole community.",
  },
  {
    title: "Dhamma Sermons",
    desc: "Monthly sermons from resident and visiting monks on the Buddha's teachings.",
  },
  {
    title: "Funeral Rites",
    desc: "Traditional almsgiving and funeral rites conducted with care and dignity.",
  },
];

export default function Temple() {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [monks, setMonks] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const [h, m, g] = await Promise.all([
          getTempleHistories(),
          getMonks(),
          getGalleryItems(),
        ]);
        setHistory(h.data || []);
        setMonks(m.data || []);
        setPhotos((g.data || []).slice(0, 9));
      } catch (e) {
        /* graceful empty states below */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const chiefMonk =
    monks.find(
      (m) =>
        m.position?.toLowerCase().includes("chief") ||
        m.position?.toLowerCase().includes("incumbent"),
    ) || monks[0];
  const residentMonks = monks.filter((m) => m.id !== chiefMonk?.id);

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-hero pb-16 pt-32">
        <HeroPhoto />

        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="container-wide relative text-center">
          <Reveal>
            <span className="eyebrow border-white/30 bg-white/10 text-gold-300">
              {t("temple.eyebrow")}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
              {t("temple.title")}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              {t("temple.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* HISTORY */}
      <section id="history" className="section-pad scroll-mt-24">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("home.historyEyebrow")}
            title={t("temple.historyTitle")}
          />
          <div className="mt-14 space-y-16">
            {loading ? (
              <SkeletonCard className="h-72" />
            ) : history.length === 0 ? (
              <p className="text-center text-ink-900/50 dark:text-cream-100/50">
                {t("common.noData")}
              </p>
            ) : (
              history.map((item, i) => (
                <Reveal key={item.id}>
                  <div
                    className={`grid items-center gap-10 lg:grid-cols-2 ${
                      i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft">
                      {item.imageUrl ? (
                        <FocalImage
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-maroon text-white/30">
                          <Landmark className="h-14 w-14" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">
                        {item.title}
                      </h3>
                      <p className="mt-4 leading-relaxed text-ink-900/60 dark:text-cream-100/60">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CHIEF MONK + RESIDENT MONKS */}
      <section
        id="chief-monk"
        className="section-pad scroll-mt-24 bg-cream-100/60 dark:bg-white/[0.02]"
      >
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("nav.chiefMonk")}
            title={t("temple.chiefMonkTitle")}
          />
          <div className="mt-12">
            {loading ? (
              <SkeletonCard className="mx-auto h-64 max-w-md" />
            ) : chiefMonk ? (
              <Reveal>
                <div className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-ink-900/5 bg-white p-10 text-center shadow-card dark:border-white/10 dark:bg-ink-900">
                  {chiefMonk.imageUrl ? (
                    <FocalImage
                      src={chiefMonk.imageUrl}
                      alt={chiefMonk.name}
                      className="h-32 w-32 rounded-full object-cover ring-4 ring-gold-500/20"
                    />
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-maroon text-3xl font-semibold text-white ring-4 ring-gold-500/20">
                      {chiefMonk.name?.charAt(0)}
                    </div>
                  )}
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">
                    {chiefMonk.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold-600 dark:text-gold-400">
                    {chiefMonk.position || "Chief Incumbent"}
                  </p>
                  {chiefMonk.biography && (
                    <p className="mt-4 text-sm leading-relaxed text-ink-900/60 dark:text-cream-100/60">
                      {chiefMonk.biography}
                    </p>
                  )}
                </div>
              </Reveal>
            ) : (
              <p className="text-center text-ink-900/50 dark:text-cream-100/50">
                {t("common.noData")}
              </p>
            )}
          </div>

          {residentMonks.length > 0 && (
            <div id="monks" className="scroll-mt-24">
              <div className="mt-20">
                <SectionHeading
                  eyebrow={t("nav.residentMonks")}
                  title={t("temple.monksTitle")}
                />
              </div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {residentMonks.map((monk, i) => (
                  <Reveal key={monk.id} delay={i * 0.06}>
                    <div className="flex items-center gap-4 rounded-2xl border border-ink-900/5 bg-white p-5 shadow-card dark:border-white/10 dark:bg-ink-900">
                      {monk.imageUrl ? (
                        <FocalImage
                          src={monk.imageUrl}
                          alt={monk.name}
                          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-gold-500/20"
                        />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-maroon text-lg font-semibold text-white">
                          {monk.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-display text-base font-semibold text-ink-900 dark:text-cream-50">
                          {monk.name}
                        </p>
                        {monk.position && (
                          <p className="text-xs font-medium text-gold-600 dark:text-gold-400">
                            {monk.position}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-pad scroll-mt-24">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("nav.services")}
            title={t("temple.servicesTitle")}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-ink-900/5 bg-white p-6 shadow-card dark:border-white/10 dark:bg-ink-900">
                  <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-50">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-900/55 dark:text-cream-100/55">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10" delay={0.2}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl bg-gradient-maroon p-6 text-white shadow-soft">
                <Sunrise className="h-8 w-8 text-gold-300" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    {t("temple.poojaMorning")}
                  </p>
                  <p className="font-display text-xl font-semibold">5:30 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-gradient-maroon p-6 text-white shadow-soft">
                <Sunset className="h-8 w-8 text-gold-300" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    {t("temple.poojaEvening")}
                  </p>
                  <p className="font-display text-xl font-semibold">6:30 PM</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-ink-900/50 dark:text-cream-100/50">
              {t("temple.poojaNote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="section-pad scroll-mt-24 bg-cream-100/60 dark:bg-white/[0.02]"
      >
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("nav.temple_gallery")}
            title={t("temple.galleryTitle")}
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} className="aspect-square" />
                ))
              : photos.map((photo, i) => (
                  <Reveal
                    key={photo.id}
                    delay={i * 0.04}
                    className="aspect-square"
                  >
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
