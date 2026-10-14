"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";

const HINT_KEY = "theme-hint-seen";
const HINT_DELAY = 1800;
const HINT_DURATION = 6000;

function markHintSeen() {
  try {
    localStorage.setItem(HINT_KEY, "1");
  } catch {}
}

type Props = { label: string; hintDark: string; hintLight: string };

export function ThemeToggle({ label, hintDark, hintLight }: Props) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [hint, setHint] = useState<string | null>(null);

  // First visit only: once the hero has settled, pulse the button and show a short
  // label inviting visitors to try the other theme. Never repeats after that.
  useEffect(() => {
    if (reduce) return;
    let seen = true;
    try {
      seen = localStorage.getItem(HINT_KEY) === "1";
    } catch {}
    if (seen) return;

    const start = setTimeout(() => {
      markHintSeen();
      setHint(document.documentElement.dataset.theme === "dark" ? hintLight : hintDark);
      animate("[data-ring]", { scale: [0.8, 2.4], opacity: [0.7, 0] }, { duration: 1.2, ease: "easeOut", repeat: 3, repeatDelay: 0.3 });
      animate("[data-button]", { scale: [1, 1.18, 1] }, { duration: 0.6, ease: "easeInOut", repeat: 3, repeatDelay: 0.9 });
      animate("[data-icon]", { rotate: [0, 360] }, { type: "spring", stiffness: 90, damping: 12, delay: 0.2 });
    }, HINT_DELAY);
    const stop = setTimeout(() => setHint(null), HINT_DELAY + HINT_DURATION);
    return () => {
      clearTimeout(start);
      clearTimeout(stop);
    };
  }, [animate, reduce, hintDark, hintLight]);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    markHintSeen();
    setHint(null);
  };

  return (
    <div ref={scope} className="relative">
      <span data-ring aria-hidden className="pointer-events-none absolute inset-0 rounded-full border-2 border-signal opacity-0" />
      <button
        data-button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        className={`relative grid size-9 place-items-center rounded-full text-ink transition-colors duration-500 hover:bg-ink/5 ${hint ? "bg-signal/15" : ""}`}
      >
        <svg data-icon viewBox="0 0 20 20" className="size-[18px]" aria-hidden>
          <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5Z" fill="currentColor" />
        </svg>
      </button>
      <AnimatePresence>
        {hint && (
          <motion.button
            type="button"
            onClick={toggle}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-3 whitespace-nowrap rounded-md bg-ink px-3 py-2 text-sm font-medium text-paper shadow-lg"
          >
            <span aria-hidden className="absolute -top-1 right-3.5 size-2 rotate-45 bg-ink" />
            {hint}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
