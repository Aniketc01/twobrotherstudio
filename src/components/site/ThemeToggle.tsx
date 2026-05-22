import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "tbs-theme";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  root.style.colorScheme = theme;
  window.setTimeout(() => root.classList.remove("theme-transition"), 500);
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setMounted(true);
    setTheme(getInitialTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggle}
      suppressHydrationWarning
      className="group relative inline-flex h-9 w-[68px] items-center rounded-full border border-white/10 bg-surface px-1 transition-colors hover:border-accent/40"
    >
      <span
        className="absolute left-1 top-1 flex size-7 items-center justify-center rounded-full bg-foreground text-background shadow-[0_4px_20px_-4px_var(--accent-glow)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: mounted && isDark ? "translateX(32px)" : "translateX(0px)" }}
      >
        {mounted && isDark ? (
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </span>
      <span className="ml-auto mr-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground" aria-hidden>
        {mounted ? (isDark ? "D" : "L") : ""}
      </span>
    </button>
  );
}