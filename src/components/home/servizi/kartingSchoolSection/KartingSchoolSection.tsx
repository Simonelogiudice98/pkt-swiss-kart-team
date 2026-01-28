"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GroupsIcon from "@mui/icons-material/Groups";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


import s from "./KartingSchoolSection.module.scss";

const MOCK_IMAGES = [
  { src: "/images/hero-kart.jpg", alt: "Kart in pista" },
  { src: "/images/founder.jpg", alt: "Team" },
  { src: "/images/about-1.jpg", alt: "Allenamento" },
];

export default function KartingSchoolSection() {
  const t = useTranslations("Services.kartingSchool");
  const [idx, setIdx] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const prev = React.useCallback(
    () => setIdx((v) => (v === 0 ? MOCK_IMAGES.length - 1 : v - 1)),
    []
  );
  const next = React.useCallback(
    () => setIdx((v) => (v === MOCK_IMAGES.length - 1 ? 0 : v + 1)),
    []
  );

  // Optional: autoplay morbido (si ferma se hover/focus)
  React.useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(() => next(), 6500);
    return () => window.clearInterval(id);
  }, [isPaused, next]);

  // Tastiera: frecce sx/dx quando il frame è focusato
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // Swipe su mobile
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

  const points = [
    { Icon: EmojiEventsIcon, text: t("points.0") },
    { Icon: PsychologyIcon, text: t("points.1") },
    { Icon: GroupsIcon, text: t("points.2") },
  ];

  const active = MOCK_IMAGES[idx];

  return (
    <section className={s.section} id="scuola-karting">
      <div className={s.layout}>
        <div className={s.left}>
          <div className={s.slider}>
            <button
              className={s.navBtn}
              onClick={prev}
              aria-label={t("prev")}
              type="button"
            >
              <ChevronLeftIcon />
            </button>

            <div
              className={s.frame}
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
              {/* Cross-fade (premium) */}
              <div className={s.fadeStage}>
                <Image
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 600px"
                  className={s.img}
                  priority={idx === 0}
                />
              </div>

              <div className={s.slideOverlay} />

              {/* Counter badge */}
              <div className={s.counter}>
                <span className={s.counterAccent}>{idx + 1}</span>
                <span className={s.counterSep}>/</span>
                <span className={s.counterTotal}>{MOCK_IMAGES.length}</span>
              </div>

              {/* small hint on mobile */}
              <div className={s.swipeHint}>{t("swipeHint")}</div>
            </div>

            <button
              className={s.navBtn}
              onClick={next}
              aria-label={t("next")}
              type="button"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className={s.dots} aria-label={t("dotsLabel")}>
            {MOCK_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`${s.dot} ${i === idx ? s.dotActive : ""}`}
                onClick={() => setIdx(i)}
                aria-label={t("goTo", { index: i + 1 })}
                aria-current={i === idx ? "true" : "false"}
                type="button"
              />
            ))}
          </div>
        </div>

        <div className={s.right}>
          <h2 className={s.title}>{t("title")}</h2>
          <p className={s.lead}>{t("lead")}</p>

          <ul className={s.bullets}>
            {points.map(({ Icon, text }, i) => (
              <li key={i} className={s.bulletItem}>
                <span className={s.bulletIconWrap} aria-hidden="true">
                  <Icon className={s.bulletIcon} />
                </span>
                <span className={s.bulletText}>{text}</span>
              </li>
            ))}
          </ul>

          <div className={s.tip}>
            <div className={s.tipLabel}>{t("tipLabel")}</div>
            <p className={s.tipText}>{t("tipText")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
