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

type HistoryItem = {
  year: string;
  title: string;
  desc: string;
  icon?: "flag" | "trophy" | "graduation";
  image?: string;
  imageAlt?: string;
};

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
    <Box
      component="section"
      id="history"
      sx={{
        py: { xs: 9, md: 12 },
        position: "relative",
        overflowX: "clip",
        "@supports not (overflow-x: clip)": { overflowX: "hidden" },
        background: "linear-gradient(180deg, rgba(10,12,16,0.96), rgba(10,12,16,0.99))",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(900px 420px at 18% 22%, rgba(11,42,111,0.26), transparent 60%)," +
            "radial-gradient(620px 280px at 82% 65%, rgba(255,210,0,0.07), transparent 65%)",
          filter: "blur(10px)",
          transform: "scale(1.05)",
          opacity: 0.95,
        },
      }}
    >
      <Container sx={{ position: "relative" }}>
        <Reveal>
          <Stack spacing={1.5} sx={{ maxWidth: 760 }}>
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.70)",
              }}
            >
              {t("kicker")}
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 1000,
                letterSpacing: 1,
                textTransform: "uppercase",
                fontSize: { xs: 30, md: 40 },
                lineHeight: 1.12,
                color: "#fff",
                position: "relative",
                "&::after": {
                  content: '""',
                  display: "block",
                  mt: 1.5,
                  width: 92,
                  height: 3,
                  borderRadius: 999,
                  background:
                    "linear-gradient(90deg, rgba(255,210,0,0.95), rgba(255,210,0,0.15))",
                },
              }}
            >
              {t("title")}
            </Typography>

            <Typography sx={{ color: "rgba(255,255,255,0.84)", lineHeight: 1.75, maxWidth: "62ch" }}>
              {t("lead")}
            </Typography>
          </Stack>
        </Reveal>

        <Box sx={{ mt: { xs: 4, md: 5 } }}>
          <Timeline position={mdUp ? "alternate" : "right"} sx={{ p: 0, m: 0 }}>
            {items.map((it, idx) => (
              <TimelineItem key={`${it.year}-${it.title}-${idx}`} sx={{ minHeight: 120 }}>
                <TimelineOppositeContent
                  sx={{
                    flex: 0.22,
                    pt: 1.2,
                    color: "rgba(255,255,255,0.60)",
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    minWidth: 72,
                  }}
                >
                  {it.year}
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      bgcolor: "rgba(255,210,0,0.92)",
                      boxShadow: "0 0 0 6px rgba(255,210,0,0.08)",
                      m: 0,
                      mt: 1.1,
                      width: 34,
                      height: 34,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <ItemIcon icon={it.icon} />
                  </TimelineDot>

                  {idx !== items.length - 1 && (
                    <TimelineConnector
                      sx={{
                        bgcolor: "rgba(255,210,0,0.18)",
                        width: 2,
                        borderRadius: 999,
                      }}
                    />
                  )}
                </TimelineSeparator>

                <TimelineContent sx={{ pt: 0, pb: 3 }}>
                  <Reveal delay={idx * 70}>
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        backdropFilter: "blur(14px)",
                        boxShadow: "0 22px 70px rgba(0,0,0,0.40)",
                        maxWidth: 520,
                        overflow: "hidden",
                        transition: "transform 220ms ease, border-color 220ms ease",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          borderColor: "rgba(255,210,0,0.18)",
                        },
                      }}
                    >
                      {it.image && (
                        <Box sx={{ position: "relative", aspectRatio: "16 / 9" }}>
                          <Image
                            src={it.image}
                            alt={it.imageAlt ?? ""}
                            fill
                            sizes="(max-width: 900px) 92vw, 520px"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                          />
                          <Box
                            aria-hidden
                            sx={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55))",
                            }}
                          />
                        </Box>
                      )}

                      <Box sx={{ px: 2, py: 1.75 }}>
                        <Typography
                          sx={{
                            fontWeight: 1000,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            color: "rgba(255,255,255,0.94)",
                            fontSize: 14,
                          }}
                        >
                          {it.title}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.75,
                            color: "rgba(255,255,255,0.78)",
                            lineHeight: 1.6,
                            fontSize: 14,
                          }}
                        >
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
