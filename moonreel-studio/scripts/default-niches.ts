import type { niches } from "@/db/schema";

/**
 * The sample niches that ship with MoonReel. Your own niches belong in private niche files
 * (see private-niches.ts), not here: this file is public.
 *
 * English only (fork change): the upstream samples were Vietnamese.
 * Slugs are unchanged, so existing installs keep their rows; the
 * update-default-niches-en.ts script rewrites the seeded rows to these
 * English values on deploy.
 */
export const DEFAULT_NICHES: (typeof niches.$inferInsert)[] = [
  {
    slug: "personal-finance",
    thumbnailStyle: "boxed",
    thumbnailAccent: "#34D399",
    thumbnailBrand: "",
    icon: "💰",
    name: "Personal Finance",
    description: "Practical money knowledge for young working people.",
    scriptInstructions: [
      "- Open with a surprising number or a common money mistake.",
      "- One idea per scene, with a concrete example in US dollars.",
      "- No get-rich-quick promises, no recommendation to buy a specific stock or coin.",
      "- End by asking viewers to follow for the next tip.",
    ].join("\n"),
    tone: "Friendly and clear, like a helpful older sibling",
    visualStyle: "clean modern 3D animation, soft warm lighting, pastel colors",
    sceneCount: 6,
    sceneSeconds: 10,
    language: "English",
  },
  {
    slug: "did-you-know",
    thumbnailStyle: "impact",
    thumbnailAccent: "#FFD23F",
    thumbnailBrand: "",
    icon: "🔭",
    name: "Did You Know",
    description: "Surprising facts about science, history, and the world.",
    scriptInstructions: [
      "- Start with a 'Did you know…?' line and a hard-to-believe fact.",
      "- Explain briefly why it is true, using only verified information.",
      "- End with a question that invites viewers to comment.",
    ].join("\n"),
    tone: "Curious, excited",
    visualStyle: "vibrant stylized 3D, cinematic lighting, rich detail",
    sceneCount: 5,
    sceneSeconds: 10,
    language: "English",
  },
  {
    slug: "night-stories",
    thumbnailStyle: "cinematic",
    thumbnailAccent: "#9DB8FF",
    thumbnailBrand: "",
    icon: "🌙",
    name: "Late Night Stories",
    description: "Mild mystery / horror stories, told in the first person.",
    scriptInstructions: [
      "- Follow the arc: setting → something strange → climax → open ending.",
      "- No gore, no graphic violence.",
      "- End by inviting viewers to guess the ending in the comments.",
    ].join("\n"),
    tone: "Whispered, slow, suspenseful",
    visualStyle: "moody cinematic, low key lighting, blue and amber tones, light fog",
    sceneCount: 6,
    sceneSeconds: 10,
    language: "English",
  },
  {
    slug: "ai-tech-tips",
    thumbnailStyle: "boxed",
    thumbnailAccent: "#FFC23D",
    thumbnailBrand: "",
    icon: "🤖",
    name: "AI & Tech Tips",
    description: "Quick guides to AI tools and tech tips you can use right away.",
    scriptInstructions: [
      "- Open with a concrete benefit (how much time or money it saves).",
      "- Steps in order, one step per scene.",
      "- End by asking viewers to save the video and follow.",
    ].join("\n"),
    tone: "Energetic, confident, easy to follow",
    visualStyle: "sleek futuristic office, neon accent lighting, crisp 3D render",
    sceneCount: 6,
    sceneSeconds: 10,
    language: "English",
  },
];

export const DEFAULT_NICHE_SLUGS = new Set(DEFAULT_NICHES.map((n) => n.slug));
