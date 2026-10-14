"use client";

import { useEffect, useRef } from "react";

type Sources = { webm: string; mp4: string };
type Props = {
  light: Sources;
  dark: Sources;
  posterLight: string;
  posterDark: string;
  label: string;
};

/**
 * Muted looping demo clip. One video per theme; only the visible one plays,
 * and only while the card is on screen. With reduced motion the poster stays.
 */
export function ProjectVideo({ light, dark, posterLight, posterDark, label }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapper.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = Array.from(root.querySelectorAll("video"));
    let inView = false;

    const sync = () => {
      for (const video of videos) {
        const shown = getComputedStyle(video).display !== "none";
        if (inView && shown && !reduce.matches) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.35 });
    io.observe(root);

    // Theme toggles swap which video is displayed.
    const mo = new MutationObserver(sync);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    reduce.addEventListener("change", sync);

    return () => {
      io.disconnect();
      mo.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  const videoClass = "h-full w-full object-cover object-left-top";
  return (
    <div ref={wrapper} className="relative h-full">
      {[
        { src: light, poster: posterLight, cls: `${videoClass} dark:hidden` },
        { src: dark, poster: posterDark, cls: `${videoClass} hidden dark:block` },
      ].map(({ src, poster, cls }) => (
        <video key={poster} className={cls} poster={poster} muted loop playsInline preload="none" aria-label={label}>
          <source src={src.webm} type="video/webm" />
          <source src={src.mp4} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
