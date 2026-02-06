"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const STORAGE_KEY = "pkt_cookie_notice_v1";

export default function CookieNotice() {
  const t = useTranslations("CookieNotice");

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v !== "accepted") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <Alert
        severity="info"
        variant="filled"
        sx={{
          alignItems: "center",
          maxWidth: 760,
          width: "min(760px, calc(100vw - 24px))",
        }}
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              component={Link}
              href="/privacy-policy"
              color="inherit"
              size="small"
              sx={{ textDecoration: "underline" }}
            >
              {t("privacyLink")}
            </Button>

            {/* opzionale: cookie policy */}
            {/* <Button component={Link} href="/cookie-policy" color="inherit" size="small" sx={{ textDecoration: "underline" }}>
              {t("cookieLink")}
            </Button> */}

            <Button
              onClick={handleAccept}
              color="inherit"
              size="small"
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": { borderColor: "rgba(255,255,255,0.9)" },
              }}
            >
              {t("ok")}
            </Button>
          </Stack>
        }
      >
        {t("text")}
      </Alert>
    </Snackbar>
  );
}
