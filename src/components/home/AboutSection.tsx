"use client";

import styles from "./AboutSection.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as React from "react";

export default function AboutSection() {
  const t = useTranslations("About");
  const [active, setActive] = React.useState(0);

  const slides = [
    { src: "/images/about/about-1.jpg", alt: t("slides.0.alt") },
    { src: "/images/about/about-2.jpg", alt: t("slides.1.alt") },
    { src: "/images/about/about-3.jpg", alt: t("slides.2.alt") },
  ];

  const go = (i: number) => setActive((i + slides.length) % slides.length);

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.copy}>
            <div className={styles.overline}>{t("kicker")}</div>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.lead}>{t("lead")}</p>

            <ul className={styles.points}>
              <li>{t("points.0")}</li>
              <li>{t("points.1")}</li>
              <li>{t("points.2")}</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className={styles.carousel}>
            <div className={styles.card}>
              <div className={styles.media}>
                <Image
                  src={slides[active].src}
                  alt={slides[active].alt}
                  fill
                  sizes="(max-width: 900px) 92vw, 520px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className={styles.vignette} aria-hidden />
              </div>

              <div className={styles.caption}>
                <div className={styles.captionTitle}>{t(`slides.${active}.title`)}</div>
                <div className={styles.captionText}>{t(`slides.${active}.caption`)}</div>
              </div>

              <div className={styles.controls}>
                <button className={styles.navBtn} onClick={() => go(active - 1)} aria-label={t("prev")}>
                  ‹
                </button>

                <div className={styles.dots} aria-label={t("dotsLabel")}>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                      onClick={() => setActive(i)}
                      aria-label={t("goTo", { index: i + 1 })}
                    />
                  ))}
                </div>

                <button className={styles.navBtn} onClick={() => go(active + 1)} aria-label={t("next")}>
                  ›
                </button>
              </div>
            </div>

            <div className={styles.since}>{t("badge")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
