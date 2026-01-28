
export type Item = {
  year: string;
  title: string;
  description: string;
};

export type Slide = {
  src: string;
  alt: string;
};

export type HistoryItem = {
  year: string;
  title: string;
  desc: string;
  icon?: "flag" | "trophy" | "graduation";
  image?: string;
  imageAlt?: string;
};

export type Partner = {
  name: string;     
  href: string;
  logoSrc?: string; 
  key?: string;     
};

export type PilotApi = {
  id: string;
  name: string;
  photoFileId: string | undefined;
};

export type RaceEvent = {
  id: string;
  title: string;
  date: string;
  track: string;
  posterUrl: string;
};

export type FooterProps = {
  legalSeat?: string;
  email?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
  };
};

export type SocialLinks = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  whatsapp?: string;
};

export type PilotDTO = {
  id: string; 
  name: string; 
  photoFileId?: string; 
};