// Replace with the custom domain once it is secured.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aestevezjr.vercel.app").replace(/\/$/, "");

export const cvPath = {
  en: "/cv/agustin-estevez-cv-en.pdf",
  // Until the Spanish CV is uploaded, both languages serve the English PDF.
  es: "/cv/agustin-estevez-cv-en.pdf",
} as const;
