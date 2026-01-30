"use client";

import styles from "./HomeHero.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export default function HomeHero() {
  const t = useTranslations("HomeHero");
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(first) ? first : "it";

  return (
    <section className={styles.hero}>
      <div className={styles.heroMedia} aria-hidden>
        <Image
          className={styles.heroImg}
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

          <h1 className={styles.heroTitle}>{t("title")}</h1>
          <p className={styles.heroSubtitle}>{t("subtitle")}</p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryBtn} href={`/${locale}/servizi`}>
              {t("ctaServices")}
            </Link>
            <Link
              className={styles.secondaryBtn}
              href={`/${locale}/piloti-gare`}
            >
              {t("ctaDriversRaces")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
