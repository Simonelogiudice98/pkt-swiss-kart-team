import { SocialLinks } from "@/types/types";


export const socials:SocialLinks = {
    instagram:"https://www.instagram.com/_pktswisskartteam_?igsh=MXA3ZDV5MmlsNHlwMw==",
    facebook:"https://www.facebook.com/share/185YcowfMS/",
    tiktok:"https://www.tiktok.com/@pktswisskartteam?_r=1&_t=ZN-93VR0CgATx8",
    whatsapp:`https://api.whatsapp.com/send?phone=41792096881&text=${encodeURIComponent("Ciao! Vorrei informazioni sui vostri servizi.")}`,
    legalSeat: "Sede legale: Via del Sole 8, 6963 PREGASSONA (CH)",
    email: "pkt.kartteam@gmail.com",
}

export const partners = [
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
  {
    key: "torsion_project",
    name: "Torsion Project",
    href: "https://www.instagram.com/torsion_project/",
    logoSrc: "/images/partners/torsion.jpg",
  },
];

export const supporters = [
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
    href: "https://www.instagram.com/custom_and_style_parts/",
    logoSrc: "/images/partners/CSP.svg",
  },
  
];

export const mailHref =
  `mailto:${encodeURIComponent(socials.email)}` +
  `?subject=${encodeURIComponent("Richiesta informazioni")}` +
  `&body=${encodeURIComponent("Ciao! Vorrei info sui vostri servizi.")}`;