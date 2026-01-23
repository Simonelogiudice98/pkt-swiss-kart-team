"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import { useRouter } from "next/navigation";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import * as React from "react";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { locales, type Locale } from "@/i18n";

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

type SocialLinks = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  whatsapp?: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Header({}: { socials?: SocialLinks }) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] ?? "";
  const locale: Locale = isLocale(first) ? first : "it";

  const [open, setOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 24,
  });

  const links = useMemo(
    () => [
      { href: `/${locale}`, label: t("home") },
      { href: `/${locale}/servizi`, label: t("services") },
      { href: `/${locale}/piloti-gare`, label: t("driversRaces") },
      { href: `/${locale}/contatti`, label: t("contact") },
    ],
    [locale, t],
  );

  const currentPath = pathname.replace(/\/$/, "");

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: trigger ? "rgba(10,12,16,0.88)" : "rgba(10,12,16,0.18)",
          backdropFilter: "blur(10px)",
          borderBottom: trigger
            ? "1px solid rgba(255,210,0,0.22)"
            : "1px solid rgba(255,210,0,0.10)",
          transition: "background 220ms ease, border-color 220ms ease",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            px: 2,
            minHeight: { xs: 64, md: 72 },
          }}
        >
          <Link
            href={`/${locale}`}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <Image
              src="/images/pkt_logo.svg"
              alt="PKT Swiss Kart Team"
              width={180}
              height={60}
              priority
              style={{
                height: "auto",
                width: "clamp(120px, 26vw, 180px)",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.55))",
              }}
            />
          </Link>

          <Box sx={{ flex: 1 }} />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <IconButton
              aria-label="Instagram"
              color="inherit"
              href="https://www.instagram.com/_pktswisskartteam_?igsh=MXA3ZDV5MmlsNHlwMw=="
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="Facebook"
              color="inherit"
              href="/"
              target="_blank"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="TikTok"
              color="inherit"
              href="/"
              target="_blank"
            >
              <MusicNoteIcon />
            </IconButton>
            <IconButton
              aria-label="WhatsApp"
              color="inherit"
              href="/"
              target="_blank"
            >
              <WhatsAppIcon />
            </IconButton>

            <LocaleSwitcher />

            <IconButton
              aria-label="Menu"
              color="inherit"
              onClick={() => setOpen(true)}
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
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: { xs: 64, md: 72 } }} />
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            background: "transparent",
          },
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
              <Image
                src="/images/pkt_logo.svg"
                alt="PKT Swiss Kart Team"
                width={180}
                height={60}
                priority
                style={{ filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.55))" }}
              />
            </Link>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                aria-label="Instagram"
                color="inherit"
                href="/"
                target="_blank"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="Facebook"
                color="inherit"
                href="/"
                target="_blank"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="TikTok"
                color="inherit"
                href="/"
                target="_blank"
              >
                <MusicNoteIcon />
              </IconButton>

              <IconButton
                aria-label="Close menu"
                color="inherit"
                onClick={() => setOpen(false)}
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
