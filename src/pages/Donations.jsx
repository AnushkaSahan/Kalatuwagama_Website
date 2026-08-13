import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Landmark, Copy, Check, Globe2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { getDonationInfos } from "../api/donationInfo";
import Reveal from "../components/common/Reveal";
import HeroPhoto from "../components/common/HeroPhoto";
import SectionHeading from "../components/common/SectionHeading";
import SkeletonCard from "../components/common/SkeletonCard";

export default function Donations() {
  const { t } = useTranslation();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDonationInfos();
        setAccounts(res.data || []);
      } catch (e) {
        /* graceful empty state */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.accountNumber);
      setCopiedId(item.id);
      toast.success(t("donations.copied"));
      setTimeout(() => setCopiedId(null), 1500);
    } catch (e) {
      toast.error("Couldn't copy — please copy manually");
    }
  };

  return (
    <div>
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-gradient-hero pb-16 pt-32">
        <HeroPhoto />
        <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-wide relative text-center">
          <Reveal>
            <span className="eyebrow border-white/30 bg-white/10 text-gold-300">
              {t("donations.eyebrow")}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
              {t("donations.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              {t("donations.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-wide">
          <SectionHeading
            eyebrow={t("donations.bankTitle")}
            title={t("donations.bankTitle")}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {loading ? (
              [1, 2].map((i) => <SkeletonCard key={i} className="h-64" />)
            ) : accounts.length === 0 ? (
              <p className="col-span-full text-center text-ink-900/50 dark:text-cream-100/50">
                {t("common.noData")}
              </p>
            ) : (
              accounts.map((acc, i) => (
                <Reveal key={acc.id} delay={i * 0.1}>
                  <div className="flex flex-col overflow-hidden rounded-3xl border border-ink-900/5 bg-white shadow-card dark:border-white/10 dark:bg-ink-900 sm:flex-row">
                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-maroon text-white">
                          <Landmark className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-display text-lg font-semibold text-ink-900 dark:text-cream-50">
                            {acc.bankName}
                          </p>
                          <p className="text-sm text-ink-900/55 dark:text-cream-100/55">
                            {acc.accountName}
                            {acc.branch ? ` · ${acc.branch}` : ""}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between rounded-xl bg-cream-100 px-4 py-3 dark:bg-white/5">
                        <span className="font-mono text-base tracking-wide text-ink-900 dark:text-cream-50">
                          {acc.accountNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(acc)}
                          className="rounded-lg p-2 text-ink-900/50 transition-colors hover:bg-white hover:text-primary-900 dark:text-cream-100/50 dark:hover:bg-white/10 dark:hover:text-gold-400"
                          title={t("donations.copyAccount")}
                        >
                          {copiedId === acc.id ? (
                            <Check className="h-4 w-4 text-leaf-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    {acc.qrImage && (
                      <div className="flex w-full items-center justify-center bg-cream-100 p-6 dark:bg-white/5 sm:w-44">
                        <img
                          src={acc.qrImage}
                          alt="Scan to donate QR code"
                          className="h-32 w-32 rounded-xl object-cover shadow-soft"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              ))
            )}
          </div>

          <Reveal delay={0.15} className="mt-10">
            <div className="rounded-3xl border border-ink-900/5 bg-cream-100/60 p-8 dark:border-white/10 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Globe2 className="h-6 w-6 text-primary-900 dark:text-gold-400" />
                <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-cream-50">
                  {t("donations.intlTitle")}
                </h3>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-900/60 dark:text-cream-100/60">
                {t("donations.intlText")}
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.2}
            className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-900/45 dark:text-cream-100/45"
          >
            <ShieldCheck className="h-4 w-4 text-leaf-500" />
            All contributions are used solely for temple, Daham Pasala and
            foundation activities.
          </Reveal>
        </div>
      </section>
    </div>
  );
}
