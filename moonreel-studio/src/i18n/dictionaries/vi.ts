import en, { type Dictionary } from "./en";

// English only: the Vietnamese dictionary is no longer used and is not
// imported anywhere. This file now just re-exports the English dictionary
// so the file still type-checks (pnpm build type-checks every file under
// src/, even unimported ones — the old Vietnamese literal failed because
// `vi` no longer exists in the Dictionary type).
const vi: Dictionary = en;

export default vi;
