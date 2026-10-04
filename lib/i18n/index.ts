import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { pl } from "./pl";
import { pt } from "./pt";
import { zh } from "./zh";

// Every string on the page, in the eight languages of the picker.
// Spanish is the source: add a key to es.ts and TypeScript will flag every other
// language that's missing it. Values may contain **bold** and {placeholders}.

export type Key = keyof typeof es;
export type Dict = Record<Key, string>;

// Order and labels as the visitor sees them in the picker.
export const LANGS = [
  { code: "en", label: "English", locale: "en-GB" },
  { code: "zh", label: "简体中文", locale: "zh-CN" },
  { code: "fr", label: "Français", locale: "fr-FR" },
  { code: "de", label: "Deutsch", locale: "de-DE" },
  { code: "it", label: "Italiano", locale: "it-IT" },
  { code: "pl", label: "język polski", locale: "pl-PL" },
  { code: "pt", label: "Português", locale: "pt-PT" },
  { code: "es", label: "Español", locale: "es-ES" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];

export const DICTS: Record<Lang, Dict> = { es, en, zh, fr, de, it, pl, pt };

export const DEFAULT_LANG: Lang = "es";

export const isLang = (v: unknown): v is Lang => LANGS.some((l) => l.code === v);

export const localeOf = (lang: Lang) => LANGS.find((l) => l.code === lang)?.locale ?? "es-ES";

/** Picks the best language for a browser's preferences. */
export function pickLang(preferred: readonly string[]): Lang {
  for (const p of preferred) {
    const base = p.toLowerCase().split("-")[0];
    const hit = LANGS.find((l) => l.code === base);
    if (hit) return hit.code;
  }
  return DEFAULT_LANG;
}

/** Looks up a string and fills its {placeholders}. */
export function raw(lang: Lang, key: Key, vars?: Record<string, string | number>): string {
  const text = DICTS[lang][key] ?? DICTS[DEFAULT_LANG][key];
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m));
}
