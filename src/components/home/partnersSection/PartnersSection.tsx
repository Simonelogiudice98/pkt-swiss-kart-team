"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./partnersSection.module.scss";
import { Partner } from "@/types/types";

type Props = {
  partners: Partner[];
  supporters: Partner[];
};

function CardsGrid({ items }: { items: Partner[] }) {
  const t = useTranslations("partners");

  return (
    <div className={styles.cardsGrid}>
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
  );
}

export default function PartnersSection({ partners, supporters }: Props) {
  const t = useTranslations("partners");

  return (
    <section className={styles.section} id="partners">
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.headerCol}>
            <h3 className={styles.h3}>{t("partnersTitle")}</h3>
            <span className={styles.groupUnderline} />
          </div>

          <div className={styles.headerColRight}>
            <h3 className={styles.h3}>{t("supportersTitle")}</h3>
            <span className={styles.groupUnderline} />
          </div>
        </div>

        <div className={styles.split}>
          <div className={styles.left}>
            <CardsGrid items={partners} />
          </div>

          <div className={styles.right}>
            <CardsGrid items={supporters} />
          </div>
        </div>
      </div>
    </section>
  );
}

