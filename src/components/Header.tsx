import type { Dictionary, Locale } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const { nav } = dict;
  const otherLang: Locale = lang === "en" ? "es" : "en";
  const links = [
    ["#case-study", nav.work],
    ["#projects", nav.projects],
    ["#experience", nav.experience],
    ["#skills", nav.skills],
    ["#contact", nav.contact],
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        {nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href={`/${lang}/`} className="display-wide text-sm font-extrabold tracking-tight" aria-label={dict.hero.name}>
          A<span className="text-signal">/</span>E
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm text-mute">
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`/${otherLang}/`}
            hrefLang={otherLang}
            lang={otherLang}
            className="label rounded-full px-3 py-2 text-mute transition-colors hover:bg-ink/5 hover:text-ink"
          >
            {nav.switchLang}
          </a>
          <ThemeToggle label={nav.toggleTheme} hintDark={nav.hintDark} hintLight={nav.hintLight} />
        </div>
      </div>
    </header>
  );
}
