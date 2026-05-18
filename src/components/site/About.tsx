import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return <span ref={ref}>{n}{suffix}</span>;
}

const stats = [
  { v: 120, suffix: "+", label: "Brands shipped" },
  { v: 38, suffix: "", label: "Awards & features" },
  { v: 14, suffix: "", label: "Countries served" },
  { v: 6, suffix: "yrs", label: "Of relentless craft" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-32 md:py-48">
      {/* glow */}
      <div className="absolute left-1/2 top-1/3 -z-10 size-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-12 bg-accent" /> The Studio
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display max-w-[15ch] text-balance text-[clamp(2.5rem,8vw,8rem)] font-medium leading-[0.92] tracking-[-0.05em]"
        >
          We create digital experiences <em className="font-light text-muted-foreground">designed to feel premium.</em>
        </motion.h2>

        <div className="mt-24 grid gap-10 md:grid-cols-2 md:gap-20">
          <p className="text-balance text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
            2BrotherStudio is a small, focused team of designers, writers, and engineers.
            We work with founders, marketers and modern brands who want their digital
            presence to feel as considered as the products they sell.
          </p>
          <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              Founded by two brothers in 2019, we've built our practice around a single belief:
              <span className="text-foreground"> craft is the strategy</span>. Every pixel, paragraph
              and millisecond is treated as part of the brand.
            </p>
            <p>
              No templates, no shortcuts, no recycled systems — just original work, made carefully.
            </p>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-2 gap-y-12 border-t border-white/8 pt-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <div className="font-display text-5xl font-medium tracking-tight md:text-7xl">
                <Counter to={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
