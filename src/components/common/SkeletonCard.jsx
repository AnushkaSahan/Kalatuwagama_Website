export default function SkeletonCard({ className = "h-64" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-ink-900/5 dark:bg-white/5 ${className}`}
    />
  );
}
