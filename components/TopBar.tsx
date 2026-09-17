"use client";

import { useEffect, useState } from "react";
import { LINKS } from "@/lib/site";
import { ArrowRight } from "./icons";

const HALF_DAY = 12 * 3600;

// Hora de Madrid real (CET/CEST): el antiguo offset fijo UTC+2 iba 1h mal en invierno.
const madridClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Madrid",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

/** Seconds until the next 00:00 / 12:00 cut-off, Spain time. */
function secondsLeft(now: Date): number {
  let h = 0, m = 0, s = 0;
  for (const part of madridClock.formatToParts(now)) {
    if (part.type === "hour") h = Number(part.value);
    else if (part.type === "minute") m = Number(part.value);
    else if (part.type === "second") s = Number(part.value);
  }
  return HALF_DAY - ((h * 3600 + m * 60 + s) % HALF_DAY);
}

const two = (n: number) => String(n).padStart(2, "0");

export function TopBar() {
  const [left, setLeft] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setLeft(secondsLeft(new Date()));
      // align ticks to the wall-clock second so the display never skips a digit
      timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 15);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const urgency = left === null ? "" : left <= 3600 ? " hot" : left <= 3 * 3600 ? " warn" : "";
  const label =
    left === null
      ? "--:--:--"
      : `${two(Math.floor(left / 3600))}:${two(Math.floor((left % 3600) / 60))}:${two(left % 60)}`;

  return (
    <div className={`topbar${scrolled ? " scrolled" : ""}`}>
      <div className="topbar-in">
        <div className="tb-row">
          <div className="tb-txt">
            <span className="tb-disc">−25%</span>
            <div className="tb-msg">Dto. en envío</div>
          </div>
          <div className="tb-clockbox">
            <span className="tb-k">Acaba en</span>
            <span className={`tb-clock${urgency}`} role="timer">
              {label}
            </span>
          </div>
          <div className="tb-right">
            <a
              className="tb-btn"
              href={LINKS.hipobuy}
              target="_blank"
              rel="noopener"
              data-umami-event="1_registro_barra"
            >
              <span className="tb-btn-label">
                Crear
                <br />
                cuenta
              </span>
              <ArrowRight />
            </a>
          </div>
        </div>
        <div className="tb-50bar">
          Cupón solo para los <b>primeros 50</b> · ¡Aprovecha!
        </div>
      </div>
    </div>
  );
}
