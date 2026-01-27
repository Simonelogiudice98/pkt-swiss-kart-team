"use client";

import * as React from "react";
import Image from "next/image";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import s from "./PilotCard.module.scss";

export type Pilot = {
  id: string;
  name: string;
  category: string;
  since: number;
  photoUrl: string;
};

export default function PilotCard({ pilot }: { pilot: Pilot }) {
  return (
    <Card className={s.card} elevation={0}>
      <CardActionArea className={s.cardAction}>
        <Box className={s.mediaWrap}>
          <Image
            src={pilot.photoUrl}
            alt={pilot.name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            className={s.media}
          />
          <div className={s.mediaOverlay} />
        </Box>

        <CardContent className={s.cardContent}>
          <div className={s.cardTopRow}>
            <span className={s.tag}>{pilot.category}</span>
            <span className={s.tagMuted}>dal {pilot.since}</span>
          </div>

          <Typography component="h3" className={s.cardTitle}>
            {pilot.name}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  );
}
