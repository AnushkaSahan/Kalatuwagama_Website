import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import TempleMark from "../components/common/TempleMark";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-cream-50 px-6 py-16 dark:bg-[#0e0806]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.06] blur-3xl dark:bg-gold-500/[0.08]" />

      <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        {/* Card */}
        <div className="relative w-full overflow-hidden rounded-4xl border border-ink-900/[0.06] bg-white p-10 shadow-deep dark:border-white/[0.07] dark:bg-[#18100d] sm:p-14">
          {/* Gold top line */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-gold opacity-60" />

          {/* Temple icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-maroon text-gold-300 shadow-glow-maroon">
            <TempleMark className="h-10 w-10" />
          </div>

          {/* 404 */}
          <p className="mt-7 font-display text-8xl font-bold text-gradient-gold leading-none">
            404
          </p>

          {/* Divider */}
          <div className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-gradient-gold opacity-40" />

          <p className="mt-5 text-base text-ink-900/58 dark:text-cream-100/58">
            {t("notFound.message")}
          </p>

          <Link to="/" className="btn-primary mt-8 inline-flex">
            <Home className="h-4 w-4" />
            {t("common.backHome")}
          </Link>
        </div>
      </div>
    </section>
  );
}
