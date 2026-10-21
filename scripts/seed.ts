import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { confirmImport } from "../src/lib/import-service";
import { slugify } from "../src/lib/utils";

const SAMPLE_DOC_URL =
  "https://docs.google.com/document/d/17gFNBjkb3mMp3Tf4LpzSk9fkeE9T__b4rMz557XCB2Y";

const FALLBACK_DATA = {
  name: "CAM 12-20 READING",
  categories: [
    {
      name: "[C12T1] - Cork",
      words: [
        { word: "cork", ipa: "/kɔːk/", wordForm: "n", meaningEn: "the thick outer bark of cork oak", meaningVi: "vỏ cây sồi bần" },
        { word: "bark", ipa: "/bɑːk/", wordForm: "n", meaningEn: "outer covering of a tree", meaningVi: "vỏ cây", example: "Dogs bark" },
        { word: "oak", ipa: "/əʊk/", wordForm: "n", meaningEn: "a large forest tree", meaningVi: "cây sồi" },
        { word: "remarkable", ipa: "/rɪˈmɑːkəbl/", wordForm: "adj", meaningEn: "unusual or impressive", meaningVi: "đáng chú ý" },
        { word: "tough", ipa: "/tʌf/", wordForm: "adj", meaningEn: "strong and durable", meaningVi: "bền, cứng", example: "She is a tough girl" },
        { word: "elastic", ipa: "/ɪˈlæstɪk/", wordForm: "adj", meaningEn: "able to stretch and return", meaningVi: "đàn hồi", relatedForms: "elasticity (n)" },
        { word: "buoyant", ipa: "/ˈbɔɪənt/", wordForm: "adj", meaningEn: "able to float / floatation", meaningVi: "nổi" },
        { word: "fire-resistant", ipa: "/ˈfaɪə rɪˌzɪstənt/", wordForm: "adj", meaningEn: "resistant to fire", meaningVi: "chống cháy" },
        { word: "millennia", ipa: "/mɪˈleniə/", wordForm: "n (pl)", meaningEn: "thousands of years", meaningVi: "hàng thiên niên kỷ" },
      ],
    },
  ],
};

async function seedFallback() {
  const doc = await prisma.documentSet.upsert({
    where: { sourceUrl: "seed://fallback" },
    update: { name: FALLBACK_DATA.name },
    create: { name: FALLBACK_DATA.name, sourceUrl: "seed://fallback" },
  });

  let wordCount = 0;
  for (const [i, cat] of FALLBACK_DATA.categories.entries()) {
    const slug = slugify(cat.name);
    const category = await prisma.category.upsert({
      where: { documentSetId_slug: { documentSetId: doc.id, slug } },
      update: { name: cat.name, order: i },
      create: { name: cat.name, slug, documentSetId: doc.id, order: i },
    });

    for (const w of cat.words) {
      const existing = await prisma.word.findFirst({
        where: { categoryId: category.id, word: w.word },
      });
      if (existing) {
        await prisma.word.update({ where: { id: existing.id }, data: w });
      } else {
        await prisma.word.create({ data: { ...w, categoryId: category.id } });
      }
      wordCount += 1;
    }
  }

  console.log(`Seeded ${wordCount} fallback words`);
}

async function main() {
  const email = "demo@eng-growth.app";
  const passwordHash = await bcrypt.hash("demo1234", 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name: "Demo User",
      dailyGoal: 10,
    },
  });

  console.log("Demo user: demo@eng-growth.app / demo1234");

  try {
    const result = await confirmImport(SAMPLE_DOC_URL);
    console.log(`Imported ${result.wordCount} words in ${result.categoryCount} categories`);
  } catch (error) {
    console.warn("Sample doc import skipped:", error instanceof Error ? error.message : error);
    await seedFallback();
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
