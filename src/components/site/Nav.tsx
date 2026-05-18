import { motion } from "motion/react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#" className="group flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent shadow-[0_0_20px_var(--accent-glow)]" />
          <span className="font-display text-sm font-medium tracking-tight">
            2Brother<span className="text-muted-foreground">Studio</span>
          </span>
        </a>

        <nav className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group relative hidden overflow-hidden rounded-full border border-white/10 bg-surface px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:border-accent/40 md:inline-flex"
        >
          <span className="relative z-10">Start a project</span>
          <span className="absolute inset-0 -translate-x-full bg-accent/20 transition-transform duration-500 group-hover:translate-x-0" />
        </a>
      </div>
    </motion.header>
  );
}
