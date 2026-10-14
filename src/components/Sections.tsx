import Image from "next/image";
import { Fragment } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cvPath } from "@/lib/site";
import { CountUp } from "./motion/CountUp";
import { FactLine } from "./motion/FactLine";
import { Reveal } from "./motion/Reveal";
import { ProjectVideo } from "./ProjectVideo";
import { Schematic } from "./motion/Schematic";

type Props = { dict: Dictionary; lang: Locale };

const container = "mx-auto max-w-6xl px-4 sm:px-6";

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`display-wide text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl ${className}`}>
      {children}
    </h2>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>
      <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Hero({ dict, lang }: Props) {
  const { hero, contact } = dict;
  return (
    <section className={`${container} pb-20 pt-14 md:pb-28 md:pt-24`}>
      <div className="rise flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="label text-mute">{hero.role}</p>
        <p className="label flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-signal" />
          </span>
          <span>{hero.status}</span>
          <span className="whitespace-nowrap text-mute">· {hero.location}</span>
        </p>
      </div>

      <div className="rise" style={{ animationDelay: "80ms" }}>
        <h1 className="display-wide mt-8 text-[clamp(2.9rem,10.5vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.035em]">
          {hero.name.split(" ").map((part) => (
            <span key={part} className="block">
              {part}
            </span>
          ))}
        </h1>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
        <div className="rise md:col-span-7" style={{ animationDelay: "180ms" }}>
          <p className="max-w-[34ch] text-xl leading-snug md:text-2xl">{hero.headline}</p>
        </div>
        <div style={{ animationDelay: "260ms" }} className="rise flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
          <a
            href="#case-study"
            className="group inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-signal"
          >
            {hero.ctaProjects}
            <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href={cvPath[lang]}
            download
            className="inline-flex items-center gap-2 rounded-sm border border-ink/25 px-5 py-3 text-sm font-medium transition-colors hover:border-ink"
          >
            {hero.ctaCv}
          </a>
          <span className="flex w-full gap-4 pt-1 font-mono text-xs text-mute md:justify-end">
            <a className="group inline-flex items-center gap-1 hover:text-ink" href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight />
            </a>
            <a className="group inline-flex items-center gap-1 hover:text-ink" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ArrowUpRight />
            </a>
          </span>
        </div>
      </div>

      <FactLine facts={hero.facts} delay={0.55} />
    </section>
  );
}

