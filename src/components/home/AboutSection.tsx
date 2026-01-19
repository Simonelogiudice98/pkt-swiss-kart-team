"use client";

import styles from "./AboutSection.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("About");

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.copy}>
            <div className={styles.kickerRow}>
              <span className={styles.kickerDot} aria-hidden />
              <span className={styles.kicker}>{t("kicker")}</span>
            </div>

            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.lead}>{t("lead")}</p>

            <ul className={styles.points}>
              <li>{t("points.0")}</li>
              <li>{t("points.1")}</li>
              <li>{t("points.2")}</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className={styles.media}>
            <div className={styles.photoCard}>
              <div className={styles.photo}>
                {/* Se non hai la foto, metti una immagine rappresentativa */}
                <Image
                  src="/images/founder.jpg"
                  alt={t("founderAlt")}
                  fill
                  sizes="(max-width: 900px) 92vw, 520px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>

              <div className={styles.meta}>
                <div className={styles.metaTitle}>{t("founderLabel")}</div>
                <div className={styles.metaName}>{t("founderName")}</div>
              </div>

              <div className={styles.badge}>{t("badge")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
