"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@mui/material/Button";
import s from "./CookieNotice.module.scss";

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

  if (!open) return null;

  return (
    <div className={s.wrap} role="region" aria-label={t("ariaLabel")}>
      <div className={s.inner}>
        <div className={s.text}>
          <div className={s.kicker}>{t("kicker")}</div>
          <p className={s.message}>{t("text")}</p>
        </div>

        <div className={s.actions}>
          <Button
            component={Link}
            href="/privacy-policy"
            className={s.linkBtn}
            variant="text"
          >
            {t("privacyLink")}
          </Button>

          {/* opzionale se vuoi anche cookie policy */}
          {/* <Button component={Link} href="/cookie-policy" className={s.linkBtn} variant="text">
            {t("cookieLink")}
          </Button> */}

          <Button
            onClick={handleAccept}
            className={s.okBtn}
            variant="outlined"
          >
            {t("ok")}
          </Button>
        </div>
      </div>
    </div>
  );
}
