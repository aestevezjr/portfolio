"use client";

import { motion } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate on page load instead of when scrolled into view. */
  onLoad?: boolean;
};

export function Reveal({ children, className, delay = 0, onLoad = false }: RevealProps) {
  const target = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      {...(onLoad ? { animate: target } : { whileInView: target, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
