import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import TempleMark from "../components/common/TempleMark";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-900/5 text-primary-900 dark:bg-gold-500/10 dark:text-gold-400">
        <TempleMark className="h-8 w-8" />
      </div>
      <p className="font-display text-6xl font-semibold text-primary-900 dark:text-gold-400">404</p>
      <p className="text-ink-900/60 dark:text-cream-100/60">This page could not be found.</p>
      <Link to="/" className="btn-primary">
        <Home className="h-4 w-4" />
        {t("common.backHome")}
      </Link>
    </div>
  );
}
