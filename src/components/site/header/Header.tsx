"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import s from "./Header.module.scss";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { locales, type Locale } from "@/i18n";
import { socials } from "@/lib/utils";

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] ?? "";
  const locale: Locale = isLocale(first) ? first : "it";

  const [open, setOpen] = useState(false);

  const menuBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 24,
  });

  const links = useMemo(
    () => [
      { href: `/${locale}`, label: t("home") },
      { href: `/${locale}/servizi`, label: t("services") },
      { href: `/${locale}/piloti-gare`, label: t("driversRaces") },
    ],
    [locale, t],
  );

  const currentPath = pathname.replace(/\/$/, "");

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: trigger ? "#061445" : "#061445",
          backdropFilter: "blur(10px)",
          borderBottom: trigger
            ? "1px solid rgba(255,210,0,0.22)"
            : "1px solid rgba(255,210,0,0.10)",
          transition: "background 220ms ease, border-color 220ms ease",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            px: { xs: 2, md: 3 },
            minHeight: { xs: 64, md: 72 },

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href={`/${locale}`}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: 140, md: 220 },
                height: { xs: 44, md: 80 },
                backgroundColor: "white",
              }}
            >
              <Image
                src="/images/pkt_logo.svg"
                alt="PKT Swiss Kart Team"
                fill
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.55))",
                }}
              />
            </Box>
          </Link>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <div className={s.socialRow} aria-label="Social">
              <a
                className={`${s.socialBtn} ${s.ig}`}
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon fontSize="small" />
              </a>

              <a
                className={`${s.socialBtn} ${s.fb}`}
                href={socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <FacebookIcon fontSize="small" />
              </a>

              <a
                className={`${s.socialBtn} ${s.tk}`}
                href={socials.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                title="TikTok"
              >
                <MusicNoteIcon fontSize="small" />
              </a>

              <a
                className={`${s.socialBtn} ${s.wa}`}
                href={socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <WhatsAppIcon fontSize="small" />
              </a>
            </div>

            <LocaleSwitcher />

            <IconButton
              aria-label="Menu"
              color="inherit"
              onClick={() => setOpen(true)}
              ref={menuBtnRef}
            >
              <MenuIcon />
            </IconButton>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <LocaleSwitcher />
            <IconButton
              aria-label="Menu"
              color="inherit"
              onClick={() => setOpen(true)}
              ref={menuBtnRef}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        disableRestoreFocus
        slots={{ transition: Transition }}
        slotProps={{
          transition: {
            onEntered: () => closeBtnRef.current?.focus(),
            onExited: () => menuBtnRef.current?.focus(),
          },
          paper: { sx: { background: "transparent" } },
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            overflow: "hidden",
            background:
              "radial-gradient(700px 260px at 120px 70px, rgba(255,255,255,0.18), transparent 60%)," +
              "radial-gradient(1000px 500px at 20% 0%, rgba(11,42,111,0.60), rgba(10,12,16,0.90))",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 5,
              height: "100%",
              background:
                "linear-gradient(180deg, rgba(255,210,0,1), rgba(229,57,53,1))",
              opacity: 0.9,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.06,
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="120" height="120" filter="url(%23n)" opacity=".6"/></svg>\')',
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
            }}
          >
            <Link
              href={`/${locale}`}
              onClick={() => setOpen(false)}
              style={{ display: "inline-flex" }}
            >
              <Box sx={{ position: "relative", width: 220, height: 80 }}>
                <Image
                  src="/images/pkt_logo.svg"
                  alt="PKT Swiss Kart Team"
                  fill
                  style={{
                    objectFit: "contain",
                    filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.55))",
                  }}
                />
              </Box>
            </Link>

            <Stack direction="row" spacing={1} alignItems="center">
              <div className={s.socialRow} aria-label="Social">
                <a
                  className={`${s.socialBtn} ${s.ig}`}
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon fontSize="small" />
                </a>
                <a
                  className={`${s.socialBtn} ${s.fb}`}
                  href={socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon fontSize="small" />
                </a>
                <a
                  className={`${s.socialBtn} ${s.tk}`}
                  href={socials.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                >
                  <MusicNoteIcon fontSize="small" />
                </a>
              </div>

              <IconButton
                aria-label="Close menu"
                color="inherit"
                onClick={() => setOpen(false)}
                ref={closeBtnRef}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box
            sx={{
              height: "calc(100% - 72px)",
              display: "grid",
              placeItems: "center",
              px: 2,
            }}
          >
            <Stack spacing={1.0} sx={{ width: "min(520px, 92vw)" }}>
              {links.map((x) => {
                const active = currentPath === x.href.replace(/\/$/, "");

                return (
                  <ButtonBase
                    key={x.href}
                    onClick={() => {
                      setOpen(false);
                      router.push(x.href);
                    }}
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      py: { xs: 1.0, sm: 1.15 },
                      borderRadius: 2,
                      transition: "transform 160ms ease",
                      "&:hover": { transform: "translateY(-1px)" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 900,
                        letterSpacing: 3,
                        textTransform: "uppercase",
                        fontSize: { xs: 18, sm: 22 },
                        color: active
                          ? "secondary.main"
                          : "rgba(255,255,255,0.92)",
                        display: "inline-block",
                        position: "relative",
                        pb: 0.5,
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: "50%",
                          bottom: 0,
                          width: active ? "52%" : "0%",
                          height: 2,
                          background:
                            "linear-gradient(90deg, #ffd200, #e53935)",
                          transform: "translateX(-50%)",
                          transition: "width 160ms ease",
                        },
                        "&:hover::after": {
                          width: "52%",
                        },
                      }}
                    >
                      {x.label}
                    </Typography>
                  </ButtonBase>
                );
              })}

              <Box sx={{ pt: 2, display: "flex", justifyContent: "center" }}>
                <LocaleSwitcher />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
