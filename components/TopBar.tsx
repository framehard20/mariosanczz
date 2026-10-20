"use client";

import { useEffect, useState } from "react";
import { LINKS, REGISTRADOS } from "@/lib/site";
import { ArrowRight, Masterspread } from "./icons";
import { localeOf } from "@/lib/i18n";
import { useLang } from "./Lang";

// Sticky offer bar. It used to carry a countdown that rolled over every twelve
// hours and a "only for the first 50" line — neither was true, and both are
// exactly the kind of claim that costs an affiliate code. What replaced them is
// a number that is true and that this audience trusts more anyway: how many
// people have already registered.
//
// Since 21 Oct 2026 the bar sends people to masterspread.com (the product list
// as a website, where the $800 + 40% shipping offer is), at Mario's request.

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
          <span className="tb-msg">{t("tb.msg")}</span>
          <span className="tb-sep">·</span>
          <span className="tb-proof">{t("tb.proof", { n: REGISTRADOS.toLocaleString(localeOf(lang)) })}</span>
        </div>

        <a
          className="tb-btn"
          href={LINKS.masterspread}
          target="_blank"
          rel="noopener"
          data-umami-event="1_masterspread_barra"
        >
          <span className="tb-btn-logo"><Masterspread /></span>
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
