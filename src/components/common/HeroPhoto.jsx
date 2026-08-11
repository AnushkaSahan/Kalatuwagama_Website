// The photograph lives on the document itself, so every route shares the
// same uninterrupted view. This layer only gives hero copy a cinematic tint.
export default function HeroPhoto() {
  return <div aria-hidden="true" className="site-hero-tint" />;
}
