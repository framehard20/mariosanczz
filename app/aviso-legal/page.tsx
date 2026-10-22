import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, HANDLE, SITE_DOMAIN } from "@/lib/site";
import { hayTitular, TITULAR } from "@/lib/titular";

// Legal notice required by Spanish law (LSSI art. 10) for a site with an
// economic activity (affiliate commissions). The owner's details come from
// lib/titular.ts and only show once filled in.

export const metadata: Metadata = {
  title: `Aviso legal · ${HANDLE}`,
  description: "Quién está detrás de esta web, a qué se dedica y cómo contactar.",
};

export default function AvisoLegal() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  return (
    <LegalPage title="Aviso legal">
      <h2>Datos del titular</h2>
      <ul>
        {hayTitular() && (
          <>
            <li><b>Titular:</b> {TITULAR.nombre}</li>
            <li><b>NIF:</b> {TITULAR.nif}</li>
            <li><b>Domicilio:</b> {TITULAR.domicilio}</li>
          </>
        )}
        <li><b>Email de contacto:</b> {mail}</li>
        <li><b>Web:</b> {SITE_DOMAIN}</li>
      </ul>

      <h2>A qué se dedica</h2>
      <p>
        {SITE_DOMAIN} es la página de enlaces de {HANDLE}: lleva a la lista de productos (masterspread.com), a los outfits
        (flayfind.com), a las comunidades de Discord y Telegram y a sus redes sociales. La web no vende ni envía ningún
        producto. Se financia con las comisiones de programas de afiliados de agentes de compra, como se explica en los{" "}
        <Link href="/terminos">Términos de uso</Link>.
      </p>

      <h2>Condiciones y privacidad</h2>
      <p>
        El uso de la web se rige por los <Link href="/terminos">Términos de uso</Link>. Cómo se tratan los datos personales y
        qué se guarda en tu navegador está en la <Link href="/privacidad">Política de privacidad</Link>.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        El diseño, los textos, las fotos propias y el código de esta web son de su titular. Las marcas y logotipos de terceros
        pertenecen a sus dueños. Si crees que algún contenido infringe un derecho tuyo, escribe a {mail} y lo revisaremos.
      </p>

      <h2>Ley aplicable</h2>
      <p>Este aviso legal se rige por la ley española.</p>
    </LegalPage>
  );
}
