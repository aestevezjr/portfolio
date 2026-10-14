import { ImageResponse } from "next/og";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

// Served as /{lang}/og.png: a real .png path gets the right content type and
// no trailing-slash redirect, which link previews (LinkedIn, WhatsApp) need.
const ogSize = { width: 1200, height: 630 };

// Rendered once per language at build time (static export).
export const dynamic = "force-static";
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Same palette as the case-study band.
const C = { band: "#1f3a5f", ink: "#eef3f7", mute: "#a9bacb", rule: "#36557c", signal: "#6ed0c3" };

/**
 * The image renderer needs static TTF/OTF fonts. Google Fonts serves a static
 * instance of the requested axes when asked without a modern user agent.
 */
async function googleFont(family: string, axes: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:${axes}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error(`No TTF/OTF source for ${family}`);
  return (await fetch(src[1])).arrayBuffer();
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const { hero } = getDictionary(lang);
  const host = new URL(siteUrl).host;

  const displayText = hero.name + hero.facts.map((f) => f.value).join("");
  const sansText = hero.facts.map((f) => f.label).join("") + hero.headline;
  const monoText = (hero.role + hero.status + host).toUpperCase() + host;

  const [display, sans, mono] = await Promise.all([
    googleFont("Archivo", "wdth,wght@125,800", displayText),
    googleFont("IBM+Plex+Sans", "wght@400", sansText),
    googleFont("IBM+Plex+Mono", "wght@500", monoText),
  ]);

  const facts = hero.facts;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: C.band, padding: "58px 72px 52px", color: C.ink, fontFamily: "Plex Sans" }}>
        <span style={{ fontFamily: "Plex Mono", fontSize: 19, letterSpacing: 2, color: C.mute }}>{hero.role.toUpperCase()}</span>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 34, fontFamily: "Archivo", fontSize: 104, lineHeight: 0.9, letterSpacing: -3 }}>
          {hero.name.split(" ").map((part) => (
            <span key={part}>{part}</span>
          ))}
        </div>

        {/* Fact line: the same "taps on a bus" motif as the hero */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", position: "relative", height: 16 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 7, height: 2, background: C.rule }} />
            {facts.map((f, i) => (
              <div key={f.label} style={{ position: "absolute", left: `${(i * 100) / 3}%`, top: 0, width: 16, height: 16, borderRadius: 8, border: `3px solid ${C.signal}`, background: C.band }} />
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 22 }}>
            {facts.map((f) => (
              <div key={f.label} style={{ display: "flex", flexDirection: "column", width: "33.33%", paddingRight: 24 }}>
                <span style={{ fontFamily: "Archivo", fontSize: 46, lineHeight: 1 }}>{f.value}</span>
                <span style={{ fontSize: 22, color: C.mute, marginTop: 10, lineHeight: 1.25 }}>{f.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 30, fontFamily: "Plex Mono", fontSize: 18, letterSpacing: 1.5 }}>
            <span style={{ color: C.signal }}>{host}</span>
            <span style={{ display: "flex", alignItems: "center", color: C.ink }}>
              <span style={{ width: 10, height: 10, borderRadius: 5, background: C.signal, marginRight: 10 }} />
              {hero.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo", data: display, weight: 800, style: "normal" },
        { name: "Plex Sans", data: sans, weight: 400, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
