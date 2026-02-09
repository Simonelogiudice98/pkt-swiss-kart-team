import styles from "@/styles/home.module.scss";
import HomeHero from "@/components/home/homeHero/HomeHero";
import AboutSection from "@/components/home/aboutSection/AboutSection";
import PartnersSection from "@/components/home/partnersSection/PartnersSection";
import HistorySection from "@/components/home/historySection/HistorySection";
import { partners, supporters } from "@/lib/utils";



export default function HomePage() {
  return (
    <main className={styles.page}>
      <HomeHero />

      <AboutSection />

      <HistorySection />

      <PartnersSection partners={partners} supporters={supporters} />
    </main>
  );
}
