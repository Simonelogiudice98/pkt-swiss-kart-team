"use client";

import * as React from "react";
import styles from "./HomeHero.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import type { Slide } from "@/types/types";

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

const SLIDES: Slide[] = [
  {
    src: "/images/hero/anniversary.jpeg",
    alt: "anniversary",
    objectPosition: "center 30%"
  },
  {
    src: "/images/hero/hero-carusel-3.jpeg",
    alt: "driver",
    objectPosition: "center",
  },
  {
    src: "/images/hero/hero-carusel-1.jpeg",
    alt: "box",
    objectPosition: "center",
  },
  {
    src: "/images/hero/hero-carusel-2.jpeg",
    alt: "team",
    objectPosition: "center 28%"
  },
  {
    src: "/images/hero/hero-kart.jpeg",
    alt: "go kart",
    objectPosition: "center",
  },
];

const AUTOPLAY_MS = 4000;

type TouchPoint = { x: number; y: number };

export default function HomeHero() {
  const t = useTranslations("HomeHero");
  const pathname = usePathname();
  const first = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale: Locale = isLocale(first) ? first : "it";

  const [active, setActive] = React.useState<number>(0);
  const [paused, setPaused] = React.useState<boolean>(false);

  const timerRef = React.useRef<number | null>(null);
  const deadlineRef = React.useRef<number>(0);
  const touchRef = React.useRef<TouchPoint | null>(null);

  const clearTimer = React.useCallback((): void => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = React.useCallback((): void => {
    clearTimer();
    if (paused) return;
    if (SLIDES.length <= 1) return;

    deadlineRef.current = Date.now() + AUTOPLAY_MS;

    timerRef.current = window.setTimeout(() => {
      // recupera eventuale ritardo (background tab, throttling, ecc.)
      const now = Date.now();
      const overdue = Math.max(0, now - deadlineRef.current);
      const skips = Math.floor(overdue / AUTOPLAY_MS);

      setActive((i) => (i + 1 + skips) % SLIDES.length);
    }, AUTOPLAY_MS);
  }, [paused, clearTimer]);

  React.useEffect(() => {
    scheduleNext();
    return clearTimer;
  }, [scheduleNext, clearTimer, active]);

  const goTo = React.useCallback(
    (idx: number): void => {
      const len = SLIDES.length;
      const safe = ((idx % len) + len) % len;
      setActive(safe);
      // resetta il countdown dopo un cambio manuale
      scheduleNext();
    },
    [scheduleNext],
  );

  const prev = React.useCallback((): void => goTo(active - 1), [active, goTo]);
  const next = React.useCallback((): void => goTo(active + 1), [active, goTo]);

  const onTouchStart = React.useCallback(
    (e: React.TouchEvent<HTMLElement>): void => {
      const t0 = e.touches[0];
      touchRef.current = { x: t0.clientX, y: t0.clientY };
    },
    [],
  );

  const onTouchEnd = React.useCallback(
    (e: React.TouchEvent<HTMLElement>): void => {
      if (!touchRef.current) return;

      const t1 = e.changedTouches[0];
      const dx = t1.clientX - touchRef.current.x;
      const dy = t1.clientY - touchRef.current.y;
      touchRef.current = null;

      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        void (dx > 0 ? prev() : next());
      }
    },
    [prev, next],
  );

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
                  style={{ objectPosition: s.objectPosition ?? "center" }}
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
