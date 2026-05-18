import { motion } from "motion/react";
import fitness from "@/assets/work-fitness.jpg";
import realestate from "@/assets/work-realestate.jpg";
import travel from "@/assets/work-travel.jpg";
import hospitality from "@/assets/work-hospitality.jpg";
import restaurant from "@/assets/work-restaurant.jpg";
import startup from "@/assets/work-startup.jpg";

const projects = [
  { title: "Pulse Athletic", category: "Fitness", year: "2025", scope: "Brand · Web", img: fitness, span: "md:col-span-7" },
  { title: "Casa Vento", category: "Real Estate", year: "2025", scope: "Identity · Web", img: realestate, span: "md:col-span-5" },
  { title: "Northbound", category: "Travel", year: "2024", scope: "Content · Web", img: travel, span: "md:col-span-5" },
  { title: "Maison 17", category: "Hospitality", year: "2024", scope: "Brand · Print", img: hospitality, span: "md:col-span-7" },
  { title: "Olia Kitchen", category: "Restaurant", year: "2024", scope: "Web · Content", img: restaurant, span: "md:col-span-6" },
  { title: "Vexel.io", category: "Startup UI/UX", year: "2025", scope: "Product Design", img: startup, span: "md:col-span-6" },
];

export function Work() {
  return (
    <section id="work" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-12 bg-accent" /> Selected Work
            </div>
            <h2 className="font-display text-balance text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
              Stories we've<br /><em className="font-light text-muted-foreground">helped shape.</em>
            </h2>
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            View archive <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, category, year, scope, img, span, index }: any) {
  return (
    <motion.a
      href="#"
      data-cursor="hover"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative block overflow-hidden rounded-2xl bg-surface ${span}`}
    >
      <div className="aspect-[4/5] overflow-hidden md:aspect-[16/11]">
        <motion.img
          src={img}
          alt={title}
          loading="lazy"
          width={1280}
          height={1600}
          className="size-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-90" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>{category}</span>
          <span className="size-1 rounded-full bg-muted-foreground/40" />
          <span>{year}</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">{title}</h3>
          <span className="text-xs text-muted-foreground">{scope}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="pointer-events-none absolute right-6 top-6 rounded-full border border-white/20 bg-background/60 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-xl"
      >
        View case →
      </motion.div>
    </motion.a>
  );
}
