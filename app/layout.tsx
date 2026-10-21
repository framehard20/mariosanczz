import type { Metadata } from "next";
import Script from "next/script";
import { LangProvider } from "@/components/Lang";
import { HANDLE, UMAMI } from "@/lib/site";
import "./globals.css";

const title = `${HANDLE} · Mercado chino fácil y barato`;
const description = `Outfits completos del mercado chino por menos de 50€, con la lista de productos y el link de cada prenda. 800$ + 40% de descuento en el envío al registrarte con mi link.`;

// On Vercel this resolves to the production domain so link previews get absolute image URLs.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, type: "website", locale: "es_ES" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LangProvider>{children}</LangProvider>
        {process.env.NODE_ENV === "production" && UMAMI.websiteId && (
          <Script src={UMAMI.src} data-website-id={UMAMI.websiteId} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
