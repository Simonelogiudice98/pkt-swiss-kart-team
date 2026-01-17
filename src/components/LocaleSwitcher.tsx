"use client";

import { usePathname, useRouter } from "next/navigation";
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

  const currentLocale: Locale = first;
  const nextLocale: Locale = currentLocale === "it" ? "en" : "it";

  const nextPath = "/" + [nextLocale, ...segments.slice(1)].join("/");

  return (
    <button type="button" onClick={() => router.push(nextPath)}>
      {nextLocale.toUpperCase()}
    </button>
  );
}
