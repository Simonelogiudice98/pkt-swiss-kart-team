import styles from "@/styles/home.module.scss";
import HomeHero from "@/components/home/HomeHero";
import AboutSection from "@/components/home/AboutSection";
import TimelineSection from "@/components/home/TimelineSection";
import PartnersSection from "@/components/home/PartnersSection";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <HomeHero />

      <AboutSection />

      <TimelineSection
        items={[
          {
            year: "2018",
            title: "Nasce il team",
            description: "Prime gare, prime esperienze e prime soddisfazioni.",
          },
          {
            year: "2021",
            title: "Crescita e risultati",
            description: "Arrivano i primi podi e si allarga la squadra.",
          },
          {
            year: "2025",
            title: "Scuola Karting",
            description: "Percorsi dedicati per crescere giovani piloti e portarli in gara.",
          },
        ]}
      />

      <PartnersSection
        items={[
          { name: "Sponsor 1", href: "https://example.com" },
          { name: "Partner 2", href: "https://example.com" },
          { name: "Partner 3", href: "https://example.com" },
          { name: "Partner 4", href: "https://example.com" },
        ]}
      />
    </main>
  );
}
