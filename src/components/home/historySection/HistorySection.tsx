"use client";

import * as React from "react";
import { Box, Container, Paper, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useTranslations } from "next-intl";

type HistoryItem = {
  year: string;
  title: string;
  desc: string;
};

export default function HistorySection() {
  const t = useTranslations("History");
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Legge l’array dal JSON (next-intl). Deve esistere in it.json/en.json
  const items = t.raw("items") as HistoryItem[];

  return (
    <Box
      component="section"
      id="history"
      sx={{
        py: { xs: 9, md: 12 },
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(10,12,16,0.96), rgba(10,12,16,0.99))",
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
        {/* Header */}
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

          <Typography
            sx={{
              color: "rgba(255,255,255,0.84)",
              lineHeight: 1.75,
              maxWidth: "62ch",
            }}
          >
            {t("lead")}
          </Typography>
        </Stack>

        {/* Timeline */}
        <Box sx={{ mt: { xs: 4, md: 5 } }}>
          <Timeline position={mdUp ? "alternate" : "right"} sx={{ p: 0, m: 0 }}>
            {items.map((it, idx) => (
              <TimelineItem key={`${it.year}-${it.title}-${idx}`} sx={{ minHeight: 110 }}>
                {/* Year */}
                <TimelineOppositeContent
                  sx={{
                    flex: 0.25,
                    pt: 1.2,
                    color: "rgba(255,255,255,0.60)",
                    fontSize: 12,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {it.year}
                </TimelineOppositeContent>

                {/* Dot + line */}
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      bgcolor: "rgba(255,210,0,0.92)",
                      boxShadow: "0 0 0 6px rgba(255,210,0,0.08)",
                      m: 0,
                      mt: 1.2,
                    }}
                  />
                  {idx !== items.length - 1 && (
                    <TimelineConnector
                      sx={{
                        bgcolor: "rgba(255,210,0,0.20)",
                        width: 2,
                        borderRadius: 999,
                      }}
                    />
                  )}
                </TimelineSeparator>

                {/* Card */}
                <TimelineContent sx={{ pt: 0, pb: 3 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      px: 2,
                      py: 1.75,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(14px)",
                      boxShadow: "0 22px 70px rgba(0,0,0,0.40)",
                      maxWidth: 520,
                    }}
                  >
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
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </Container>
    </Box>
  );
}
