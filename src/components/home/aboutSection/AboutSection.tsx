"use client";

import styles from "./AboutSection.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Slide = {
  src: string;
  alt: string;
};

export default function AboutSection() {
  const t = useTranslations("About");
  const [active, setActive] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const slides: Slide[] = [
    { src: "/images/about/about-1.jpg", alt: t("slides.0.alt") },
    { src: "/images/about/about-2.jpg", alt: t("slides.1.alt") },
    { src: "/images/about/about-3.jpg", alt: t("slides.2.alt") },
  ];

  const count = slides.length;

  const go = React.useCallback(
    (i: number) => setActive((i + count) % count),
    [count]
  );

  const prev = React.useCallback(() => go(active - 1), [go, active]);
  const next = React.useCallback(() => go(active + 1), [go, active]);

  React.useEffect(() => {
    if (isPaused || count <= 1) return;
    const id = window.setInterval(() => go(active + 1), 6500);
    return () => window.clearInterval(id);
  }, [isPaused, count, go, active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const startX = React.useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx > 0) prev();
    else next();
  };

  const current = slides[active];

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.grid}>
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

          <div className={styles.carousel}>
            <div className={styles.card}>
              <div
                className={styles.media}
                tabIndex={0}
                role="group"
                aria-roledescription="carousel"
                aria-label={t("carouselLabel")}
                onKeyDown={onKeyDown}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
              >
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 900px) 92vw, 520px"
                  className={styles.img}
                  priority={active === 0}
                  quality={80}
                />

                <div className={styles.vignette} aria-hidden />

                <div className={styles.counter}>
                  <span className={styles.counterAccent}>{active + 1}</span>
                  <span className={styles.counterSep}>/</span>
                  <span className={styles.counterTotal}>{count}</span>
                </div>

                <div className={styles.swipeHint}>{t("swipeHint")}</div>
              </div>

              <div className={styles.caption}>
                <div className={styles.captionTitle}>{t(`slides.${active}.title`)}</div>
                <div className={styles.captionText}>{t(`slides.${active}.caption`)}</div>
              </div>

              <div className={styles.controls}>
                <button
                  className={styles.navBtn}
                  onClick={prev}
                  aria-label={t("prev")}
                  type="button"
                  disabled={count <= 1}
                >
                  <ChevronLeftIcon />
                </button>

                <div className={styles.dots} aria-label={t("dotsLabel")}>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                      onClick={() => setActive(i)}
                      aria-label={t("goTo", { index: i + 1 })}
                      aria-current={i === active ? "true" : "false"}
                      type="button"
                    />
                  ))}
                </div>

                <button
                  className={styles.navBtn}
                  onClick={next}
                  aria-label={t("next")}
                  type="button"
                  disabled={count <= 1}
                >
                  <ChevronRightIcon />
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
