"use client";

import * as React from "react";
import { Container, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import s from "./RacesCalendarSection.module.scss";

type RaceItem = { id: string; photoUrl: string };

export default function RacesCalendarSection() {
  const t = useTranslations("RacesCalendar");
  const [races, setRaces] = React.useState<RaceItem[]>([]);

  React.useEffect(() => {
    fetch("/api/races")
      .then((r) => r.json())
      .then(setRaces)
      .catch(console.error);
  }, []);

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
                <Image
                  src={r.photoUrl}
                  alt="Locandina gara"
                  width={800}
                  height={1200}
                  className={s.posterImg}
                  style={{ width: "100%", height: "auto" }}
                  unoptimized
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
