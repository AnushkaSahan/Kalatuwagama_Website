import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import TempleMark from "../components/common/TempleMark";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <section className="flex min-h-[70vh] items-center bg-cream-50/60 px-6 py-16 transition-colors dark:bg-white/[0.02]">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-3xl border border-ink-900/5 bg-white p-8 text-center shadow-card transition-colors dark:border-white/10 dark:bg-ink-900 sm:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-900/5 text-primary-900 dark:bg-gold-500/10 dark:text-gold-400">
          <TempleMark className="h-8 w-8" />
        </div>
        <p className="mt-5 font-display text-6xl font-semibold text-primary-900 dark:text-gold-400">
          404
        </p>
        <p className="mt-3 text-ink-900/60 dark:text-cream-100/60">
          {t("notFound.message")}
        </p>
        <Link to="/" className="btn-primary mt-7">
          <Home className="h-4 w-4" />
          {t("common.backHome")}
        </Link>
      </div>
    </section>
  );
}
