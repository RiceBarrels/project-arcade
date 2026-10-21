// Marks an English source string for extraction without translating it yet
// (scripts/i18n-extract.ts collects msg("...") like t("...")). Use it for
// strings defined outside a component (labels in lib/, Server Action errors)
// and translate where they're shown: t(label). Returns the string unchanged.
export const msg = <S extends string>(source: S): S => source;

/**
 * Same English, different job: msgCtx("how it works step", "Browse") gives the
 * key "how it works step::Browse", which translators can word differently from
 * the plain "Browse" tab. Shown in English as "Browse".
 */
export const CONTEXT_SEPARATOR = "::";
export const msgCtx = (context: string, source: string) => `${context}${CONTEXT_SEPARATOR}${source}`;

/** Plural pair for later t.plural(count, ...pair); "other" is the key. */
export const msgPlural = (one: string, other: string): readonly [string, string] => [one, other];
