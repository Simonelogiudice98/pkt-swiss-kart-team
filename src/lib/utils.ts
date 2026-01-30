import { SocialLinks } from "@/types/types";


export const socials:SocialLinks = {
    instagram:"https://www.instagram.com/_pktswisskartteam_?igsh=MXA3ZDV5MmlsNHlwMw==",
    facebook:"https://www.facebook.com/share/185YcowfMS/",
    tiktok:"https://www.tiktok.com/@pktswisskartteam?_r=1&_t=ZN-93VR0CgATx8",
    whatsapp:`https://api.whatsapp.com/send?phone=41792096881&text=${encodeURIComponent("Ciao! Vorrei informazioni sui vostri servizi.")}`,
    legalSeat: "Sede legale: …",
    email: "pkt.kartteam@gmail.com",
}

export const mailHref =
  `mailto:${encodeURIComponent(socials.email)}` +
  `?subject=${encodeURIComponent("Richiesta informazioni")}` +
  `&body=${encodeURIComponent("Ciao! Vorrei info sui vostri servizi.")}`;