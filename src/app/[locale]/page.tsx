import styles from "@/styles/home.module.scss";
import HomeHero from "@/components/home/homeHero/HomeHero";
import AboutSection from "@/components/home/aboutSection/AboutSection";
import PartnersSection from "@/components/home/partnersSection/PartnersSection";
import HistorySection from "@/components/home/historySection/HistorySection";

const partners = [
  {
    key: "stilo",
    name: "Stilo",
    href: "https://stilo.it",
    logoSrc: "/images/partners/stilo.svg",
  },
  {
    key: "rgm",
    name: "RGM Tech",
    href: "https://www.rgmtech.it",
    logoSrc: "/images/partners/RGM.png",
  },
  {
    key: "afradiator",
    name: "AF Radiator",
    href: "https://www.afradiator.it",
    logoSrc: "/images/partners/afradiator.svg",
  },
  {
    key: "iame",
    name: "IAME Motorsport",
    href: "https://www.iame-motorsport.com",
    logoSrc: "/images/partners/iame.svg",
  },
];

const supporters = [
  {
    key: "winteler",
    name: "Winteler",
    href: "https://www.winteler.ch",
    logoSrc: "/images/partners/winteler.svg",
  },
  {
    key: "galetti",
    name: "Galetti Pneumatici",
    href: "https://galettipneumatici.ch/",
    logoSrc: "/images/partners/galetti.svg",
  },
  {
    key: "finardi",
    name: "Finardi",
    href: "https://finardi.net/",
    logoSrc: "/images/partners/finardi.svg",
  },
  {
    key: "csp",
    name: "CSP",
    href: "",
    logoSrc: "/images/partners/CSP.svg",
  },
  
];

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
