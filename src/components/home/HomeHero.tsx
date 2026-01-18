"use client";

import styles from "./HomeHero.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HomeHero({ locale }: { locale: string }) {
  const t = useTranslations("HomeHero");

  return (
    <section className={styles.hero}>
      <div className={styles.heroMedia} aria-hidden>
        <Image
          src="/images/hero-kart.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div className={styles.heroOverlay} aria-hidden />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.kickerRow}>
            <span className={styles.kickerDot} aria-hidden />
            <span className={styles.kicker}>{t("kicker")}</span>
          </div>

          <h1 className={styles.heroTitle}>{t("title")}</h1>

          <p className={styles.heroSubtitle}>{t("subtitle")}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryBtn} href={`/${locale}/servizi`}>
              {t("ctaServices")}
            </Link>
            <Link className={styles.secondaryBtn} href={`/${locale}/piloti-gare`}>
              {t("ctaDriversRaces")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
