"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";
import GroupsIcon from "@mui/icons-material/Groups";


import s from "./KartingSchoolSection.module.scss";
import CustomCarousel, { CarouselImage } from "@/components/ui/custom-carusel/CustomCarusel";
import { SCHOOL_IMAGES } from "../Servizi.config";


export default function KartingSchoolSection() {
  const t = useTranslations("Services.kartingSchool");

  const images: CarouselImage[] = SCHOOL_IMAGES.map((img, i) => ({
    ...img,
    alt: t("imgAlt", { index: i + 1 }),
  }));

  const points = [
    { Icon: EmojiEventsIcon, text: t("points.0") },
    { Icon: PsychologyIcon, text: t("points.1") },
    { Icon: GroupsIcon, text: t("points.2") },
  ];

  return (
    <section className={s.section} id="scuola-karting">
      <div className={s.layout}>
        <div className={s.left}>
          <CustomCarousel
            images={images}
            autoplayMs={6500}
            sizes="(max-width: 900px) 92vw, 600px"
            labels={{
              prev: t("prev"),
              next: t("next"),
              carouselLabel: t("carouselLabel"),
              dotsLabel: t("dotsLabel"),
              swipeHint: t("swipeHint"),
              goTo: (index) => t("goTo", { index }),
            }}
          />
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
