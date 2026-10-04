"use client";

import { useEffect, useState } from "react";
import { localeOf, type Lang } from "@/lib/i18n";
import { NAVIDAD_LIMITE } from "@/lib/site";
import { useLang } from "./Lang";

// "AAAA-MM-DD" of today in Spain
const madridDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" });

/** Whole days from today (Spain) to the deadline, or null if none is set or it has passed. */
function daysLeft(deadline: string, now: Date): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return null;
  const days = Math.round((Date.parse(deadline) - Date.parse(madridDate.format(now))) / 864e5);
  return days < 0 ? null : days;
}

/** The deadline as a short day + month in the visitor's language ("5 dic", "5 Dec", "12月5日"). */
function shortDate(deadline: string, lang: Lang): string {
  return new Intl.DateTimeFormat(localeOf(lang), { day: "numeric", month: "short", timeZone: "UTC" }).format(
    new Date(`${deadline}T00:00:00Z`),
  );
}

/** Christmas order-deadline line inside the ticket. Computed on the client so it never freezes at build time. */
export function XmasNotice() {
  const { lang, t } = useLang();
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => setDays(daysLeft(NAVIDAD_LIMITE, new Date())), []);

  if (days === null) return null;
  const text =
    days === 0 ? t("xmas.today")
    : days === 1 ? t("xmas.one")
    : days <= 7 ? t("xmas.many", { n: days })
    : t("xmas.until", { date: shortDate(NAVIDAD_LIMITE, lang) });

  return (
    <p className="xmas">
      <span aria-hidden="true">🎄</span>
      <span><b>{t("xmas.label")}</b> {text}</span>
    </p>
  );
}
