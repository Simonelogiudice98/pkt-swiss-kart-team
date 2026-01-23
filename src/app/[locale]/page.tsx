import styles from "@/styles/home.module.scss";
import HomeHero from "@/components/home/homeHero/HomeHero";
import AboutSection from "@/components/home/aboutSection/AboutSection";
import PartnersSection from "@/components/home/partnersSection/PartnersSection";
import HistorySection from "@/components/home/historySection/HistorySection";

const items = [
  {
    key: "rotax",
    name: "Rotax",
    href: "https://www.rotax-racing.com/",
    logoSrc: "/images/partners/rotax.svg",
  },
  {
    key: "iame",
    name: "IAME",
    href: "https://iameengines.com/",
    logoSrc: "/images/partners/iame.svg",
  },
  {
    key: "crg",
    name: "CRG",
    href: "https://kartcrg.com/?lang=en",
    logoSrc: "/images/partners/crg.jpg",
  },
  {
    key: "vega",
    name: "Vega Tyres",
    href: "https://vegatyres.com/en/",
    logoSrc: "/images/partners/vega.png",
  },
  {
    key: "tonyKart",
    name: "Tony Kart",
    href: "https://www.tonykart.com/",
    logoSrc: "/images/partners/tonyKart.png",
  },
  {
    key: "birelart",
    name: "Birel ART",
    href: "https://www.birelart.com/",
    logoSrc: "/images/partners/birel.png",
  },
];

export default function HomePage() {
  return (
    <main className={styles.page}>
      <HomeHero />

      <AboutSection />

      <HistorySection />

      <PartnersSection
        items={items}
      />
    </main>
  );
}
