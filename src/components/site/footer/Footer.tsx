"use client";

import styles from "./Footer.module.scss";
import { useTranslations } from "next-intl";

type FooterProps = {
  legalSeat?: string;
  email?: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  partners?: Array<{ name: string; href: string }>;
};

export default function Footer({
  legalSeat = "Sede legale: …",
  email = "info@pkt-kart.ch",
  socials = {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
    whatsapp: "#",
  },
  partners = [
    { name: "Partner 1", href: "#" },
    { name: "Partner 2", href: "#" },
  ],
}: FooterProps) {
  const t = useTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.block}>
          <div className={styles.brand}>PKT Swiss Kart Team</div>
          <div className={styles.line}>{legalSeat}</div>
          <div className={styles.line}>
            {t("email")}:{" "}
            <a className={styles.link} href={`mailto:${email}`}>
              {email}
            </a>
          </div>

          <div className={styles.socialRow} aria-label="Social links">
            <a className={styles.pill} href={socials.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className={styles.pill} href={socials.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a className={styles.pill} href={socials.tiktok} target="_blank" rel="noreferrer">
              TikTok
            </a>
            <a className={styles.whatsapp} href={socials.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.title}>{t("partners")}</div>
          <div className={styles.muted}>{t("partnersHint")}</div>

          <div className={styles.partnerList}>
            {partners.map((p) => (
              <a key={p.name} className={styles.link} href={p.href} target="_blank" rel="noreferrer">
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} PKT Swiss Kart Team</span>
      </div>
    </footer>
  );
}
