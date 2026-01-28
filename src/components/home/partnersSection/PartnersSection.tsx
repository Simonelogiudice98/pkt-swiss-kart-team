"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./partnersSection.module.scss";
import { Partner } from "@/types/types";

export default function PartnersSection({ items }: { items: Partner[] }) {
  const t = useTranslations("partners");

  return (
    <section className={styles.section} id="partners">
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2 className={styles.h2}>{t("title")}</h2>
          <span className={styles.titleUnderline} />
        </div>

        <p className={styles.muted}>{t("subtitle")}</p>

        <div className={styles.partnersGrid}>
          {items.map((p) => {
            const label = p.key ? t(`items.${p.key}.name`) : p.name;

            return (
              <a
                key={p.key ?? p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerCard}
                aria-label={`${label} (opens in new tab)`}
                title={label}
              >
                <div className={styles.partnerInner}>
                  <div className={styles.partnerLogoWrap} aria-hidden>
                    {p.logoSrc ? (
                      <Image
                        src={p.logoSrc}
                        alt=""
                        fill
                        className={styles.partnerLogoImg}
                        sizes="(max-width: 600px) 80vw, (max-width: 1200px) 30vw, 360px"
                      />
                    ) : (
                      <div className={styles.partnerLogoPlaceholder} />
                    )}
                  </div>

                  <span className={styles.partnerName}>{label}</span>

                  <span className={styles.externalHint} aria-hidden>
                    ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
