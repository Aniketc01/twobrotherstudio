import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import hero from "@/assets/hero-atmosphere.jpg";

const words = ["Design.", "Content.", "Development."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-32 md:pb-32">
      {/* Atmosphere background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <img
          src={hero}
          alt=""
          width={1920}
          height={1280}
          className="size-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
        <div className="absolute inset-0 mesh-gradient opacity-80 animate-pulse-glow" />
      </motion.div>

      {/* Floating UI cards */}
      <FloatingCards />

      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        {/* Marker line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="size-1.5 animate-pulse-glow rounded-full bg-accent" />
          A creative studio · Est. 2019
        </motion.div>

        <h1 className="font-display text-balance text-[clamp(3rem,11vw,11rem)] font-medium leading-[0.92] tracking-[-0.05em]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {i === 1 ? (
                  <em className="font-light italic text-accent">{w}</em>
                ) : (
                  w
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-16 grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="max-w-md text-pretty text-base font-light leading-relaxed text-muted-foreground md:text-lg"
          >
            We craft premium digital experiences for modern brands —
            where editorial design meets engineering precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full bg-foreground px-7 py-4 text-sm font-medium tracking-tight text-background transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">Start a Project →</span>
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-4 text-sm font-medium tracking-tight transition-colors hover:border-accent/50 hover:text-accent"
            >
              View Our Work
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="block animate-bounce">Scroll</span>
      </motion.div>
    </section>
  );
}

function FloatingCards() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="glass animate-float-slow absolute right-6 top-32 hidden w-64 rounded-2xl p-5 md:block"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Latest case</span>
          <span className="size-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent-glow)]" />
        </div>
        <div className="font-display text-lg leading-tight">Aura · Identity & Web</div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Brand · UI · Dev</span>
          <span>'25</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="glass animate-float-slow absolute bottom-40 left-6 hidden rounded-2xl px-5 py-4 md:block"
        style={{ animationDelay: "2s" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1">
            {[0,1,2].map(i => <span key={i} className="size-6 rounded-full border border-background bg-gradient-to-br from-accent to-foreground/30" />)}
          </div>
          <div>
            <div className="text-xs">120+ brands shipped</div>
            <div className="text-[10px] text-muted-foreground">Worldwide collaborations</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
