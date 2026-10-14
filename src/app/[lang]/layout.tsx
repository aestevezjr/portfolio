import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "../globals.css";
import { fontVariables, themeScript } from "@/lib/fonts";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { indexable, siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1424" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    alternates: {
      canonical: `/${lang}/`,
      languages: { en: "/en/", es: "/es/", "x-default": "/en/" },
    },
    openGraph: {
      type: "profile",
      title: meta.title,
      description: meta.description,
      url: `/${lang}/`,
      locale: lang === "es" ? "es_DO" : "en_US",
      siteName: "Agustín Estévez",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
