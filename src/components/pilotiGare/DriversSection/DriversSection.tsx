"use client";

import * as React from "react";
import { Container, Grid, Box, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";

import PilotCard, { Pilot } from "../PilotCard/PilotCard";
import s from "./DriversSection.module.scss";
import { PilotApi } from "@/types/types";

function isPilotApi(x: unknown): x is PilotApi {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  const okBase = typeof o.id === "string" && typeof o.name === "string";
  const okPhoto = o.photoFileId === undefined || typeof o.photoFileId === "string";
  return okBase && okPhoto;
}

function isPilotApiArray(x: unknown): x is PilotApi[] {
  return Array.isArray(x) && x.every(isPilotApi);
}

const SKELETON_COUNT = 3;

export default function DriversSection() {
  const t = useTranslations("DriversRaces");

  const [pilots, setPilots] = React.useState<Pilot[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [imagesLoading, setImagesLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const driveThumbUrl = (fileId: string, size = 800) =>
  `https://lh3.googleusercontent.com/d/${fileId}=s${size}`;

  React.useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/pilots", { cache: "no-store" });
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const json: unknown = await res.json();
        if (!isPilotApiArray(json)) {
          throw new Error("Formato risposta /api/pilots non valido");
        }

        const mapped: Pilot[] = json.map((x) => ({
          id: x.id,
          name: x.name,
          category: "DRIVER",
          since: new Date().getFullYear(),
          photoUrl: x.photoFileId ? driveThumbUrl(x.photoFileId, 800) : undefined,

        }));

        if (alive) setPilots(mapped);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Errore nel caricamento piloti";
        if (alive) setError(msg);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  React.useEffect(() => {
    if (loading) return; 
    if (pilots.length === 0) {
      setImagesLoading(false);
      return;
    }

    const urls = Array.from(
      new Set(
        pilots
          .map((p) => p.photoUrl)
          .filter((u): u is string => typeof u === "string" && u.length > 0)
      )
    );

    if (urls.length === 0) {
      setImagesLoading(false);
      return;
    }

    let cancelled = false;
    setImagesLoading(true);

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); 
        img.src = src;
      });

    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, 6000));

    Promise.race([Promise.all(urls.map(preload)).then(() => undefined), timeout]).then(() => {
      if (!cancelled) setImagesLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [loading, pilots]);

  const gridIsLoading = loading || imagesLoading;
  const skeletonCount = loading ? SKELETON_COUNT : Math.max(pilots.length, SKELETON_COUNT);

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

        {error && (
          <div style={{ color: "rgba(255,255,255,0.75)", marginBottom: 16 }}>
            Errore: {error}
          </div>
        )}

        {!loading && imagesLoading && (
          <Box className={s.imagesLoaderRow} aria-live="polite">
            <CircularProgress size={18} />
            <span className={s.imagesLoaderText}>Caricamento piloti...</span>
          </Box>
        )}

        <Grid container spacing={3}>
          {gridIsLoading
            ? Array.from({ length: skeletonCount }).map((_, idx) => (
                <Grid key={`sk-${idx}`} size={{ xs: 12, sm: 6, md: 4 }}>
                  <div className={s.skeletonCard} />
                </Grid>
              ))
            : pilots.map((p) => (
                <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <PilotCard pilot={p} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </section>
  );
}
