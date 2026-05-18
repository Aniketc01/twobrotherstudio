import { motion } from "motion/react";

const items = [
  { q: "They turned our launch into an event. Every detail was considered, and the work spoke for itself.", a: "Priya Mehta", r: "Founder, Aura Beauty" },
  { q: "Working with 2Brother felt like hiring an in-house creative team — with the taste of a top agency.", a: "Daniel Cho", r: "VP Brand, Northbound" },
  { q: "The kind of studio you call when you don't want to compromise. Sharp strategy, beautiful execution.", a: "Léa Martin", r: "CEO, Maison 17" },
  { q: "Our conversion rate doubled and the brand finally feels like us. They got it on the first draft.", a: "Arjun Rao", r: "Co-founder, Vexel.io" },
];

export function Testimonials() {
  return (
    <section id="clients" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-12 bg-accent" /> The Client Experience
            </div>
            <h2 className="font-display text-balance text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
              Quiet praise.<br /><em className="font-light text-muted-foreground">Loud results.</em>
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <motion.figure
              key={it.a}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
              className="glass group relative overflow-hidden rounded-3xl p-8 md:p-12"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
              <span className="font-display text-7xl leading-none text-accent/40">"</span>
              <blockquote className="font-display mt-2 text-2xl font-light leading-snug tracking-tight md:text-3xl">
                {it.q}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
                <span className="size-10 rounded-full bg-gradient-to-br from-accent to-foreground/20" />
                <div>
                  <div className="text-sm">{it.a}</div>
                  <div className="text-xs text-muted-foreground">{it.r}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
