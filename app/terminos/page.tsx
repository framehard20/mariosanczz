import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, HANDLE, SITE_DOMAIN } from "@/lib/site";

// Terms of use, written for Spanish law: consumers keep their rights and their
// own courts, and liability isn't excluded for intent or gross negligence.

export const metadata: Metadata = {
  title: `Términos de uso · ${HANDLE}`,
  description: "Qué es esta web, qué puedes esperar de sus enlaces y cuáles son las reglas de uso.",
};

export default function Terminos() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  return (
    <LegalPage title="Términos de uso">
      <h2>1. Qué regulan</h2>
      <p>
        Estos términos se aplican a quien visita {SITE_DOMAIN}. Usarla es gratis y no hace falta registrarse. Quién está detrás
        está en el <Link href="/aviso-legal">Aviso legal</Link>.
      </p>

      <h2>2. Qué es esta web</h2>
      <p>
        Es una página de enlaces: lleva a la lista de productos, a los outfits, a las comunidades y a las redes de {HANDLE}. No
        fabrica, vende ni envía ningún producto. Cuando compras, lo haces con el agente de compras o la tienda, con sus
        condiciones, sus precios y su política de privacidad; esta web no es parte de esa compra.
      </p>

      <h2>3. La información de la web</h2>
      <ul>
        <li>Las ofertas, descuentos y precios que se mencionan los fijan los agentes y las tiendas, y pueden cambiar sin aviso.</li>
        <li>Antes de comprar, comprueba en la tienda el producto, el precio, la talla y los gastos de envío.</li>
        <li>
          Esta web no garantiza la calidad, la disponibilidad ni el envío de productos de terceros, ni responde de retrasos,
          pérdidas o retenciones en aduana, que dependen de la tienda, del agente de compras y del transportista.
        </li>
      </ul>

      <h2>4. Enlaces de afiliado</h2>
      <p>
        Muchos enlaces llevan el código de referido de {HANDLE}. Si te registras o compras a través de ellos, el agente de
        compras puede pagar una comisión. A ti no te cuesta más. El descuento por registrarte lo da el agente según sus propias
        condiciones, que pueden cambiar.
      </p>

      <h2>5. Tus compras</h2>
      <p>
        Eres responsable de lo que compras y de cumplir las leyes de tu país, incluidas las de aduanas, importación y propiedad
        industrial. Algunos productos pueden no estar permitidos donde vives.
      </p>

      <h2>6. Uso permitido</h2>
      <p>
        No está permitido copiar el contenido de forma masiva o con programas automáticos, intentar dañar la web o usarla para
        algo ilegal.
      </p>

      <h2>7. Propiedad intelectual e industrial</h2>
      <p>
        El diseño, los textos, las fotos propias y el código de esta web son de su titular. Las marcas y logotipos de terceros
        pertenecen a sus dueños; aparecen solo para identificar sus productos o servicios, y eso no significa que colaboren con
        esta web ni la patrocinen. Si eres titular de un derecho y crees que algo de la web lo infringe, escribe a {mail} diciendo
        qué contenido es y por qué; lo revisaremos y, si procede, lo retiraremos lo antes posible.
      </p>

      <h2>8. Responsabilidad</h2>
      <p>
        Esta web responde conforme a la ley española. No responde del contenido de las webs de terceros a las que enlaza, salvo
        que sepa que es ilícito y no retire el enlace con diligencia. Nada de estos términos limita los derechos que la ley te da
        como consumidor ni la responsabilidad por dolo o culpa grave.
      </p>

      <h2>9. Cambios</h2>
      <p>
        Estos términos pueden actualizarse si cambia la web o la ley. La fecha de arriba indica la versión vigente, que se aplica
        desde que se publica y nunca hacia atrás.
      </p>

      <h2>10. Ley y tribunales</h2>
      <p>Estos términos se rigen por la ley española. Si eres consumidor, puedes acudir a los juzgados de tu domicilio.</p>

      <h2>11. Contacto</h2>
      <p>Para cualquier duda, escribe a {mail}.</p>
    </LegalPage>
  );
}
