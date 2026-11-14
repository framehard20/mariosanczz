"use client";

import { useEffect, useState } from "react";
import { LINKS, TELEGRAM_MIEMBROS } from "@/lib/site";
import { ArrowRight, Telegram } from "./icons";
import { localeOf } from "@/lib/i18n";
import { useLang } from "./Lang";

// Sticky offer bar. It used to carry a countdown that rolled over every twelve
// hours and a "only for the first 50" line — neither was true, and both are
// exactly the kind of claim that costs an affiliate code. What replaced them is
// a number that is true and that this audience trusts more anyway: how many
// people have already registered.
//
// Since 14 Nov 2026 the bar's button opens Mario's Telegram community (help,
// discounts and products), at his request; it fires the same event as every
// other link to Telegram. The product list (masterspread.com) stays in Proveedores.
// The info line above it is about the community too: its name and how many
// people are in it (Mario's figure, in lib/site.ts). The button is Telegram blue.

export function TopBar() {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`topbar${scrolled ? " scrolled" : ""}`}>
      <div className="topbar-in">
        <div className="tb-info">
          <span className="tb-disc">{t("tb.disc")}</span>
          <span className="tb-sep">·</span>
          <span className="tb-proof">{t("tb.proof", { n: TELEGRAM_MIEMBROS.toLocaleString(localeOf(lang)) })}</span>
        </div>

        <a
          className="tb-btn"
          href={LINKS.telegram}
          target="_blank"
          rel="noopener"
          data-umami-event="3_telegram"
        >
          <span className="tb-btn-logo tb-tg"><Telegram /></span>
          <span className="tb-btn-label">
            {t("tb.btn")}
            <span className="tb-btn-sub">{t("tb.btnSub")}</span>
          </span>
          <ArrowRight />
        </a>
      </div>
    </div>
  );
}
