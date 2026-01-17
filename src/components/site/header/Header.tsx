"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuIcon from "@mui/icons-material/Menu";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // “TikTok-ish” (oppure metti un svg tuo)

import LocaleSwitcher from "@/components/LocaleSwitcher";
import { locales, type Locale } from "@/i18n";

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export default function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] ?? "";
  const locale: Locale = isLocale(first) ? first : "it";

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(
    () => [
      { href: `/${locale}`, label: t("home") },
      { href: `/${locale}/servizi`, label: t("services") },
      { href: `/${locale}/piloti-gare`, label: t("driversRaces") },
      { href: `/${locale}/contatti`, label: t("contact") },
    ],
    [locale, t]
  );

  const transparent = isHome && !scrolled && !open;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={transparent ? 0 : 6}
        sx={{
          backgroundColor: transparent ? "transparent" : "background.paper",
          backdropFilter: transparent ? "none" : "blur(10px)",
          borderBottom: transparent ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
          transition: "all 180ms ease",
        }}
      >
        <Toolbar sx={{ maxWidth: 1100, width: "100%", mx: "auto", px: 2, gap: 1 }}>
          <Link href={`/${locale}`} style={{ display: "inline-flex", alignItems: "center" }}>
            <Image
            src="/images/pkt_logo.svg"
            alt="PKT Swiss Kart Team"
            width={180}
            height={60}
            priority
          />
          </Link>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton aria-label="Instagram" color="inherit" href="#" target="_blank">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Facebook" color="inherit" href="#" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="TikTok" color="inherit" href="#" target="_blank">
              <MusicNoteIcon />
            </IconButton>
            <IconButton aria-label="WhatsApp" color="inherit" href="#" target="_blank">
              <WhatsAppIcon />
            </IconButton>

            {/* il tuo switch: se vuoi lo stile MUI, possiamo trasformarlo in Button */}
            <LocaleSwitcher />

            <IconButton aria-label="Menu" color="inherit" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <Box sx={{ fontWeight: 900, letterSpacing: 1, mb: 1 }}>Menu</Box>

          <List sx={{ display: "grid", gap: 1 }}>
            {links.map((x) => (
              <ListItemButton
                key={x.href}
                component={Link}
                href={x.href}
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.06)",
                  "&:hover": { background: "rgba(255,210,0,0.12)" },
                }}
              >
                <ListItemText primary={x.label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.10)" }} />

          <Box sx={{ fontSize: 13, opacity: 0.8, mb: 1 }}>Social</Box>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="Instagram" color="inherit" href="#" target="_blank">
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label="Facebook" color="inherit" href="#" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="TikTok" color="inherit" href="#" target="_blank">
              <MusicNoteIcon />
            </IconButton>
            <IconButton aria-label="WhatsApp" color="inherit" href="#" target="_blank">
              <WhatsAppIcon />
            </IconButton>
          </Stack>

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="secondary" fullWidth onClick={() => setOpen(false)}>
              Chiudi
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
