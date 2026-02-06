"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import s from "./AssistanceSection.module.scss";
import { TabKey } from "@/types/types";


export default function AssistanceSection() {
  const t = useTranslations("Services.assistance");

  
  const [activeTab, setActiveTab] = React.useState<TabKey>("trackside");
  const isSingleCard = activeTab === "setup";
  
  const points = [
    { Icon: SportsMotorsportsIcon, text: t("points.0") },
    { Icon: BuildCircleIcon, text: t("points.1") },
    { Icon: LocalShippingIcon, text: t("points.2") },
  ];
  
  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "trackside", label: t("pill1") },
    { key: "setup", label: t("pill2") },
    { key: "logistica", label: t("pill3") },
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

            {/* testo “generico” uguale per tutti */}
            <p className={s.highlightText}>{t("highlightText")}</p>

            <div className={s.pills} role="tablist" aria-label={t("tabsAriaLabel")}>
              {tabs.map((tab) => {
                const selected = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    className={`${s.pill} ${selected ? s.pillAccent : ""}`}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {isSingleCard ? (
              <div className={s.miniSplit}>
                <div className={`${s.miniBox} ${s.miniBoxFull}`}>
                  <div className={s.miniLabel}>{t("tabs.setup.singleTitle")}</div>
                  <p className={s.miniText}>{t("tabs.setup.singleText")}</p>
                </div>
              </div>
            ) : (
              <div className={s.miniSplit}>
                <div className={s.miniBox}>
                  <div className={s.miniLabel}>
                    {t(`tabs.${activeTab}.miniLeftTitle`)}
                  </div>
                  <p className={s.miniText}>
                    {t(`tabs.${activeTab}.miniLeftText`)}
                  </p>
                </div>

                <div className={s.miniBox}>
                  <div className={s.miniLabel}>
                    {t(`tabs.${activeTab}.miniRightTitle`)}
                  </div>
                  <p className={s.miniText}>
                    {t(`tabs.${activeTab}.miniRightText`)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
