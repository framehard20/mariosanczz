"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { T, useLang } from "./Lang";

declare global {
  interface Window {
    umami?: { track: (event: string) => void };
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for in-app browsers (Instagram/TikTok) without the async Clipboard API
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {}
    ta.remove();
    return ok;
  }
}

export function CopyCode({ code }: { code: string }) {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setMounted(true);
    return () => clearTimeout(timer.current);
  }, []);

  async function onClick() {
    const ok = await copyText(code);
    setToast(t(ok ? "code.copied" : "code.yours", { code }));
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 1800);
    window.umami?.track("copiar_codigo");
  }

  return (
    <>
      <button type="button" className="codechip" onClick={onClick}>
        <T k="code.chip" vars={{ code }} />
      </button>
      {/* Portal: .reveal applies a transform, which would trap a position:fixed toast inside the ticket */}
      {mounted &&
        createPortal(
          <div className={`toast${visible ? " show" : ""}`} role="status" aria-live="polite">
            {toast}
          </div>,
          document.body,
        )}
    </>
  );
}
