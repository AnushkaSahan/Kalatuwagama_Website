import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import TempleMark from "../common/TempleMark";

const SocialFacebook = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);
const SocialYoutube = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5l6.3 3.5-6.3 3.5Z" />
  </svg>
);
const SocialInstagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const TEMPLE_LOCATION = {
  lat: 7.684082,
  lng: 80.3433217,
  mapsUrl:
    "https://www.google.com/maps/place/Kalatuwagama+Rajamaha+Viharaya/@7.6818222,80.3455656,16.39z/data=!4m6!3m5!1s0x3afccd9e032d990b:0x6bf2ed7b00e69166!8m2!3d7.684082!4d80.3433217",
};

const QUICK_LINKS = [
  { key: "home", href: "/" },
  { key: "temple", href: "/temple" },
  { key: "dahamPasala", href: "/daham-pasala" },
  { key: "foundation", href: "/foundation" },
  { key: "gallery", href: "/gallery" },
  { key: "events", href: "/events" },
  { key: "donations", href: "/donations" },
  { key: "contact", href: "/contact" },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="container-wide relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/40 bg-white/5 text-gold-400">
              <TempleMark className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold">Kalatuwagama</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                Rajamaha Viharaya
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            {t("footer.about")}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[SocialFacebook, SocialYoutube, SocialInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all hover:border-gold-400 hover:text-gold-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            {t("footer.quickLinks")}
          </p>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.href}
                  className="text-sm text-white/65 transition-colors hover:text-white"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            {t("footer.contactInfo")}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              {t("footer.address")}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" />
              +94 55 222 3344
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              info@kalatuwagama.lk
            </li>
          </ul>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-gold-400">
            {t("footer.emergency")}
          </p>
          <p className="mt-2 text-sm text-white/65">
            Temple Office: +94 55 222 3344
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            {t("home.mapTitle")}
          </p>
          <a
            href={TEMPLE_LOCATION.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block overflow-hidden rounded-2xl border border-white/10 transition-opacity hover:opacity-90"
          >
            <iframe
              title="Temple location"
              src={`https://www.google.com/maps?q=${TEMPLE_LOCATION.lat},${TEMPLE_LOCATION.lng}&hl=en&z=15&output=embed`}
              className="h-40 w-full grayscale"
              style={{ border: 0, pointerEvents: "none" }}
              loading="lazy"
            />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} Kalatuwagama Rajamaha Viharaya. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-1.5">
            Made by{" "}
            <a
              href="https://anushkasahan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-gold-400"
            >
              Anushka Sahan
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
