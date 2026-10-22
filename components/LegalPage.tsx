import Link from "next/link";
import { LEGAL_ACTUALIZADO } from "@/lib/titular";

/** Shared frame of the three legal pages (Spanish: the reference text in Spain). */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="legal">
      <Link href="/" className="legal-back">
        ← Volver
      </Link>
      <h1>{title}</h1>
      <p className="legal-updated">Última actualización: {LEGAL_ACTUALIZADO}</p>
      {children}
      <p className="legal-nav">
        <Link href="/aviso-legal">Aviso legal</Link> · <Link href="/terminos">Términos de uso</Link> ·{" "}
        <Link href="/privacidad">Privacidad</Link>
      </p>
    </main>
  );
}
