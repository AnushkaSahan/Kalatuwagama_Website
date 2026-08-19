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
      <div className={`flex flex-col ${alignment} gap-3`}>
        {eyebrow && (
          <span className={`eyebrow ${light ? "border-white/30 bg-white/10 !text-gold-300" : ""}`}>
            {eyebrow}
          </span>
        )}
        <h2
          className={`font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem] ${
            light ? "text-white" : "text-ink-900 dark:text-cream-50"
          }`}
        >
          {title}
        </h2>
        {/* Decorative gold underline */}
        <div className={`flex ${align === "left" ? "justify-start" : "justify-center"}`}>
          <div className="h-0.5 w-14 rounded-full bg-gradient-gold opacity-60" />
        </div>
        {subtitle && (
          <p
            className={`max-w-2xl text-base leading-relaxed sm:text-lg ${
              light ? "text-white/75" : "text-ink-900/58 dark:text-cream-100/65"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
