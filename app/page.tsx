import Image from "next/image";
import { Floating3D } from "@/components/Floating3D";
import { TopBar } from "@/components/TopBar";
import { T } from "@/components/Lang";
import { LangChip, LangSection } from "@/components/LangPicker";
import {
  ArrowRight,
  Check,
  Chevron,
  Discord,
  Guide,
  Instagram,
  Masterspread,
  Search,
  Sheet,
  Telegram,
  TikTok,
  YouTube,
} from "@/components/icons";
import { HANDLE, LINKS } from "@/lib/site";
import photo from "@/assets/mariosanczz.jpg";
import flayfindLogo from "@/assets/flayfind.png";
import uidbuyMascot from "@/assets/uidbuy.webp";
import tutorialThumb from "@/assets/tutorial-uidbuy.webp";

type ExtProps = {
  href: string;
  event: string;
  className: string;
  label?: string;
  children: React.ReactNode;
};

/** External link: new tab + Umami click event (tracked via data attribute, no JS needed). */
function Ext({ href, event, className, label, children }: ExtProps) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener" data-umami-event={event} aria-label={label}>
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <TopBar />

      <main className="wrap">
        {/* ================= HERO ================= */}
        <header className="hero reveal">
          <div className="idbar">
            <div className="idtext">
              <h1 className="name">
                {HANDLE}
                <span className="vf">
                  <Check />
                </span>
              </h1>
              <p className="pitch">
                <T k="hero.pitch" />
              </p>
            </div>
            <div className="photo-wrap">
              <Image className="hero-photo" src={photo} alt={HANDLE} width={78} height={78} loading="eager" />
            </div>
          </div>
          <LangChip />
        </header>

        {/* ================= REGISTRO EN UIDBUY ================= */}
        {/* the first thing after the profile: sign up with the referral link;
            Uidbuy's mascot on the right, for a friendly, trustworthy feel */}
        <Ext className="reg reveal d10" href={LINKS.registro} event="1_registro_uidbuy">
          <span className="reg-txt">
            <span className="reg-tag"><T k="reg.tag" /></span>
            <span className="reg-t"><T k="reg.t" /></span>
            <span className="reg-offer"><T k="reg.offer" /></span>
            <span className="reg-cta"><T k="reg.cta" /><ArrowRight /></span>
          </span>
          <span className="reg-pic">
            <Image src={uidbuyMascot} alt="" width={108} height={108} loading="eager" />
          </span>
        </Ext>

        {/* the video tutorial: its YouTube cover with a big play button; it opens
            on YouTube so the views count on the channel */}
        <Ext className="vid reveal d10" href={LINKS.tutorial} event="2_tutorial_youtube">
          <span className="vid-pic">
            <Image src={tutorialThumb} alt="" sizes="(max-width: 480px) 100vw, 440px" loading="eager" />
            <span className="vid-tag"><T k="vid.tag" /></span>
            <span className="vid-play" aria-hidden="true">
              <svg viewBox="0 0 68 48"><path d="M66.5 7.7A8.5 8.5 0 0 0 60.5 1.6C55.2.2 34 .2 34 .2s-21.2 0-26.5 1.4A8.5 8.5 0 0 0 1.5 7.7C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6.1C12.8 47.8 34 47.8 34 47.8s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6.1C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#FF0000"/><path d="M27 34V14l18 10z" fill="#fff"/></svg>
            </span>
          </span>
          <span className="vid-txt">
            <span className="vid-t"><T k="vid.t" /></span>
            <span className="vid-s"><T k="vid.s" /></span>
          </span>
          <span className="vid-cta"><T k="vid.cta" /> ↗</span>
        </Ext>

        {/* the step-by-step PDF (in Spanish), right under the sign-up */}
        <Ext className="link guide reveal d10" href={LINKS.guia} event="2_guia_pdf">
          <span className="ico"><Guide /></span>
          <span className="txt"><span className="t"><T k="guia.t" /></span><span className="s"><T k="guia.s" /></span></span>
          <Chevron />
        </Ext>

        {/* ================= 3 PASOS ================= */}
        <ol className="steps reveal d10">
          <li className="step"><div className="n">1</div><p><T k="step.1" /></p></li>
          <li className="step"><div className="n">2</div><p><T k="step.2" /></p></li>
          <li className="step"><div className="n">3</div><p><T k="step.3" /></p></li>
        </ol>

        {/* ================= PROVEEDORES ================= */}
        <div className="sec-head reveal d11" data-3d="pants">
          <h3><T k="prov.title" /></h3>
          <p><T k="prov.sub" /></p>
        </div>

        <Ext className="link featured reveal d12" href={LINKS.masterspread} event="2_masterspread">
          <span className="ico"><Masterspread /></span>
          <span className="txt"><span className="t"><T k="shop.t" /> <span className="by">Masterspread</span></span><span className="s"><T k="shop.s" /></span></span>
          <Chevron />
        </Ext>

        <Ext className="link reveal d13" href={LINKS.outfits} event="2_lista_outfits">
          <span className="ico"><Image src={flayfindLogo} alt="" width={24} height={24} /></span>
          <span className="txt"><span className="t"><T k="outf.t" /> <span className="by">Flayfind</span></span><span className="s"><T k="outf.s" /></span></span>
          <Chevron />
        </Ext>

        <Ext className="link reveal d14" href={LINKS.productos} event="2_lista_productos">
          <span className="ico"><Sheet /></span>
          <span className="txt"><span className="t"><T k="prod.t" /></span><span className="s"><T k="prod.s" /></span></span>
          <Chevron />
        </Ext>

        {/* ================= AYUDA / COMUNIDAD ================= */}
        <h3 className="eyebrow reveal d17" data-3d="sneaker"><T k="help.title" /></h3>

        <Ext className="link reveal d20" href={LINKS.buscador} event="2_buscar_por_foto">
          <span className="ico"><Search /></span>
          <span className="txt"><span className="t"><T k="foto.t" /></span><span className="s"><T k="foto.s" /></span></span>
          <Chevron />
        </Ext>

        <div className="duo reveal d22">
          <Ext className="link" href={LINKS.telegram} event="3_telegram">
            <span className="ico"><Telegram /></span>
            <span className="txt"><span className="t">Telegram</span></span>
          </Ext>
          <Ext className="link" href={LINKS.discord} event="3_discord">
            <span className="ico"><Discord /></span>
            <span className="txt"><span className="t">Discord</span></span>
          </Ext>
        </div>

        {/* ================= IDIOMA ================= */}
        <LangSection />

        {/* ================= REDES ================= */}
        <h3 className="eyebrow reveal d24"><T k="follow.title" /></h3>
        <div className="socials reveal d26" data-3d="shirt">
          <Ext className="social" href={LINKS.instagram} event="4_instagram" label="Instagram"><Instagram /></Ext>
          <Ext className="social" href={LINKS.tiktok} event="4_tiktok" label="TikTok"><TikTok /></Ext>
          <Ext className="social" href={LINKS.youtube} event="4_youtube" label="YouTube"><YouTube /></Ext>
        </div>

        <footer className="foot reveal d28">
          <T k="foot" vars={{ handle: HANDLE }} />
          {/* the links carry a referral code: advertising has to say so */}
          <p className="foot-disc"><T k="foot.disc" /></p>
          {/* legal pages, in Spanish (the reference text in Spain) */}
          <p className="foot-links">
            <a href="/aviso-legal">Aviso legal</a> · <a href="/terminos">Términos de uso</a> · <a href="/privacidad">Privacidad</a>
          </p>
        </footer>
      </main>

      <Floating3D />
    </>
  );
}
