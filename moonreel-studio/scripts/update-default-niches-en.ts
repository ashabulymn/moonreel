import { eq } from "drizzle-orm";
import { db, pool } from "@/db";
import { niches } from "@/db/schema";
import { DEFAULT_NICHES } from "./default-niches";

/**
 * English-only fork: rewrite the already-seeded sample niches to the English
 * values in default-niches.ts. `seed.ts` only inserts on conflict, so without
 * this the live database would keep the old Vietnamese names forever.
 * Idempotent and safe to re-run: it touches only the 4 default slugs and
 * only the name/description/script/tone/language columns.
 */
async function main() {
  for (const n of DEFAULT_NICHES) {
    const updated = await db
      .update(niches)
      .set({
        name: n.name,
        description: n.description,
        scriptInstructions: n.scriptInstructions,
        tone: n.tone,
        language: n.language,
      })
      .where(eq(niches.slug, n.slug))
      .returning({ slug: niches.slug });
    console.log(`Updated niche ${n.slug}: ${updated.length} row(s)`);
  }
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
