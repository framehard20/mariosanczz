import Image from "next/image";
import { Floating3D } from "@/components/Floating3D";
import { CopyCode } from "@/components/CopyCode";
import { TopBar } from "@/components/TopBar";
import { XmasNotice } from "@/components/XmasNotice";
import {
  ArrowRight,
  Check,
  Chevron,
  Discord,
  Instagram,
  Search,
  Sheet,
  Telegram,
  TikTok,
  YouTube,
  YouTubePlay,
} from "@/components/icons";
import { HANDLE, INVITE_CODE, LINKS } from "@/lib/site";
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
                Comprar en el mercado chino, <b>fácil y barato</b>
              </p>
            </div>
            <div className="photo-wrap">
              <Image className="hero-photo" src={photo} alt={HANDLE} width={78} height={78} loading="eager" />
            </div>
          </div>
        </header>

        {/* ================= TICKET / CTA HIPOBUY ================= */}
        <section className="ticket reveal d05" data-3d="sneaker">
          <div className="ticket-top">
            <span className="ticket-ey">Empieza aquí</span>
          </div>
          <h2>Compra ropa en el mercado chino</h2>
          <p className="sub">Accede a Hipobuy, donde consigo los outfits de los vídeos.</p>
          <XmasNotice />

          <hr className="dash" />

          <div className="cta-wrap">
            <span className="cta-tag">−25% envío</span>
            <Ext className="cta-btn" href={LINKS.hipobuy} event="1_registro_boton">
              <span className="cta-label">
                Crear cuenta gratis
                <span className="cta-sub">y activar mi −25% en envío</span>
              </span>
              <ArrowRight />
            </Ext>
          </div>
          <ul className="cta-trust">
            <li><Check /> Gratis</li>
            <li><Check /> 2 minutos</li>
            <li><Check /> Sin tarjeta</li>
          </ul>
          <CopyCode code={INVITE_CODE} />
        </section>

        {/* ================= 3 PASOS ================= */}
        <ol className="steps reveal d10">
          <li className="step"><div className="n">1</div><p>Crea tu cuenta</p></li>
          <li className="step"><div className="n">2</div><p>Elige tu outfit</p></li>
          <li className="step"><div className="n">3</div><p>Recíbelo en casa</p></li>
        </ol>

        {/* ================= PROVEEDORES ================= */}
        <div className="sec-head reveal d11" data-3d="pants">
          <h3>Proveedores</h3>
          <p>La ropa de mis vídeos, con su enlace de compra</p>
        </div>

        <Ext className="link featured reveal d12" href={LINKS.productos} event="2_lista_productos">
          <span className="ico"><Sheet /></span>
          <span className="txt"><span className="t">Lista de productos</span><span className="s">Todas las prendas con su enlace de compra</span></span>
          <Chevron />
        </Ext>

        <Ext className="link reveal d14" href={LINKS.outfits} event="2_lista_outfits">
          <span className="ico"><Image src={flayfindLogo} alt="" width={24} height={24} /></span>
          <span className="txt"><span className="t">Lista de outfits <span className="by">Flayfind</span></span><span className="s">Los conjuntos ya montados y su precio</span></span>
          <Chevron />
        </Ext>

        <Ext className="cta-repeat reveal d16" href={LINKS.hipobuy} event="5_registro_repeat">
          <span className="cta-repeat-txt">
            <span className="t">¿Ya sabes qué quieres?</span>
            <span className="s">Crea tu cuenta gratis y actívalo con tu −25% en envío</span>
          </span>
          <ArrowRight />
        </Ext>

        {/* ================= AYUDA / COMUNIDAD ================= */}
        <h3 className="eyebrow reveal d17">¿Tienes dudas? Háblame aquí</h3>

        <Ext className="link reveal d18" href={LINKS.comoComprar} event="2_video_tutorial">
          <span className="ico"><YouTubePlay /></span>
          <span className="txt"><span className="t">¿No sabes comprar? Míralo aquí</span><span className="s">Apréndelo en unos minutos</span></span>
          <Chevron />
        </Ext>

        <Ext className="link reveal d20" href={LINKS.buscador} event="2_buscar_por_foto">
          <span className="ico"><Search /></span>
          <span className="txt"><span className="t">¿Buscas otra prenda? Búscala por foto</span><span className="s">Mándame la foto y te paso el link</span></span>
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

        {/* ================= REDES ================= */}
        <h3 className="eyebrow reveal d24">Sígueme</h3>
        <div className="socials reveal d26" data-3d="shirt">
          <Ext className="social" href={LINKS.instagram} event="4_instagram" label="Instagram"><Instagram /></Ext>
          <Ext className="social" href={LINKS.tiktok} event="4_tiktok" label="TikTok"><TikTok /></Ext>
          <Ext className="social" href={LINKS.youtube} event="4_youtube" label="YouTube"><YouTube /></Ext>
        </div>

        <footer className="foot reveal d28">
          Hecho por <b>{HANDLE}</b> + <b>{INVITE_CODE}</b>
        </footer>
      </main>

      <Floating3D />
    </>
  );
}
