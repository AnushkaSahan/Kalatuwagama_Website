import TempleMark from "./TempleMark";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-gradient-hero">
      <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl border border-gold-500/40 bg-white/5 text-gold-400">
        <TempleMark className="h-8 w-8" />
      </div>
      <p className="font-display text-sm tracking-[0.3em] text-white/70">
        KALATUWAGAMA
      </p>
    </div>
  );
}
