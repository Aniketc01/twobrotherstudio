const items = ["Awwwards SOTD", "CSS Design Awards", "Behance Featured", "FWA Honourable", "Made in India", "Worldwide Clients"];

export function Marquee() {
  return (
    <section className="border-y border-white/5 py-8 overflow-hidden">
      <div className="flex w-max animate-marquee gap-16 whitespace-nowrap pr-16">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-display text-2xl tracking-tight text-muted-foreground md:text-4xl">
            {t} <span className="ml-16 text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
