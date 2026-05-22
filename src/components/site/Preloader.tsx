import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const STAGES = [
  // 0: primitive ape — hunched, long arms
  "M48 92 C46 86 44 78 46 70 C48 62 54 58 56 52 C54 46 56 40 60 38 C66 36 70 40 70 46 C70 50 68 52 66 54 C70 56 74 60 74 66 L76 78 L82 92 L78 94 L74 84 L72 92 L74 110 L70 112 L66 96 L60 96 L56 112 L52 110 L54 92 L52 84 L48 94 Z",
  // 1: early human — upright, slight hunch
  "M58 38 C54 38 52 42 52 46 C52 50 54 52 56 54 L54 58 C50 60 48 64 48 70 L48 84 L52 84 L54 72 L56 92 L54 112 L58 112 L60 94 L62 94 L64 112 L68 112 L66 92 L68 72 L70 84 L74 84 L74 70 C74 64 72 60 68 58 L66 54 C68 52 70 50 70 46 C70 42 68 38 64 38 Z",
  // 2: industrial era — upright with tool/hat
  "M56 30 L66 30 L66 34 L70 34 L70 38 L52 38 L52 34 L56 34 Z M58 40 C54 40 52 44 52 48 C52 52 54 54 56 56 L52 62 C50 64 48 68 48 74 L48 86 L52 86 L54 74 L56 92 L54 112 L58 112 L60 94 L62 94 L64 112 L68 112 L66 92 L68 74 L70 86 L74 86 L74 74 C74 68 72 64 70 62 L66 56 C68 54 70 52 70 48 C70 44 68 40 64 40 Z",
  // 3: modern creator — slim, casual
  "M58 32 C54 32 52 36 52 40 C52 44 54 46 56 48 L54 52 C50 54 48 58 48 64 L48 80 L52 80 L54 68 L56 92 L54 114 L58 114 L60 94 L62 94 L64 114 L68 114 L66 92 L68 68 L70 80 L74 80 L74 64 C74 58 72 54 68 52 L66 48 C68 46 70 44 70 40 C70 36 68 32 64 32 Z",
  // 4: businessman/founder — suit + briefcase
  "M58 30 C54 30 52 34 52 38 C52 42 54 44 56 46 L54 50 C50 52 47 56 47 62 L47 84 L52 84 L54 70 L54 94 L52 116 L58 116 L60 94 L62 94 L64 116 L70 116 L68 94 L68 70 L70 84 L75 84 L75 62 C75 56 72 52 68 50 L66 46 C68 44 70 42 70 38 C70 34 68 30 64 30 Z M76 78 L88 78 L88 96 L76 96 Z M80 74 L84 74 L84 78 L80 78 Z",
];

const QUOTES = [
  "From instinct…",
  "…to industry…",
  "…to innovation.",
];

const SESSION_KEY = "tbs-preloader-played";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState<"evolving" | "logo" | "out">("evolving");

  useEffect(() => {
    const stageTimers = STAGES.map((_, i) =>
      setTimeout(() => setStage(i), i * 700),
    );
    const toLogo = setTimeout(() => setPhase("logo"), STAGES.length * 700);
    const toOut = setTimeout(() => setPhase("out"), STAGES.length * 700 + 1100);
    const done = setTimeout(() => onDone(), STAGES.length * 700 + 1900);
    return () => {
      stageTimers.forEach(clearTimeout);
      clearTimeout(toLogo);
      clearTimeout(toOut);
      clearTimeout(done);
    };
  }, [onDone]);

  const quoteIndex = Math.min(Math.floor(stage / 2), QUOTES.length - 1);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505] text-[#F5F5F5]"
      style={{ pointerEvents: phase === "out" ? "none" : "auto" }}
    >
      {/* Ambient mesh + grain */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(91,127,255,0.18), transparent 55%), radial-gradient(circle at 30% 30%, rgba(91,127,255,0.08), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      {/* Floor light */}
      <div className="absolute bottom-[28%] left-1/2 h-[2px] w-[60vw] max-w-[640px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute bottom-[28%] left-1/2 h-24 w-[40vw] max-w-[420px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(91,127,255,0.25),transparent_70%)] blur-2xl" />

      {/* Ambient particles */}
      <Particles active={stage >= 3} />

      {/* Character */}
      <AnimatePresence mode="wait">
        {phase === "evolving" && (
          <motion.svg
            key={stage}
            viewBox="0 0 120 120"
            className="relative z-10 h-[42vh] max-h-[420px] w-auto drop-shadow-[0_20px_60px_rgba(91,127,255,0.25)]"
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <defs>
              <linearGradient id="silhouette" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5F5F5" />
                <stop offset="100%" stopColor="#9CA3AF" />
              </linearGradient>
            </defs>
            <motion.path
              d={STAGES[stage]}
              fill="url(#silhouette)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.svg>
        )}

        {phase !== "evolving" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className="font-display text-[clamp(2.4rem,7vw,5rem)] font-medium tracking-[-0.05em]"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
              2BrotherStudio
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.4em] text-white/50">
              A Creative Studio
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote */}
      <AnimatePresence mode="wait">
        {phase === "evolving" && (
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-[16%] left-0 right-0 text-center text-[11px] uppercase tracking-[0.35em] text-white/60"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
          >
            {QUOTES[quoteIndex]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress hairline */}
      <div className="absolute bottom-10 left-1/2 h-[1px] w-[180px] -translate-x-1/2 overflow-hidden bg-white/10">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: phase === "evolving" ? `${((stage + 1) / STAGES.length) * 100}%` : "100%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-white/70"
        />
      </div>
    </motion.div>
  );
}

function Particles({ active }: { active: boolean }) {
  const dots = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 6) * 0.2;
        const size = 1 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#5B7FFF]"
            style={{ left: `${left}%`, top: "55%", width: size, height: size, opacity: 0 }}
            animate={active ? { y: [-20, -180], opacity: [0, 0.8, 0] } : { opacity: 0 }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}

export function PreloaderGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const played = sessionStorage.getItem(SESSION_KEY);
    if (played) {
      // Quick minimal loader
      const t = setTimeout(() => setReady(true), 500);
      return () => clearTimeout(t);
    }
    setShowFull(true);
  }, []);

  const handleDone = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setReady(true);
  };

  return (
    <>
      {!ready && showFull && <Preloader onDone={handleDone} />}
      {!ready && !showFull && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
        </div>
      )}
      <div style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms ease" }}>
        {children}
      </div>
    </>
  );
}