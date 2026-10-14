"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "./Reveal";

const STEP = 0.18;

/** A link between two nodes; packets travel along it. The first link is two-way (device sync). */
function Link({ index, twoWay }: { index: number; twoWay: boolean }) {
  const reduce = useReducedMotion();
  const drawDelay = 0.2 + index * STEP + STEP / 2;
  const lanes = twoWay ? [-5, 5] : [0];

  return (
    <li aria-hidden className="relative flex h-10 w-full items-center justify-center md:h-auto md:w-16 md:shrink-0">
      {/* Horizontal (md+) */}
      <svg className="hidden h-6 w-full overflow-visible md:block" viewBox="0 0 64 24" preserveAspectRatio="none">
        {lanes.map((offset, lane) => (
          <g key={lane}>
            <motion.line
              x1="0" x2="64" y1={12 + offset} y2={12 + offset}
              className="stroke-band-mute/60" strokeWidth="1" vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: drawDelay }}
            />
            {!reduce && (
              <motion.circle
                r="2.5" cy={12 + offset} className="fill-band-signal"
                initial={{ cx: lane === 0 ? 0 : 64, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ cx: lane === 0 ? [0, 64] : [64, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8, ease: "linear", repeat: Infinity, repeatDelay: 0.6, delay: 1.4 + index * 0.45 + lane * 0.9 }}
              />
            )}
          </g>
        ))}
      </svg>
      {/* Vertical (mobile) */}
      <svg className="h-full w-6 overflow-visible md:hidden" viewBox="0 0 24 40" preserveAspectRatio="none">
        {lanes.map((offset, lane) => (
          <g key={lane}>
            <motion.line
              y1="0" y2="40" x1={12 + offset} x2={12 + offset}
              className="stroke-band-mute/60" strokeWidth="1" vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: drawDelay }}
            />
            {!reduce && (
              <motion.circle
                r="2.5" cx={12 + offset} className="fill-band-signal"
                initial={{ cy: lane === 0 ? 0 : 40, opacity: 0 }}
                viewport={{ once: true }}
                whileInView={{ cy: lane === 0 ? [0, 40] : [40, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.4, ease: "linear", repeat: Infinity, repeatDelay: 0.6, delay: 1.4 + index * 0.45 + lane * 0.7 }}
              />
            )}
          </g>
        ))}
      </svg>
    </li>
  );
}

export function Schematic({ nodes, title }: { nodes: string[]; title: string }) {
  return (
    <figure className="mt-16">
      <figcaption className="label mb-6 text-band-mute">{title}</figcaption>
      <ol className="flex flex-col items-stretch md:flex-row md:items-stretch">
        {nodes.map((node, i) => (
          <Fragment key={node}>
            {i > 0 && <Link index={i - 1} twoWay={i === 1} />}
            <motion.li
              className="flex flex-1 flex-col justify-between gap-4 border border-band-rule bg-white/[0.04] p-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * STEP }}
            >
              <span className="label text-band-signal">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-mono text-sm leading-snug text-band-ink">{node}</span>
            </motion.li>
          </Fragment>
        ))}
      </ol>
    </figure>
  );
}
