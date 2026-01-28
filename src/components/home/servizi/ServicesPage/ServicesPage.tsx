"use client";

import * as React from "react";
import { Box, Container } from "@mui/material";
import { useTranslations } from "next-intl";

import EngineeringIcon from "@mui/icons-material/Engineering";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import AssistanceSection from "../assistanceSection/AssistanceSection";
import KartingSchoolSection from "../kartingSchoolSection/KartingSchoolSection";
import s from "./ServicesPage.module.scss";

export default function ServicesPage() {
  const t = useTranslations("Services");

  const nav = [
    { id: "assistenza", label: t("nav.assistance"), Icon: EngineeringIcon },
    { id: "scuola-karting", label: t("nav.school"), Icon: SchoolIcon },
  ];

  const highlights = [
    { Icon: EngineeringIcon, title: t("highlights.0.title"), text: t("highlights.0.text") },
    { Icon: SchoolIcon, title: t("highlights.1.title"), text: t("highlights.1.text") },
    { Icon: TrendingUpIcon, title: t("highlights.2.title"), text: t("highlights.2.text") },
  ];

  return (
    <Box className={s.page}>
      <Container maxWidth="lg" className={s.container}>
        <header className={s.pageHeader}>
          <div className={s.kickerRow}>
            <span className={s.kickerDot} />
            <span className={s.kickerText}>{t("kicker")}</span>
          </div>

          <h1 className={s.title}>{t("title")}</h1>

          <p className={s.subtitle}>{t("lead")}</p>

          <nav className={s.navRow} aria-label={t("nav.ariaLabel")}>
            {nav.map(({ id, label, Icon }) => (
              <a key={id} href={`#${id}`} className={s.navPill}>
                <Icon className={s.navIcon} />
                {label}
              </a>
            ))}
          </nav>

          <div className={s.sectionRule} />
        </header>

        {/* NUOVO: riempie spazio e separa meglio header -> sezioni */}
        <section className={s.highlights} aria-label={t("highlightsAria")}>
          {highlights.map(({ Icon, title, text }, idx) => (
            <div key={idx} className={s.highlightCard}>
              <div className={s.highlightIconWrap} aria-hidden="true">
                <Icon className={s.highlightIcon} />
              </div>
              <div className={s.highlightTitle}>{title}</div>
              <div className={s.highlightText}>{text}</div>
            </div>
          ))}
        </section>

        <AssistanceSection />

        <div className={s.sectionDivider} />

        <KartingSchoolSection />
      </Container>
    </Box>
  );
}
