"use client";

import { Fragment, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, isLang, pickLang, raw, type Key, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "mariosanczz.lang";

type Vars = Record<string, string | number>;

type LangCtx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: Key, vars?: Vars) => string;
};

const Ctx = createContext<LangCtx>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key, vars) => raw(DEFAULT_LANG, key, vars),
});

export const useLang = () => useContext(Ctx);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Restore the visitor's choice (or follow their browser) once mounted, so the
  // server and the first client render agree on Spanish and hydration stays quiet.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    setLangState(isLang(saved) ? saved : pickLang(navigator.languages ?? [navigator.language]));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const value = useMemo<LangCtx>(
    () => ({ lang, setLang, t: (key, vars) => raw(lang, key, vars) }),
    [lang, setLang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Turns **bold** spans of a translated string into <b>. */
export function bold(text: string) {
  return text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>));
}

/** A translated string, for use inside server components. */
export function T({ k, vars }: { k: Key; vars?: Vars }) {
  const { t } = useLang();
  return <>{bold(t(k, vars))}</>;
}
