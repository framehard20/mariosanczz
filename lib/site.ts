/* =====================================================================
   ⚙️  CONFIGURACIÓN — cambia SOLO este archivo
   =====================================================================
   Pon cada enlace real entre las comillas.
   Truco de trazabilidad: al final de cada enlace puedes añadir UTMs, p.ej.
   ...?utm_source=instagram&utm_medium=bio para saber de dónde vino el clic.
   ===================================================================== */

export const HANDLE = "mariosanczz";
export const INVITE_CODE = "YILTEC";

// Gente ya registrada con el código. Es la prueba social de la barra de arriba
// y sustituye al contador falso. Redondea siempre HACIA ABAJO respecto al
// "Total" del panel de Hipobuy, para que el "+" sea verdad y no haga falta
// tocarlo cada semana. Panel a 12 oct 2026: 1.177 en total, asi que "+1.000" va sobrado.
export const REGISTRADOS = 1000;

export const LINKS = {
  hipobuy: `https://hipobuy.com/register?inviteCode=${INVITE_CODE}`,
  outfits: "https://flayfind.com",
  // la lista de productos en forma de web (Masterspread), aparte de la hoja
  masterspread: "https://www.masterspread.com",
  productos:
    "https://docs.google.com/spreadsheets/d/17WHP0zYLfmwC9NZ9itCUNSPT9ymWnxT6qIXDKgO09Cs/edit?gid=1281688000#gid=1281688000",
  comoComprar: "https://youtu.be/TY7p0an6uL0",
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
