"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { locales, type Locale } from "@/i18n";

function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] ?? "";
  if (!isLocale(first)) return null;

  const nextLocale: Locale = first === "it" ? "en" : "it";
  const nextPath = "/" + [nextLocale, ...segments.slice(1)].join("/");

  return (
    <Button
      size="small"
      variant="outlined"
      color="secondary"
      onClick={() => router.push(nextPath)}
      sx={{ fontWeight: 900, borderRadius: 3, minWidth: 48 }}
    >
      {nextLocale.toUpperCase()}
    </Button>
  );
}
