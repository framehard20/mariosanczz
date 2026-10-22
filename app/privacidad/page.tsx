import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, HANDLE, SITE_DOMAIN } from "@/lib/site";
import { hayTitular, TITULAR } from "@/lib/titular";

// Privacy policy (GDPR art. 13). The page asks for no personal data: it counts
// visits with Umami (no cookies) and remembers the language in the browser.

export const metadata: Metadata = {
  title: `Política de privacidad · ${HANDLE}`,
  description: "Qué datos trata esta web, para qué, cuánto tiempo y cómo ejercer tus derechos.",
};

export default function Privacidad() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  return (
    <LegalPage title="Política de privacidad">
      <h2>Quién trata tus datos</h2>
      <p>
        {hayTitular() ? (
          <>
            <b>{TITULAR.nombre}</b>, NIF {TITULAR.nif}, {TITULAR.domicilio}.{" "}
          </>
        ) : (
          <>El titular de {SITE_DOMAIN} (ver el <Link href="/aviso-legal">Aviso legal</Link>). </>
        )}
        Para cualquier cosa sobre tus datos, escribe a {mail}.
      </p>

      <h2>Qué datos tratamos y para qué</h2>
      <ul>
        <li>
          <b>Visitas.</b> Contamos las visitas y los clics en los enlaces con Umami: qué se ve y se pulsa, el país aproximado y
          el tipo de dispositivo y navegador, siempre en conjunto, sin cookies y sin guardar tu IP ni nada que te identifique.
          Sirve para saber qué enlaces interesan. La base legal es nuestro interés legítimo en saber cómo se usa la web (art.
          6.1.f del RGPD); puedes oponerte escribiendo a {mail}.
        </li>
        <li>
          <b>Si nos escribes.</b> Usamos tu email y tu mensaje solo para responderte, y los borramos cuando ya no hacen falta y,
          como máximo, a los 12 meses.
        </li>
        <li>
          <b>Discord, Telegram y redes sociales.</b> Si nos escribes o nos mandas una foto por esas apps, se aplican también sus
          propias políticas de privacidad. Solo usamos lo que nos mandes para responderte.
        </li>
      </ul>
      <p>Esta web no tiene formularios, no pide registrarse y no hace perfiles ni toma decisiones automatizadas sobre ti.</p>

      <h2>Con quién se comparten</h2>
      <p>
        No vendemos ni cedemos datos a nadie. La web la alojan Vercel (alojamiento) y Umami (estadísticas), que solo tratan
        datos por cuenta nuestra. Pueden guardarlos fuera de la Unión Europea; en ese caso la transferencia se ampara en el Marco
        de Privacidad de Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión Europea.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceder a tus datos, corregirlos, borrarlos, oponerte a su uso, limitarlo o llevártelos, escribiendo a{" "}
        {mail}. Si crees que no los hemos tratado bien, puedes reclamar ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>).
      </p>

      <h2>Cookies y almacenamiento en tu navegador</h2>
      <p>
        Esta web no usa cookies. Solo guarda en tu propio navegador el idioma que eliges, para que la próxima vez se vea igual;
        eso no nos llega a nosotros. Por eso no hace falta un aviso de cookies.
      </p>

      <h2>Enlaces a otras webs</h2>
      <p>
        Los enlaces llevan a otras webs (la lista de productos, los outfits, el agente de compras, Discord, Telegram, Instagram,
        TikTok y YouTube), que tienen sus propias políticas de privacidad.
      </p>
    </LegalPage>
  );
}
