import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { About, CaseStudy, Contact, Experience, Footer, Hero, Projects, Skills } from "@/components/Sections";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: dict.hero.name,
    jobTitle: dict.hero.role,
    url: `${siteUrl}/${lang}/`,
    email: `mailto:${dict.contact.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Santo Domingo", addressCountry: "DO" },
    sameAs: [dict.contact.github, dict.contact.linkedin],
    knowsAbout: ["Java", "Spring Boot", "React", "Angular", "TypeScript", "Oracle PL/SQL", "REST APIs", "Software Architecture"],
  };

  const props = { dict, lang };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Header {...props} />
      <main id="main">
        <Hero {...props} />
        <About {...props} />
        <CaseStudy {...props} />
        <Projects {...props} />
        <Experience {...props} />
        <Skills {...props} />
        <Contact {...props} />
      </main>
      <Footer {...props} />
    </>
  );
}
