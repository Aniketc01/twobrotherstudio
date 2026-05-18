import { motion } from "motion/react";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden py-32 md:py-56">
      <div className="absolute inset-0 -z-10 mesh-gradient" />
      <div className="absolute left-1/2 top-1/2 -z-10 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[160px] animate-pulse-glow" />

      <div className="mx-auto max-w-[1600px] px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="size-1.5 animate-pulse-glow rounded-full bg-accent" />
            Taking on 4 projects for Q3
          </div>
          <h2 className="font-display mx-auto max-w-[14ch] text-balance text-[clamp(3rem,12vw,12rem)] font-medium leading-[0.92] tracking-[-0.05em]">
            Let's build something <em className="font-light text-muted-foreground">exceptional.</em>
          </h2>

          <div className="mt-16 flex flex-col items-center gap-6">
            <a
              href="mailto:hello@2brotherstudio.in"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-foreground px-10 py-5 text-base font-medium tracking-tight text-background transition-transform hover:scale-[1.02]"
            >
              hello@2brotherstudio.in
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <span className="text-xs text-muted-foreground">Or call us · +91 00000 00000</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
