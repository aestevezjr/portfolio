import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Agustín Estévez — Senior Full-Stack Engineer",
  robots: { index: false, follow: true },
  alternates: { canonical: "/en/" },
};

// Root layout for "/" only: it immediately forwards to the English site.
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
      </head>
      <body>{children}</body>
    </html>
  );
}
