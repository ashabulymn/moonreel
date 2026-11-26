import type { Locale } from "../config";
import en, { type Dictionary } from "./en";

// English only. The Vietnamese dictionary (./vi.ts) is left in the repo
// unused and is not imported, so no Vietnamese copy can ever render.
export const dictionaries: Record<Locale, Dictionary> = { en };
export type { Dictionary };
