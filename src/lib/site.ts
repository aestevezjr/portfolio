// Replace with the custom domain once it is secured (or set NEXT_PUBLIC_SITE_URL in Vercel).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://agustinestevez.vercel.app").replace(/\/$/, "");

// Keep search engines out while the site is a work in progress.
// Flip to true (or set NEXT_PUBLIC_INDEXABLE=true in Vercel) when it is ready for recruiters.
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const cvPath = {
  en: "/cv/agustin-estevez-cv-en.pdf",
  // Until the Spanish CV is uploaded, both languages serve the English PDF.
  es: "/cv/agustin-estevez-cv-en.pdf",
} as const;
