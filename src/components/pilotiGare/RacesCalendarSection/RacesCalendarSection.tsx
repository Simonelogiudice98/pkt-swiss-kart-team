"use client";

import * as React from "react";
import { Container, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import s from "./RacesCalendarSection.module.scss";
import { RaceEvent } from "@/types/types";

const MOCK_RACES: RaceEvent[] = [
  {
    id: "r1",
    title: "Round 1 — Lonato",
    date: "12–13 Apr 2026",
    track: "South Garda Karting",
    posterUrl:
      "https://images.unsplash.com/photo-1633997727088-85d4c40e822f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FyYSUyMGdvJTIwa2FydHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "r2",
    title: "Round 2 — Cremona",
    date: "10–11 May 2026",
    track: "Cremona Circuit",
    posterUrl:
      "https://images.unsplash.com/photo-1508550794981-ed0e94d56589?auto=format&fit=crop&w=1800&q=80",
  },
];

export default function RacesCalendarSection() {
  const t = useTranslations("RacesCalendar");
  const races = MOCK_RACES;

  return (
    <section className={s.section} id="gare">
      <Container maxWidth="lg" className={s.container}>
        <header className={s.sectionHeader}>
          <div className={s.headerTop}>
            <div className={s.kickerRow}>
              <span className={s.kickerDot} />
              <span className={s.kickerText}>{t("kicker")}</span>
            </div>
          </div>

          <h2 className={s.title}>{t("title")}</h2>

          <p className={s.subtitle}>{t("lead")}</p>

          <div className={s.sectionRule} />
        </header>

        <Grid container spacing={3}>
          {races.map((r) => (
            <Grid key={r.id} size={{ xs: 12, md: 6 }}>
              <div className={s.raceCard}>
                <div
                  className={s.poster}
                  style={{ backgroundImage: `url(${r.posterUrl})` }}
                />
                <div className={s.raceBody}>
                  <div className={s.raceDate}>{r.date}</div>
                  <div className={s.raceTitle}>{r.title}</div>
                  <div className={s.raceTrack}>{r.track}</div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
