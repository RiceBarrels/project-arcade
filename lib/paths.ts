import { DEFAULT_LOCALE } from "./site";

// English only for now; every internal link goes through here so adding
// locales later is a one-place change.
export const path = (p: string) => `/${DEFAULT_LOCALE}${p === "/" ? "" : p}`;
