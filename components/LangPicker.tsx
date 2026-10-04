"use client";

import { useState } from "react";
import { LANGS } from "@/lib/i18n";
import { useLang } from "./Lang";
import { Globe } from "./icons";

/** The eight language pills, shared by the hero chip and the language section. */
function LangOptions({ onPick }: { onPick?: () => void }) {
  const { lang, setLang } = useLang();
  return (
    <ul className="lang-list">
      {LANGS.map((l) => (
        <li key={l.code}>
          <button
            type="button"
            lang={l.code}
            aria-pressed={l.code === lang}
            data-umami-event="6_idioma"
            data-umami-event-idioma={l.code}
            onClick={() => {
              setLang(l.code);
              onPick?.();
            }}
          >
            {l.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

/**
 * The visible "you can change the language here" cue near the top: a globe pill
 * with the current language that unfolds the options right below it. It opens in
 * the page flow rather than as an overlay, because the hero's .reveal animation
 * gives it its own stacking context and an overlay would slide under the ticket.
 */
export function LangChip() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className="lang-chip-wrap">
      <button
        type="button"
        className="lang-chip"
        aria-expanded={open}
        aria-label={t("lang.change")}
        data-umami-event={open ? undefined : "6_abrir_idioma"}
        onClick={() => setOpen((o) => !o)}
      >
        <Globe />
        <span>{current.label}</span>
        <svg className="lang-chip-caret" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="lang-panel">
          <LangOptions onPick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

/** The language section near the end of the page, above the social links. */
export function LangSection() {
  const { t } = useLang();
  return (
    <section className="lang-sec reveal d22" aria-label={t("lang.title")}>
      <h3 className="eyebrow">
        <Globe />
        {t("lang.title")}
      </h3>
      <LangOptions />
    </section>
  );
}
