
export interface Item {
  year: string;
  title: string;
  description: string;
};

export interface Slide {
  src: string;
  alt: string;
};

export interface HistoryItem {
  year: string;
  title: string;
  desc: string;
  icon?: "flag" | "trophy" | "graduation";
  image?: string;
  imageAlt?: string;
};

export interface Partner {
  name: string;     
  href: string;
  logoSrc?: string; 
  key?: string;     
};

export interface PilotApi {
  id: string;
  name: string;
  photoFileId: string | undefined;
};

export interface RaceEvent {
  id: string;
  title: string;
  date: string;
  track: string;
  posterUrl: string;
};

export interface FooterProps {
  legalSeat?: string;
  email?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
  };
};

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
  legalSeat: string;
  email: string;
};

export interface PilotDTO {
  id: string; 
  name: string; 
  photoFileId?: string; 
};