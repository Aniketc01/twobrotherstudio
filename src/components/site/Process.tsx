import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const steps = [
  { n: "01", t: "Strategy", d: "We start with sharp questions. Audience, market, voice, ambition — distilled into a brief that sets the bar." },
  { n: "02", t: "Design", d: "Editorial-grade visual systems built from the type up. Every detail is art directed, never assembled." },
  { n: "03", t: "Content", d: "Words, imagery, motion and video — produced in-house to match the design language exactly." },
  { n: "04", t: "Development", d: "Hand-built with React, Next, and modern frameworks. Performant, accessible, future-proof." },
  { n: "05", t: "Launch & Growth", d: "We ship, measure and iterate. Then we keep going — because brands aren't finished, they evolve." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section id="process" ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-32 md:px-10 md:pt-40">
          <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px w-12 bg-accent" /> The Process
          </div>
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em]">
            From <em className="font-light text-muted-foreground">first call</em> to launch day.
          </h2>
        </div>

        <div className="relative flex-1">
          <motion.div style={{ x }} className="absolute inset-y-0 left-0 flex items-center gap-8 pl-6 md:gap-12 md:pl-10">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="glass relative flex h-[60vh] w-[80vw] shrink-0 flex-col justify-between rounded-3xl p-8 md:w-[40vw] md:p-12"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl font-light text-muted-foreground md:text-8xl">{s.n}</span>
                  <span className="size-2 rounded-full bg-accent shadow-[0_0_20px_var(--accent-glow)]" />
                </div>
                <div>
                  <h3 className="font-display mb-6 text-4xl font-medium tracking-tight md:text-6xl">{s.t}</h3>
                  <p className="max-w-md text-base font-light leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Stage {i + 1} / {steps.length}</span>
                  <span>→</span>
                </div>
              </div>
            ))}
            <div className="w-[10vw] shrink-0" />
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-[1600px] px-6 pb-10 md:px-10">
          <div className="h-px w-full bg-white/10">
            <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} className="h-full bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
