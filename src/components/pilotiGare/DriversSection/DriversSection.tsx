"use client";

import * as React from "react";
import { Container, Grid } from "@mui/material";
import { useTranslations } from "next-intl";

import PilotCard, { Pilot } from "../PilotCard/PilotCard";
import s from "./DriversSection.module.scss";

const MOCK_PILOTS: Pilot[] = [
  {
    id: "p1",
    name: "Marco Rossi",
    category: "OKJ",
    since: 2022,
    photoUrl:
      "https://images.unsplash.com/photo-1505570554449-69ce7d4fa36b?auto=format&fit=crop&fm=jpg&q=80&w=1800",
  },
  {
    id: "p2",
    name: "Luca Bianchi",
    category: "MINI GR.3",
    since: 2023,
    photoUrl:
      "https://images.unsplash.com/photo-1508550794981-ed0e94d56589?auto=format&fit=crop&fm=jpg&q=80&w=1800",
  },
  {
    id: "p3",
    name: "Andrea Verdi",
    category: "KZ2",
    since: 2021,
    photoUrl:
      "https://images.unsplash.com/photo-1759390133328-6ac469a7ddc6?auto=format&fit=crop&fm=jpg&q=80&w=1800",
  },
];

export default function DriversSection() {
  const t = useTranslations("DriversRaces");
  const pilots = MOCK_PILOTS;

  return (
    <section className={s.section} id="piloti">
      <Container maxWidth="lg" className={s.container}>
        <header className={s.sectionHeader}>
          <div className={s.headerTop}>
            <div className={s.kickerRow}>
              <span className={s.kickerDot} />
              <span className={s.kickerText}>{t("kicker")}</span>
            </div>
            <span className={s.meta}>{t("badge")}</span>
          </div>

          <h2 className={s.title}>{t("title")}</h2>

          <p className={s.subtitle}>{t("lead")}</p>

          <div className={s.sectionRule} />
        </header>

        <Grid container spacing={3}>
          {pilots.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <PilotCard pilot={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
