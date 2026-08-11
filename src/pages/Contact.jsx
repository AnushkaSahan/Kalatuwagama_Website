import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { sendContactMessage } from "../api/contactMessages";
import Reveal from "../components/common/Reveal";
import HeroPhoto from "../components/common/HeroPhoto";
import SectionHeading from "../components/common/SectionHeading";

const TEMPLE_LOCATION = {
  lat: 7.684082,
  lng: 80.3433217,
};

const emptyForm = { fullName: "", email: "", subject: "", message: "" };

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message");
      return;
    }
    setSubmitting(true);
    try {
      await sendContactMessage(form);
      toast.success(t("contact.sendSuccess"));
      setForm(emptyForm);
    } catch (error) {
      toast.error(t("contact.sendError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-gradient-hero pb-16 pt-32">
        <HeroPhoto />
        <div className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow border-white/30 bg-white/10 text-gold-300">{t("contact.eyebrow")}</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">{t("contact.title")}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-xl text-white/75">{t("contact.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Info + map */}
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">
                {t("contact.infoTitle")}
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  { icon: MapPin, label: t("contact.address"), value: "Kalatuwagama, Uva Province, Sri Lanka" },
                  { icon: Phone, label: t("contact.phone"), value: "+94 55 222 3344" },
                  { icon: Mail, label: t("contact.email2"), value: "info@kalatuwagama.lk" },
                  { icon: MessageCircle, label: t("contact.whatsapp"), value: "+94 77 123 4567" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 rounded-2xl border border-ink-900/5 bg-white p-4 shadow-card dark:border-white/10 dark:bg-ink-900">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/45 dark:text-cream-100/45">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-medium text-ink-900 dark:text-cream-50">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl shadow-card">
                <iframe
                  title="Temple location"
                  src={`https://www.google.com/maps?q=${TEMPLE_LOCATION.lat},${TEMPLE_LOCATION.lng}&hl=en&z=15&output=embed`}
                  className="h-64 w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-ink-900/5 bg-white p-8 shadow-card dark:border-white/10 dark:bg-ink-900 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">
                {t("contact.formTitle")}
              </h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-900/70 dark:text-cream-100/70">
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder={t("contact.namePlaceholder")}
                      className="w-full rounded-xl border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-primary-900 focus:ring-primary-900 dark:border-white/10 dark:bg-white/5 dark:text-cream-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink-900/70 dark:text-cream-100/70">
                      {t("contact.email")}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder={t("contact.emailPlaceholder")}
                      className="w-full rounded-xl border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-primary-900 focus:ring-primary-900 dark:border-white/10 dark:bg-white/5 dark:text-cream-50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-900/70 dark:text-cream-100/70">
                    {t("contact.subject")}
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={t("contact.subjectPlaceholder")}
                    className="w-full rounded-xl border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-primary-900 focus:ring-primary-900 dark:border-white/10 dark:bg-white/5 dark:text-cream-50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink-900/70 dark:text-cream-100/70">
                    {t("contact.message")}
                  </label>
                  <textarea
                    rows="5"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full rounded-xl border-ink-900/10 bg-cream-50 px-4 py-3 text-sm outline-none focus:border-primary-900 focus:ring-primary-900 dark:border-white/10 dark:bg-white/5 dark:text-cream-50"
                    required
                  />
                </div>
                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  <Send className="h-4 w-4" />
                  {submitting ? t("common.loading") : t("common.send")}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
