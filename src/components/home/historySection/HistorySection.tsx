"use client";

import * as React from "react";
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  Fade,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useInView } from "react-intersection-observer";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Image from "next/image";
import { useTranslations } from "next-intl";

import FlagIcon from "@mui/icons-material/Flag";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import { HistoryItem } from "@/types/types";

import styles from "./HistorySection.module.scss";

function ItemIcon({ icon }: { icon?: HistoryItem["icon"] }) {
  const sx = { fontSize: 18, color: "rgba(10,12,16,0.9)" };

  switch (icon) {
    case "trophy":
      return <EmojiEventsIcon sx={sx} />;
    case "graduation":
      return <SchoolIcon sx={sx} />;
    case "flag":
    default:
      return <FlagIcon sx={sx} />;
  }
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <Box
      ref={ref}
      sx={{
        transform: inView ? "translateY(0px)" : "translateY(14px)",
        opacity: inView ? 1 : 0,
        transition: `transform 520ms ease ${delay}ms, opacity 520ms ease ${delay}ms`,
      }}
    >
      <Fade in={inView} timeout={520}>
        <Box>{children}</Box>
      </Fade>
    </Box>
  );
}

export default function HistorySection() {
  const t = useTranslations("History");
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const items = t.raw("items") as HistoryItem[];

  return (
    <Box component="section" id="history" className={styles.section}>
      <Container className={styles.container}>
        <Reveal>
          <Stack className={styles.header}>
            <Typography className={styles.kicker}>{t("kicker")}</Typography>
            <Typography variant="h3" className={styles.title}>{t("title")}</Typography>
            <Typography className={styles.lead}>{t("lead")}</Typography>
          </Stack>
        </Reveal>

        <Box className={styles.timelineWrap}>
          <Timeline
            position={mdUp ? "alternate" : "right"}
            className={styles.timeline}
          >
            {items.map((it, idx) => (
              <TimelineItem
                key={`${it.year}-${it.title}-${idx}`}
                className={styles.timelineItem}
              >
                <TimelineOppositeContent className={styles.year}>
                  {it.year}
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot className={styles.dot}>
                    <ItemIcon icon={it.icon} />
                  </TimelineDot>

                  {idx !== items.length - 1 && (
                    <TimelineConnector className={styles.connector} />
                  )}
                </TimelineSeparator>

                <TimelineContent className={styles.timelineContent}>
                  <Reveal delay={idx * 70}>
                    <Paper elevation={0} className={styles.card}>
                      {it.image && (
                        <Box className={styles.imageWrap}>
                          <Image
                            src={it.image}
                            alt={it.imageAlt ?? ""}
                            fill
                            sizes="(max-width: 900px) 92vw, 520px"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                          />
                          <Box aria-hidden className={styles.imageOverlay} />
                        </Box>
                      )}

                      <Box className={styles.cardBody}>
                        <Typography className={styles.cardTitle}>
                          {it.title}
                        </Typography>
                        <Typography className={styles.cardDesc}>
                          {it.desc}
                        </Typography>
                      </Box>
                    </Paper>
                  </Reveal>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </Container>
    </Box>
  );
}
