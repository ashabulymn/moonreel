export const LOCALES = ["en"] as const;
export type Locale = (typeof LOCALES)[number];

/** Used when the browser asks for none of the supported languages. */
export const DEFAULT_LOCALE: Locale = "en";

/** English only: the language switcher was removed, so this cookie is no longer set. */
export const LOCALE_COOKIE = "moonreel_locale";

export const hasLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale);

/** Best supported locale for an Accept-Language header. English only. */
export function matchAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part, order) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q.slice(2)) : 1, order };
    })
    .filter((entry) => entry.q > 0 && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q || a.order - b.order);
  const match = ranked.find((entry) => hasLocale(entry.lang));
  return match ? (match.lang as Locale) : null;
}

/** English only, whatever the browser or cookie says. */
export function resolveLocale(_cookie: string | null | undefined, _acceptLanguage: string | null | undefined): Locale {
  return DEFAULT_LOCALE;
}
