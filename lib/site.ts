/* =====================================================================
   ⚙️  CONFIGURACIÓN — cambia SOLO este archivo
   =====================================================================
   Pon cada enlace real entre las comillas.
   Truco de trazabilidad: al final de cada enlace puedes añadir UTMs, p.ej.
   ...?utm_source=instagram&utm_medium=bio para saber de dónde vino el clic.
   ===================================================================== */

export const HANDLE = "mariosanczz";
// email que sale en el aviso legal, los términos y la privacidad
export const CONTACT_EMAIL = "flayfind@gmail.com";
export const SITE_DOMAIN = "mariosanczz.com";

// Gente ya registrada (la prueba social de la barra de arriba). Pon siempre un
// número que puedas demostrar, redondeado hacia abajo, para que el "+" sea verdad.
export const REGISTRADOS = 1000;

export const LINKS = {
  // registro en Uidbuy con mi código de referido (el botón grande de arriba)
  registro: "https://www.uidbuy.com/register?ref=UWSV3X",
  outfits: "https://flayfind.com",
  // la lista de productos en forma de web (Masterspread), aparte de la hoja
  masterspread: "https://www.masterspread.com",
  buscador: "https://discord.gg/BUrt9M2dyS",
  discord: "https://discord.gg/BUrt9M2dyS",
  telegram: "https://t.me/addlist/gdNCnbOv_Q85NTNk",
  instagram: "https://www.instagram.com/mariosanczz/",
  tiktok: "https://www.tiktok.com/@mariosanczz_",
  youtube: "https://www.youtube.com/@mariosanczz",
} as const;

// 🎄 Último día para pedir y que llegue a tiempo por Navidad, formato "AAAA-MM-DD"
// (p.ej. "2026-12-05"). Vacío = no se muestra el aviso. Pasada la fecha se oculta solo.
export const NAVIDAD_LIMITE = "";

// Umami (analítica gratis y sin cookies). Deja websiteId vacío para desactivarla.
// Si cambias de proveedor, actualiza también la CSP en next.config.ts.
export const UMAMI = {
  websiteId: "dcbe0e7c-7885-485d-bd0b-32da228972dd",
  src: "https://cloud.umami.is/script.js",
};
