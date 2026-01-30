"use client";

import styles from "./Footer.module.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TikTokIcon from "@mui/icons-material/MusicNote";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceIcon from "@mui/icons-material/Place";
import { mailHref, socials } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} aria-label={t("ariaFooter")}>
      <div className={styles.topAccent} />

      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <div className={styles.brand}>{t("brand")}</div>
            <span className={styles.since}>{t("since")}</span>
          </div>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <PlaceIcon className={styles.infoIcon} fontSize="small" />
              <span className={styles.infoText}>{socials.legalSeat}</span>
            </div>

            <div className={styles.infoItem}>
              <MailOutlineIcon className={styles.infoIcon} fontSize="small" />
              <a
                className={styles.link}
                href={mailHref}
              >
                {socials.email}
              </a>
            </div>
          </div>

          <div className={styles.socialRow} aria-label={t("ariaSocial")}>
            <a
              className={`${styles.socialBtn} ${styles.ig}`}
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramIcon fontSize="small" />
            </a>

            <a
              className={`${styles.socialBtn} ${styles.fb}`}
              href={socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <FacebookIcon fontSize="small" />
            </a>

            <a
              className={`${styles.socialBtn} ${styles.tk}`}
              href={socials.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              title="TikTok"
            >
              <TikTokIcon fontSize="small" />
            </a>

            <a
              className={`${styles.socialBtn} ${styles.wa}`}
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon fontSize="small" />
            </a>
          </div>
        </div>

        <div className={styles.linksCol}>
          <div className={styles.colTitle}>{t("quickLinks")}</div>
          <nav className={styles.linksList} aria-label={t("ariaQuickLinks")}>
            <Link className={styles.navLink} href="/servizi">
              {t("services")}
            </Link>
            <Link className={styles.navLink} href="/piloti-gare">
              {t("driversRaces")}
            </Link>
            <Link className={styles.navLink} href="/contatti">
              {t("contacts")}
            </Link>
          </nav>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} {t("brand")}
        </span>
        <span className={styles.sep} aria-hidden>
          •
        </span>
        <span className={styles.bottomMuted}>{t("rights")}</span>
      </div>
    </footer>
  );
}
