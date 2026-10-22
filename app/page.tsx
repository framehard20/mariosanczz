import Image from "next/image";
import { Floating3D } from "@/components/Floating3D";
import { TopBar } from "@/components/TopBar";
import { T } from "@/components/Lang";
import { LangChip, LangSection } from "@/components/LangPicker";
import {
  Check,
  Chevron,
  Discord,
  Instagram,
  Masterspread,
  Search,
  Telegram,
  TikTok,
  YouTube,
} from "@/components/icons";
import { HANDLE, LINKS } from "@/lib/site";
import photo from "@/assets/mariosanczz.jpg";
import flayfindLogo from "@/assets/flayfind.png";

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
        </footer>
      </main>

      <Floating3D />
    </>
  );
}
