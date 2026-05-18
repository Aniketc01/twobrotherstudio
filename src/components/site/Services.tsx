import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

const services = [
  {
    no: "01",
    title: "Content & Marketing",
    tag: "Storytelling at scale",
    items: ["Social Media Management", "Social Media Creatives", "Reels & Short Videos", "Product Photography", "Podcast Production", "Performance Marketing", "Meta Ads Management", "Brand Identity Design", "Marketing Collaterals"],
  },
  {
    no: "02",
    title: "UI/UX Design",
    tag: "Interfaces with soul",
    items: ["Landing Page Design", "Website UI Design", "Mobile App UI Design", "Dashboard Design", "Design Systems", "Wireframing & Prototyping"],
  },
  {
    no: "03",
    title: "Development",
    tag: "Engineering for craft",
    items: ["Website Development", "Landing Page Development", "Ecommerce Development", "Web App Development", "Mobile App Development", "WordPress Development"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-24 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-px w-12 bg-accent" /> Capabilities
            </div>
            <h2 className="font-display max-w-3xl text-balance text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
              Three disciplines.<br /><em className="font-light text-muted-foreground">One studio.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            We embed strategy, design, content and engineering into a single integrated process — the way modern brands actually ship.
          </p>
        </div>

        <div className="flex flex-col">
          {services.map((s, i) => (
            <ServiceRow key={s.no} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ no, title, tag, items, index }: { no: string; title: string; tag: string; items: string[]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 10%"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative border-t border-white/8 py-10 md:py-14"
    >
      <div className="grid grid-cols-12 items-center gap-6">
        <div className="col-span-2 font-display text-sm text-muted-foreground md:col-span-1">{no}</div>
        <div className="col-span-10 md:col-span-5">
          <motion.h3
            style={{ x }}
            className="font-display text-[clamp(2rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em] transition-colors group-hover:text-accent"
          >
            {title}
          </motion.h3>
        </div>
        <div className="col-span-12 text-sm italic text-muted-foreground md:col-span-3">{tag}</div>
        <div className="col-span-12 md:col-span-3 md:text-right">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{items.length} services</span>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 pl-0 pt-8 md:grid-cols-3 md:pl-[8.33%] md:pt-12">
          {items.map((it, i) => (
            <motion.div
              key={it}
              initial={{ opacity: 0, y: 10 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: open ? i * 0.03 : 0, duration: 0.4 }}
              className="flex items-center gap-3 py-2 text-sm text-muted-foreground"
            >
              <span className="size-1 rounded-full bg-accent" />
              {it}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <span className="absolute right-0 top-1/2 -translate-y-1/2 font-display text-2xl text-muted-foreground transition-transform duration-500 group-hover:rotate-45">↗</span>
    </motion.div>
  );
}
