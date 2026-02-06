"use client";

import * as React from "react";
import styles from "./HomeHero.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { Slide } from "@/types/types";

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

const SLIDES: Slide[] = [
  { src: "/images/hero/anniversary.jpeg", alt: "", objectPosition: "center" },
  {
    src: "/images/hero/hero-carusel-1.jpeg",
    alt: "",
    objectPosition: "center",
  },
  {
    src: "/images/hero/hero-carusel-2.jpeg",
    alt: "",
    objectPosition: "center",
  },
  { src: "/images/hero/hero-kart.jpeg", alt: "", objectPosition: "center" },
];

const AUTOPLAY_MS = 2000;

export default function HomeHero() {
  const t = useTranslations("HomeHero");
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(first) ? first : "it";

  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    if (SLIDES.length <= 1) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused]);

  const goTo = React.useCallback((idx: number) => {
    const safe = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setActive(safe);
  }, []);

  const prev = React.useCallback(() => goTo(active - 1), [active, goTo]);
  const next = React.useCallback(() => goTo(active + 1), [active, goTo]);

  const touchRef = React.useRef<{ x: number; y: number } | null>(null);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        const t = e.touches[0];
        touchRef.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        if (!touchRef.current) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchRef.current.x;
        const dy = t.clientY - touchRef.current.y;
        touchRef.current = null;

        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            prev();
          } else {
            next();
          }
        }
      }}
    >
      <div className={styles.heroMedia} aria-hidden>
        <div className={styles.carousel}>
          {SLIDES.map((s, idx) => {
            const isActive = idx === active;
            return (
              <div
                key={s.src}
                className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
              >
                <Image
                  className={styles.heroImg}
                  src={s.src}
                  alt={s.alt ?? ""}
                  fill
                  priority={idx === active}
                  loading={idx === active ? "eager" : "lazy"}
                  fetchPriority={idx === active ? "high" : "auto"}
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: s.objectPosition ?? "center",
                  }}
                />
              </div>
            );
          })}
        </div>

        {SLIDES.length > 1 && (
          <div className={styles.dots} aria-hidden>
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.dot} ${idx === active ? styles.dotActive : ""}`}
                onClick={() => goTo(idx)}
                tabIndex={-1}
              />
            ))}
          </div>
        )}
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
