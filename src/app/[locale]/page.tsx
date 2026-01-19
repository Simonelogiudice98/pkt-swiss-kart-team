import styles from "@/styles/home.module.scss";
import HomeHero from "@/components/home/homeHero/HomeHero";
import AboutSection from "@/components/home/aboutSection/AboutSection";
import PartnersSection from "@/components/home/PartnersSection";
import HistorySection from "@/components/home/historySection/HistorySection";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <HomeHero />

      <AboutSection />

      <HistorySection />

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
