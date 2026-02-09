"use client";

import * as React from "react";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { CSSProperties } from "react";

import s from "./CustomCarousel.module.scss";

export type CarouselImage = {
  src: string;
  alt: string;
  objectPosition?: string;
  captionTitle?: string;
  captionText?: string;
};

type Labels = {
  prev: string;
  next: string;
  carouselLabel: string;
  dotsLabel: string;
  swipeHint?: string;
  goTo: (index: number) => string;
};

type Props = {
  images: CarouselImage[];
  labels: Labels;

  autoplayMs?: number;
  sizes?: string;
  className?: string;
  frameClassName?: string;
  priorityFirst?: boolean;
  quality?: number;

  frameHeight?: number | string;
  fit?: "cover" | "contain";

  // ✅ NEW
  captionVariant?: "none" | "overlay" | "below"; // default "none"
};

export default function CustomCarousel({
  images,
  labels,
  autoplayMs = 6500,
  sizes = "(max-width: 900px) 92vw, 600px",
  className,
  frameClassName,
  priorityFirst = true,
  quality = 80,
  frameHeight,
  fit = "cover",
  captionVariant = "none",
}: Props) {
  const [idx, setIdx] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const count = images.length;

  const prev = React.useCallback(() => {
    setIdx((v) => (v === 0 ? count - 1 : v - 1));
  }, [count]);

  const next = React.useCallback(() => {
    setIdx((v) => (v === count - 1 ? 0 : v + 1));
  }, [count]);

  React.useEffect(() => {
    if (isPaused || count <= 1) return;
    const id = window.setInterval(() => next(), autoplayMs);
    return () => window.clearInterval(id);
  }, [isPaused, next, count, autoplayMs]);

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

  if (count === 0) return null;

  const active = images[idx];

  const frameStyle: CSSProperties | undefined = frameHeight
    ? { height: typeof frameHeight === "number" ? `${frameHeight}px` : frameHeight }
    : undefined;

  const hasCaption = Boolean(active.captionTitle || active.captionText);

  return (
    <div className={`${s.root} ${className ?? ""}`}>
      <div className={s.slider}>
        <button
          className={s.navBtn}
          onClick={prev}
          aria-label={labels.prev}
          type="button"
          disabled={count <= 1}
        >
          <ChevronLeftIcon />
        </button>

        <div className={s.stage}>
          <div
            className={`${s.frame} ${frameClassName ?? ""}`}
            style={frameStyle}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label={labels.carouselLabel}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <div className={s.fadeStage}>
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                sizes={sizes}
                className={s.img}
                priority={priorityFirst ? idx === 0 : false}
                quality={quality}
                style={{
                  objectFit: fit,
                  objectPosition: active.objectPosition ?? "center",
                }}
              />
            </div>

            <div className={s.counter}>
              <span className={s.counterAccent}>{idx + 1}</span>
              <span className={s.counterSep}>/</span>
              <span className={s.counterTotal}>{count}</span>
            </div>

            {labels.swipeHint ? <div className={s.swipeHint}>{labels.swipeHint}</div> : null}

            {/* ✅ caption overlay */}
            {captionVariant === "overlay" && hasCaption ? (
              <div className={s.captionOverlay} aria-hidden="true">
                {active.captionTitle ? (
                  <div className={s.captionTitle}>{active.captionTitle}</div>
                ) : null}
                {active.captionText ? (
                  <div className={s.captionText}>{active.captionText}</div>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* ✅ caption below */}
          {captionVariant === "below" && hasCaption ? (
            <div className={s.captionBelow}>
              {active.captionTitle ? <div className={s.captionTitle}>{active.captionTitle}</div> : null}
              {active.captionText ? <div className={s.captionText}>{active.captionText}</div> : null}
            </div>
          ) : null}

          {count > 1 && (
            <div className={s.dots} aria-label={labels.dotsLabel}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${s.dot} ${i === idx ? s.dotActive : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={labels.goTo(i + 1)}
                  aria-current={i === idx ? "true" : "false"}
                  type="button"
                />
              ))}
            </div>
          )}
        </div>

        <button
          className={s.navBtn}
          onClick={next}
          aria-label={labels.next}
          type="button"
          disabled={count <= 1}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