export function About({ dict }: Props) {
  return (
    <section aria-labelledby="about-title" className={`${container} border-t border-rule py-20 md:py-28`}>
      <div className="grid gap-8 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <h2 id="about-title" className="label text-signal">{dict.about.title}</h2>
        </Reveal>
        <div className="space-y-6 md:col-span-8">
          {dict.about.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={i === 0 ? "text-2xl leading-snug md:text-3xl" : "max-w-[62ch] text-lg leading-relaxed text-mute"}>
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudy({ dict, lang }: Props) {
  const cs = dict.caseStudy;
  const blocks = [cs.problem, cs.role, cs.solution];
  return (
    <section id="case-study" aria-labelledby="case-title" className="bg-band py-20 text-band-ink md:py-28">
      <div className={container}>
        <Reveal>
          <p className="label text-band-signal">{cs.eyebrow}</p>
          <SectionTitle className="mt-4 max-w-[18ch]">
            <span id="case-title">{cs.title}</span>
          </SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {blocks.map((block, i) => (
            <Reveal key={block.label} delay={i * 0.08} className="border-t border-band-rule pt-5">
              <h3 className="label text-band-mute">{block.label}</h3>
              <p className="mt-3 leading-relaxed">{block.text}</p>
            </Reveal>
          ))}
        </div>

        <Schematic nodes={cs.diagram.nodes} title={cs.diagram.title} />

        <div className="mt-20">
          <Reveal>
            <h3 className="label text-band-mute">{cs.metricsTitle}</h3>
          </Reveal>
          <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-4">
            {cs.metrics.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 0.06}>
                <dt className="sr-only">{metric.label}</dt>
                <dd className="font-display text-4xl font-bold leading-none tracking-tight lg:text-5xl">
                  <CountUp value={metric.value} suffix={metric.suffix} locale={lang === "es" ? "es-DO" : "en-US"} />
                </dd>
                <dd aria-hidden className="mt-3 text-sm text-band-mute">{metric.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="mt-16 flex flex-col gap-6 border-l-2 border-band-signal pl-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[30ch] text-2xl leading-snug md:text-3xl">{cs.impact}</p>
          <p className="font-mono text-xs text-band-mute">{cs.stack.join("  /  ")}</p>
        </Reveal>
      </div>
    </section>
  );
}

function repoName(url: string) {
  return url.replace(/\/$/, "").split("/").pop();
}

export function Projects({ dict }: Props) {
  const { projects } = dict;
  return (
    <section id="projects" aria-labelledby="projects-title" className={`${container} py-20 md:py-28`}>
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionTitle>
          <span id="projects-title">{projects.title}</span>
        </SectionTitle>
        <p className="max-w-[36ch] text-mute">{projects.intro}</p>
      </Reveal>

      <div className="mt-14 space-y-20 md:space-y-28">
        {projects.items.map((project, i) => {
          const repos = "repoSecondary" in project && project.repoSecondary ? [project.repo, project.repoSecondary] : [project.repo];
          const image = "image" in project ? project.image : undefined;
          const video = "video" in project ? project.video : undefined;
          return (
            <article key={project.slug} className="grid gap-8 md:grid-cols-12 md:gap-10">
              <Reveal className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="group relative overflow-hidden rounded-sm border border-rule bg-surface transition-transform duration-500 ease-out hover:-translate-y-1">
                  <div className="flex h-8 items-center gap-1.5 border-b border-rule px-3" aria-hidden>
                    <span className="size-2 rounded-full bg-rule" />
                    <span className="size-2 rounded-full bg-rule" />
                    <span className="size-2 rounded-full bg-rule" />
                  </div>
                  {video && image ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <ProjectVideo
                        light={video.light}
                        dark={video.dark}
                        posterLight={image.light}
                        posterDark={image.dark}
                        label={image.alt}
                      />
                    </div>
                  ) : image ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* Light and dark captures; the active theme decides which one shows. */}
                      <Image src={image.light} alt={image.alt} width={1600} height={1000} sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full object-cover object-left-top dark:hidden" />
                      <Image src={image.dark} alt={image.alt} width={1600} height={1000} sizes="(min-width: 768px) 58vw, 100vw" className="hidden h-full w-full object-cover object-left-top dark:block" />
                    </div>
                  ) : (
                    <div
                      className="grid aspect-[16/10] place-items-center"
                      style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent 0 14px, color-mix(in oklab, var(--rule) 45%, transparent) 14px 15px)" }}
                    >
                      <span className="display-wide text-2xl font-bold text-mute/70 md:text-3xl">{project.name}</span>
                    </div>
                  )}
                </div>
              </Reveal>
              <Reveal delay={0.08} className={`flex flex-col md:col-span-5 ${i % 2 ? "md:order-1" : ""}`}>
                <p className="label text-signal">{project.tagline}</p>
                <h3 className="display-wide mt-3 text-2xl font-bold md:text-3xl">{project.name}</h3>
                <p className="mt-4 leading-relaxed text-mute">{project.description}</p>
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-xs leading-relaxed text-mute">{project.stack.join("  /  ")}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {repos.map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 border-b border-ink/30 pb-0.5 text-sm font-medium transition-colors hover:border-signal hover:text-signal"
                    >
                      {repos.length > 1 ? repoName(url) : projects.viewRepo}
                      <ArrowUpRight />
                    </a>
                  ))}
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Experience({ dict }: Props) {
  const { experience } = dict;
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-rule bg-surface py-20 md:py-28">
      <div className={container}>
        <Reveal>
          <SectionTitle>
            <span id="experience-title">{experience.title}</span>
          </SectionTitle>
        </Reveal>
        <ol className="mt-14">
          {experience.roles.map((role, i) => (
            <li key={role.company} className="grid gap-3 md:grid-cols-12 md:gap-8">
              <Reveal className="md:col-span-3 md:pt-1">
                <p className="font-mono text-sm text-mute">{role.period}</p>
              </Reveal>
              <div className={`relative border-l border-rule pl-7 md:col-span-9 ${i < experience.roles.length - 1 ? "pb-14" : ""}`}>
                <span
                  aria-hidden
                  className={`absolute -left-[6px] top-1.5 size-[11px] rounded-full border-2 border-signal ${i === 0 ? "bg-signal" : "bg-surface"}`}
                />
                <Reveal>
                  <h3 className="text-xl font-semibold">{role.company}</h3>
                  <p className="mt-1 text-mute">{role.title}</p>
                  {"summary" in role && role.summary && <p className="mt-4 max-w-[62ch] leading-relaxed">{role.summary}</p>}
                </Reveal>
                {"projects" in role && role.projects && (
                  <ul className="mt-6 grid gap-6 lg:grid-cols-2">
                    {role.projects.map((project, j) => (
                      <li key={project.name}>
                        <Reveal delay={j * 0.06} className="h-full border-t border-rule pt-4">
                          <h4 className="font-medium">{project.name}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-mute">{project.summary}</p>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Skills({ dict }: Props) {
  const { skills, education } = dict;
  const lastGroup = skills.groups.length - 2; // "AI-assisted engineering" is highlighted
  return (
    <section id="skills" aria-labelledby="skills-title" className={`${container} py-20 md:py-28`}>
      <Reveal>
        <SectionTitle>
          <span id="skills-title">{skills.title}</span>
        </SectionTitle>
      </Reveal>
      <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, i) => (
          <Reveal key={group.name} delay={(i % 3) * 0.06} className="border-t border-rule pt-4">
            <dt className={`label ${i === lastGroup ? "text-signal" : "text-mute"}`}>{group.name}</dt>
            <dd className="mt-3 leading-relaxed">
              {group.items.map((item, j) => (
                <Fragment key={item}>
                  <span className="whitespace-nowrap">
                    {item}
                    {j < group.items.length - 1 && <span aria-hidden className="pl-1.5 text-mute">·</span>}
                  </span>{" "}
                </Fragment>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>

      <div className="mt-24 grid gap-8 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <h2 className="label text-signal">{education.title}</h2>
        </Reveal>
        <div className="space-y-6 md:col-span-8">
          {education.items.map((item) => (
            <Reveal key={item.degree} className="flex flex-col justify-between gap-1 border-t border-rule pt-4 sm:flex-row">
              <div>
                <h3 className="font-medium">{item.degree}</h3>
                <p className="mt-1 text-sm text-mute">
                  {item.school}
                  {"note" in item && item.note ? ` · ${item.note}` : ""}
                </p>
              </div>
              <p className="font-mono text-sm text-mute">{item.period}</p>
            </Reveal>
          ))}
          <Reveal>
            <p className="border-t border-rule pt-4 text-sm text-mute">{education.languages}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact({ dict, lang }: Props) {
  const { contact } = dict;
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-rule">
      <div className={`${container} py-20 md:py-32`}>
        <Reveal>
          <p id="contact-title" className="label text-signal">{contact.title}</p>
          <p className="mt-6 max-w-[44ch] text-xl leading-snug md:text-2xl">{contact.text}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href={`mailto:${contact.email}`}
            className="display-wide mt-10 inline-block break-all text-[clamp(1.35rem,5.2vw,4rem)] font-bold leading-tight tracking-tight underline decoration-rule decoration-2 underline-offset-[0.2em] transition-colors hover:text-signal hover:decoration-signal"
          >
            {contact.email}
          </a>
        </Reveal>
        <Reveal delay={0.16} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
          <a className="group inline-flex items-center gap-1.5 hover:text-signal" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight />
          </a>
          <a className="group inline-flex items-center gap-1.5 hover:text-signal" href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub <ArrowUpRight />
          </a>
          <a className="hover:text-signal" href={cvPath[lang]} download>
            {contact.cv} ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ dict }: Props) {
  return (
    <footer className={`${container} flex flex-col justify-between gap-2 border-t border-rule py-8 font-mono text-xs text-mute sm:flex-row`}>
      <p>© {new Date().getFullYear()} {dict.hero.name}</p>
      <p>{dict.footer}</p>
    </footer>
  );
}
