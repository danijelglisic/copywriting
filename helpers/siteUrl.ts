const FALLBACK = "https://www.copywritingbyslavisa.com";

/**
 * Kanonski domen sajta, uvek sa protokolom i bez zavrsne kose crte.
 *
 * SITEMAP_URL na Vercelu je upisan bez protokola ("www.copywritingbyslavisa.com"),
 * a canonical i sitemap <loc> moraju da budu apsolutni URL-ovi — bez sheme ih
 * Google odbacuje. Zato se protokol dodaje ovde, umesto da se racuna na to
 * kako je varijabla upisana.
 */
export const siteUrl = (): string => {
  const raw = (process.env.SITEMAP_URL || FALLBACK).trim().replace(/\/+$/, "");

  if (!raw) return FALLBACK;

  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
};
