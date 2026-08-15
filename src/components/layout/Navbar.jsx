import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Languages,
  Heart,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { changeLanguage } from "../../i18n";
import TempleMark from "../common/TempleMark";

const NAV = [
  { key: "home", href: "/" },
  {
    key: "temple",
    href: "/temple",
    children: [
      { key: "history", href: "/temple#history" },
      { key: "chiefMonk", href: "/temple#chief-monk" },
      { key: "residentMonks", href: "/temple#monks" },
      { key: "services", href: "/temple#services" },
      { key: "temple_gallery", href: "/temple#gallery" },
    ],
  },
  {
    key: "dahamPasala",
    href: "/daham-pasala",
    children: [
      { key: "introduction", href: "/daham-pasala#intro" },
      { key: "teachers", href: "/daham-pasala#teachers" },
      { key: "dp_events", href: "/daham-pasala#events" },
      { key: "dp_gallery", href: "/daham-pasala#gallery" },
    ],
  },
  {
    key: "foundation",
    href: "/foundation",
    children: [
      { key: "projects", href: "/foundation#projects" },
      { key: "bloodDonation", href: "/foundation#blood" },
      { key: "education", href: "/foundation#education" },
      { key: "volunteer", href: "/foundation#volunteer" },
    ],
  },
  { key: "gallery", href: "/gallery" },
  { key: "events", href: "/events" },
  { key: "contact", href: "/contact" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimer = useRef(null);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const openWithDelay = (key) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const closeWithDelay = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const linkColor = transparent
    ? "text-white/90 hover:text-white"
    : "text-ink-900/80 hover:text-primary-900 dark:text-cream-100/80 dark:hover:text-gold-400";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent py-5"
          : "bg-white py-3 shadow-soft backdrop-blur-md dark:bg-black"
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
              transparent
                ? "border-white/30 bg-white/10 text-gold-300"
                : "border-primary-900/15 bg-primary-900/5 text-primary-900 dark:border-gold-500/30 dark:bg-gold-500/10 dark:text-gold-400"
            }`}
          >
            <TempleMark className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p
              className={`font-display text-base font-semibold tracking-wide ${
                transparent ? "text-white" : "text-ink-900 dark:text-cream-50"
              }`}
            >
              Kalatuwagama
            </p>
            <p
              className={`text-[10px] uppercase tracking-[0.25em] ${
                transparent
                  ? "text-white/60"
                  : "text-ink-900/50 dark:text-cream-100/50"
              }`}
            >
              Rajamaha Viharaya
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div
              key={item.key}
              className="relative"
              onMouseEnter={() => item.children && openWithDelay(item.key)}
              onMouseLeave={() => item.children && closeWithDelay()}
            >
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${linkColor} ${
                    isActive && !transparent
                      ? "text-primary-900 dark:text-gold-400"
                      : ""
                  }`
                }
              >
                {t(`nav.${item.key}`)}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </NavLink>

              {item.children && openMenu === item.key && (
                <div
                  className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                  onMouseEnter={() => openWithDelay(item.key)}
                  onMouseLeave={closeWithDelay}
                >
                  <div className="overflow-hidden rounded-2xl border border-ink-900/5 bg-white p-2 shadow-soft dark:border-white/10 dark:bg-ink-900">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.href}
                        className="block rounded-xl px-4 py-2.5 text-sm text-ink-900/75 transition-colors hover:bg-primary-900/5 hover:text-primary-900 dark:text-cream-100/75 dark:hover:bg-gold-500/10 dark:hover:text-gold-400"
                      >
                        {t(`nav.${child.key}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right controls */}
        <div className="hidden items-center gap-1.5 lg:flex">
          <button
            type="button"
            onClick={() => changeLanguage(i18n.language === "en" ? "si" : "en")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${linkColor}`}
            title="Switch language"
          >
            <Languages className="h-4 w-4" />
            {i18n.language === "en" ? "SI" : "EN"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-full p-2 transition-colors ${linkColor}`}
            title="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <Link
            to="/donations"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            <Heart className="h-4 w-4" />
            {t("nav.donations")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={`rounded-full p-2 lg:hidden ${
            transparent ? "text-white" : "text-ink-900 dark:text-cream-50"
          }`}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mt-3 max-h-[80vh] overflow-y-auto border-t border-ink-900/5 bg-white px-5 py-4 dark:border-white/10 dark:bg-black lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <div key={item.key}>
                <Link
                  to={item.href}
                  className="block rounded-xl px-3 py-2.5 text-base font-medium text-ink-900 dark:text-cream-50"
                >
                  {t(`nav.${item.key}`)}
                </Link>
                {item.children && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-ink-900/10 pl-3 dark:border-white/10">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.href}
                        className="rounded-lg px-3 py-2 text-sm text-ink-900/60 dark:text-cream-100/60"
                      >
                        {t(`nav.${child.key}`)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between border-t border-ink-900/5 pt-4 dark:border-white/10">
            <button
              type="button"
              onClick={() =>
                changeLanguage(i18n.language === "en" ? "si" : "en")
              }
              className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 dark:text-cream-50"
            >
              <Languages className="h-4 w-4" />
              {i18n.language === "en" ? "සිංහල" : "English"}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-sm font-semibold text-ink-900 dark:text-cream-50"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {isDark ? "Light" : "Dark"}
            </button>
          </div>
          <Link to="/donations" className="btn-gold mt-4 w-full">
            <Heart className="h-4 w-4" />
            {t("nav.donations")}
          </Link>
        </div>
      )}
    </header>
  );
}
