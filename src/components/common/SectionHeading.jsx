import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";
  return (
    <Reveal>
      <div className={`flex flex-col ${alignment} gap-4`}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2
          className={`font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem] ${
            light ? "text-white" : "text-ink-900 dark:text-cream-50"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
              light ? "text-white/80" : "text-ink-900/60 dark:text-cream-100/70"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
