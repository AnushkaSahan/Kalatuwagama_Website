import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Droplet, GraduationCap, HeartHandshake, HandHeart, Send } from "lucide-react";
import toast from "react-hot-toast";
import { getFoundationProjects } from "../api/foundationProjects";
import { getGalleryItems } from "../api/gallery";
import { sendContactMessage } from "../api/contactMessages";
import Reveal from "../components/common/Reveal";
import HeroPhoto from "../components/common/HeroPhoto";
import SectionHeading from "../components/common/SectionHeading";
import FocalImage from "../components/common/FocalImage";
import SkeletonCard from "../components/common/SkeletonCard";
import Lightbox from "../components/common/Lightbox";

export default function Foundation() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const [volunteer, setVolunteer] = useState({ fullName: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [projectsRes, galleryRes] = await Promise.all([
          getFoundationProjects(),
          getGalleryItems(),
        ]);
        setProjects(projectsRes.data || []);
        setPhotos((galleryRes.data || []).slice(0, 8));
      } catch (e) {
        /* graceful empty states */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    if (!volunteer.fullName.trim() || !volunteer.email.trim()) {
      toast.error("Please fill in your name and email");
      return;
    }
    setSubmitting(true);
    try {
      await sendContactMessage({
        fullName: volunteer.fullName,
        email: volunteer.email,
        subject: "Volunteer Registration",
        message: volunteer.message || "I would like to volunteer with the foundation.",
      });
      toast.success("Thank you for signing up — we'll be in touch soon!");
      setVolunteer({ fullName: "", email: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-gradient-hero pb-16 pt-32">
        <HeroPhoto />
        <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-leaf-500/10 blur-3xl" />
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow border-white/30 bg-white/10 text-gold-300">{t("foundation.eyebrow")}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
              {t("foundation.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-white/75">{t("foundation.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section-pad scroll-mt-24">
        <div className="container-wide">
          <SectionHeading eyebrow={t("nav.projects")} title={t("foundation.projectsTitle")} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              [1, 2, 3].map((i) => <SkeletonCard key={i} className="h-72" />)
            ) : projects.length === 0 ? (
              <p className="col-span-full text-center text-ink-900/50 dark:text-cream-100/50">{t("common.noData")}</p>
            ) : (
              projects.map((project, i) => (
                <Reveal key={project.id} delay={i * 0.08}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-900/5 bg-white shadow-card dark:border-white/10 dark:bg-ink-900">
                    <div className="relative h-44 w-full overflow-hidden bg-ink-900/5 dark:bg-white/5">
                      {project.imageUrl ? (
                        <FocalImage src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-maroon text-white/30">
                          <HeartHandshake className="h-10 w-10" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-50">
                        {project.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-900/55 line-clamp-3 dark:text-cream-100/55">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* BLOOD DONATION + EDUCATION */}
      <section id="blood" className="section-pad scroll-mt-24 bg-cream-100/60 dark:bg-white/[0.02]">
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl bg-gradient-maroon p-8 text-white shadow-soft sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-red-300">
                <Droplet className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">{t("foundation.bloodTitle")}</h3>
              <p className="mt-3 flex-1 text-white/70">{t("foundation.bloodText")}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div id="education" className="flex h-full scroll-mt-24 flex-col rounded-3xl border border-ink-900/5 bg-white p-8 shadow-card dark:border-white/10 dark:bg-ink-900 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">
                {t("foundation.eduTitle")}
              </h3>
              <p className="mt-3 flex-1 text-ink-900/60 dark:text-cream-100/60">{t("foundation.eduText")}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section id="volunteer" className="section-pad scroll-mt-24">
        <div className="container-wide grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow={t("nav.volunteer")} title={t("foundation.volunteerTitle")} />
            <p className="mt-6 max-w-md text-ink-900/60 dark:text-cream-100/60">{t("foundation.volunteerText")}</p>
            <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-600">
              <HandHeart className="h-7 w-7" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <form
              onSubmit={handleVolunteerSubmit}
              className="rounded-3xl border border-ink-900/5 bg-white p-8 shadow-card dark:border-white/10 dark:bg-ink-900"
            >
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={volunteer.fullName}
                  onChange={(e) => setVolunteer({ ...volunteer, fullName: e.target.value })}
                  className="w-full rounded-xl border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-primary-900 focus:ring-primary-900 dark:border-white/10 dark:bg-white/5 dark:text-cream-50"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={volunteer.email}
                  onChange={(e) => setVolunteer({ ...volunteer, email: e.target.value })}
                  className="w-full rounded-xl border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-primary-900 focus:ring-primary-900 dark:border-white/10 dark:bg-white/5 dark:text-cream-50"
                  required
                />
                <textarea
                  placeholder="How would you like to help?"
                  rows="3"
                  value={volunteer.message}
                  onChange={(e) => setVolunteer({ ...volunteer, message: e.target.value })}
                  className="w-full rounded-xl border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-primary-900 focus:ring-primary-900 dark:border-white/10 dark:bg-white/5 dark:text-cream-50"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full">
                <Send className="h-4 w-4" />
                {submitting ? "Sending..." : t("foundation.volunteerCta")}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad bg-cream-100/60 dark:bg-white/[0.02]">
        <div className="container-wide">
          <SectionHeading title={t("foundation.galleryTitle")} />
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
