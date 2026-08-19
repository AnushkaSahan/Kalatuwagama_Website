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
    : "text-ink-900/75 hover:text-primary-900 dark:text-cream-100/75 dark:hover:text-gold-400";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent py-5"
          : "glass-nav py-3 dark:!bg-[rgba(14,8,6,0.88)]"
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105 ${
              transparent
                ? "border-white/30 bg-white/10 text-gold-300 shadow-inner"
                : "border-primary-900/15 bg-gradient-maroon text-gold-300 shadow-maroon dark:border-gold-500/30 dark:bg-primary-900/30 dark:text-gold-400"
            }`}
          >
            <TempleMark className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p
              className={`font-display text-base font-semibold tracking-wide transition-colors ${
                transparent ? "text-white" : "text-ink-900 dark:text-cream-50"
              }`}
            >
              Kalatuwagama
            </p>
            <p
              className={`text-[10px] uppercase tracking-[0.25em] ${
                transparent
                  ? "text-white/60"
                  : "text-gold-700 dark:text-gold-400/70"
              }`}
            >
              Rajamaha Viharaya
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 lg:flex">
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
                  `relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${linkColor} ${
                    isActive && !transparent
                      ? "text-primary-900 dark:text-gold-400"
                      : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {t(`nav.${item.key}`)}
                    {item.children && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openMenu === item.key ? "rotate-180" : ""}`} />}
                    {/* Active indicator */}
                    {isActive && !transparent && (
                      <span className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gradient-gold" />
                    )}
                  </>
                )}
              </NavLink>

              {/* Dropdown */}
              {item.children && openMenu === item.key && (
                <div
                  className="absolute left-1/2 top-full w-56 -translate-x-1/2 pt-3 animate-slide-down"
                  onMouseEnter={() => openWithDelay(item.key)}
                  onMouseLeave={closeWithDelay}
                >
                  <div className="overflow-hidden rounded-2xl border border-ink-900/[0.06] bg-white/95 p-1.5 shadow-deep backdrop-blur-xl dark:border-white/10 dark:bg-[#1a100c]/95">
                    {/* Dropdown gold accent top line */}
                    <div className="mx-2 mb-1.5 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.href}
                        className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-ink-900/70 transition-all duration-150 hover:bg-gradient-to-r hover:from-primary-900/5 hover:to-gold-500/5 hover:text-primary-900 dark:text-cream-100/70 dark:hover:bg-gradient-to-r dark:hover:from-gold-500/10 dark:hover:to-primary-500/5 dark:hover:text-gold-300"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500/40 transition-colors group-hover:bg-gold-500" />
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
        <div className="hidden items-center gap-2 lg:flex">
          {/* Language */}
          <button
            type="button"
            onClick={() => changeLanguage(i18n.language === "en" ? "si" : "en")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all duration-200 ${linkColor} hover:bg-black/5 dark:hover:bg-white/5`}
            title="Switch language"
          >
            <Languages className="h-4 w-4" />
            {i18n.language === "en" ? "SI" : "EN"}
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
              transparent
                ? "text-white/80 hover:bg-white/10"
                : "border border-ink-900/10 bg-ink-900/[0.04] text-ink-900/70 hover:border-gold-500/40 hover:text-gold-600 dark:border-white/10 dark:bg-white/5 dark:text-cream-100/70 dark:hover:border-gold-400/40 dark:hover:text-gold-400"
            }`}
            title="Toggle theme"
          >
            <span className="transition-all duration-300">
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </span>
          </button>

          {/* Donate button */}
          <Link
            to="/donations"
            className="relative ml-1 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold-lg"
          >
            {/* Shimmer overlay */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-shimmer opacity-0 transition-opacity group-hover:opacity-100 animate-shimmer" aria-hidden />
            <Heart className="h-4 w-4 fill-current" />
            {t("nav.donations")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 lg:hidden ${
            transparent
              ? "text-white hover:bg-white/10"
              : "border border-ink-900/10 text-ink-900 hover:bg-ink-900/5 dark:border-white/10 dark:text-cream-50 dark:hover:bg-white/5"
          }`}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-slide-down mt-2 max-h-[82vh] overflow-y-auto border-t border-ink-900/[0.06] bg-white/95 px-5 py-4 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0e0806]/95 lg:hidden">
          {/* Gold separator */}
          <div className="mb-3 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
          <nav className="flex flex-col gap-0.5">
            {NAV.map((item) => (
              <div key={item.key}>
                <Link
                  to={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-900 transition-all hover:bg-primary-900/5 dark:text-cream-50 dark:hover:bg-white/5"
                >
                  {t(`nav.${item.key}`)}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-0.5 mb-1 flex flex-col gap-0.5 border-l-2 border-gold-500/20 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.href}
                        className="rounded-lg px-3 py-2 text-sm text-ink-900/55 transition-all hover:text-primary-900 dark:text-cream-100/55 dark:hover:text-gold-300"
                      >
                        {t(`nav.${child.key}`)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-4 border-t border-ink-900/[0.06] pt-4 dark:border-white/[0.06]">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  changeLanguage(i18n.language === "en" ? "si" : "en")
                }
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-ink-900 transition-all hover:bg-ink-900/5 dark:text-cream-50 dark:hover:bg-white/5"
              >
                <Languages className="h-4 w-4" />
                {i18n.language === "en" ? "සිංහල" : "English"}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-ink-900 transition-all hover:bg-ink-900/5 dark:text-cream-50 dark:hover:bg-white/5"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {isDark ? "Light" : "Dark"}
              </button>
            </div>
            <Link
              to="/donations"
              className="btn-gold mt-3 w-full"
            >
              <Heart className="h-4 w-4 fill-current" />
              {t("nav.donations")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
