import TempleMark from "./TempleMark";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-gradient-hero">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      {/* Spinning outer ring */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-2 border-gold-500/20 animate-ping" />
        <div className="absolute inset-[-8px] rounded-full border border-gold-500/10 animate-spin-slow" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-gold-500/40 bg-white/[0.07] text-gold-400 shadow-glow-gold backdrop-blur-sm animate-glow-pulse">
          <TempleMark className="h-9 w-9" />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2">
        <p className="font-display text-sm tracking-[0.35em] text-white/80">
          KALATUWAGAMA
        </p>
        <p className="text-[10px] tracking-[0.2em] text-gold-400/60 uppercase">
          Rajamaha Viharaya
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-gold-500/60"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
