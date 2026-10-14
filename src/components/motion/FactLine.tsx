"use client";

import { motion } from "motion/react";
import { ease } from "./Reveal";

type Fact = { value: string; label: string };

// Hero facts drawn as taps on a single line — the same visual language as the GCM schematic.
export function FactLine({ facts, delay = 0.5 }: { facts: Fact[]; delay?: number }) {
  return (
    <div className="relative mt-16 md:mt-20">
      {/* Horizontal bus (md+) */}
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 top-[5px] hidden h-px origin-left bg-ink/30 md:block"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease, delay }}
      />
      {/* Vertical bus (mobile) */}
      <motion.span
        aria-hidden
        className="absolute bottom-2 left-[5px] top-[5px] w-px origin-top bg-ink/30 md:hidden"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.1, ease, delay }}
      />
      <motion.span
        aria-hidden
        className="absolute right-0 top-0 hidden size-[11px] border-r border-t border-ink/30 md:block"
        style={{ rotate: 45, translateX: -4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 1 }}
      />
      <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
        {facts.map((fact, i) => (
          <li key={fact.label} className="relative pl-8 md:pl-0 md:pt-8">
            <motion.span
              aria-hidden
              className="absolute left-0 top-0 size-[11px] rounded-full border-2 border-signal bg-paper"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 22, delay: delay + 0.25 + i * 0.25 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: delay + 0.35 + i * 0.25 }}
            >
              <p className="display-wide text-3xl font-bold leading-none md:text-4xl">{fact.value}</p>
              <p className="mt-2 max-w-[24ch] text-sm leading-snug text-mute">{fact.label}</p>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}
