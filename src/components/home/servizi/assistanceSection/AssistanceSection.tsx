"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import s from "./AssistanceSection.module.scss";

export default function AssistanceSection() {
  const t = useTranslations("Services.assistance");

  const points = [
    { Icon: SportsMotorsportsIcon, text: t("points.0") },
    { Icon: BuildCircleIcon, text: t("points.1") },
    { Icon: LocalShippingIcon, text: t("points.2") },
  ];

  return (
    <section className={s.section} id="assistenza">
      <header className={s.header}>
        <h2 className={s.title}>{t("title")}</h2>
        <p className={s.lead}>{t("lead")}</p>
      </header>

      <div className={s.layout}>
        <div className={s.left}>
          <ul className={s.bullets}>
            {points.map(({ Icon, text }, idx) => (
              <li key={idx} className={s.bulletItem}>
                <span className={s.bulletIconWrap} aria-hidden="true">
                  <Icon className={s.bulletIcon} />
                </span>
                <span className={s.bulletText}>{text}</span>
              </li>
            ))}
          </ul>

          <div className={s.note}>
            <div className={s.noteLabel}>{t("noteLabel")}</div>
            <p className={s.noteText}>{t("noteText")}</p>
          </div>
        </div>

        <div className={s.right}>
          <div className={s.highlightCard}>
            <div className={s.highlightTitle}>{t("highlightTitle")}</div>
            <p className={s.highlightText}>{t("highlightText")}</p>

            <div className={s.pills}>
              <span className={`${s.pill} ${s.pillAccent}`}>{t("pill1")}</span>
              <span className={s.pill}>{t("pill2")}</span>
              <span className={s.pill}>{t("pill3")}</span>
            </div>

            <div className={s.miniSplit}>
              <div className={s.miniBox}>
                <div className={s.miniLabel}>{t("miniLeftTitle")}</div>
                <p className={s.miniText}>{t("miniLeftText")}</p>
              </div>
              <div className={s.miniBox}>
                <div className={s.miniLabel}>{t("miniRightTitle")}</div>
                <p className={s.miniText}>{t("miniRightText")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
