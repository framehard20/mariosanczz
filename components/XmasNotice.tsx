"use client";

import { useEffect, useState } from "react";
import { NAVIDAD_LIMITE } from "@/lib/site";

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// "AAAA-MM-DD" of today in Spain
const madridDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" });

/** Text for the notice, or null once the deadline has passed (or none is set). */
function message(deadline: string, now: Date): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return null;
  const days = Math.round((Date.parse(deadline) - Date.parse(madridDate.format(now))) / 864e5);
  if (days < 0) return null;
  if (days === 0) return "hoy es el último día para pedir";
  if (days === 1) return "queda 1 día para pedir";
  if (days <= 7) return `quedan ${days} días para pedir`;
  const [, mes, dia] = deadline.split("-").map(Number);
  return `pide hasta el ${dia} ${MESES[mes - 1]}`;
}

/** Christmas order-deadline line inside the ticket. Computed on the client so it never freezes at build time. */
export function XmasNotice() {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => setText(message(NAVIDAD_LIMITE, new Date())), []);

  if (!text) return null;
  return (
    <p className="xmas">
      <span aria-hidden="true">🎄</span>
      <span><b>Navidad:</b> {text}</span>
    </p>
  );
}
