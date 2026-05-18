const socials = ["Instagram", "Twitter", "Behance", "Dribbble", "LinkedIn"];
const sitemap = ["Work", "Services", "Studio", "Process", "Contact"];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-6 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <h3 className="font-display text-balance text-[clamp(3.5rem,14vw,14rem)] font-medium leading-[0.85] tracking-[-0.05em] text-gradient">
          2Brother<br />Studio.
        </h3>

        <div className="mt-20 grid gap-12 border-t border-white/8 pt-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Studio</div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A small studio of two brothers and a tight crew — building cinematic websites,
              brands and content for modern companies worldwide.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Sitemap</div>
            <ul className="mt-4 space-y-2 text-sm">
              {sitemap.map(s => (
                <li key={s}><a href={`#${s.toLowerCase()}`} className="story-link transition-colors hover:text-accent">{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Connect</div>
            <ul className="mt-4 space-y-2 text-sm">
              {socials.map(s => (
                <li key={s}><a href="#" className="transition-colors hover:text-accent">{s} ↗</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-8 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} 2BrotherStudio.in — All rights reserved.</div>
          <div className="flex items-center gap-3">
            <span className="size-1.5 animate-pulse-glow rounded-full bg-accent" />
            Available worldwide · Based in India
          </div>
        </div>
      </div>
    </footer>
  );
}
