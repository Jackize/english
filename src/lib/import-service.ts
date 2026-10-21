import { prisma } from "./prisma";
import { parseGoogleDoc, type ParsedDocument } from "./gdoc-parser";
import { normalizeWordKey, slugify } from "./utils";

export async function previewImport(url: string): Promise<ParsedDocument> {
  return parseGoogleDoc(url);
}

export async function confirmImport(
  url: string,
  documentTitle?: string,
): Promise<{ wordCount: number; categoryCount: number }> {
  const parsed = await parseGoogleDoc(url);
  const title = documentTitle?.trim() || parsed.documentTitle;

  let documentSet = await prisma.documentSet.findUnique({
    where: { sourceUrl: url },
  });

  if (!documentSet) {
    documentSet = await prisma.documentSet.create({
      data: { name: title, sourceUrl: url },
    });
  } else {
    documentSet = await prisma.documentSet.update({
      where: { id: documentSet.id },
      data: { name: title },
    });
  }

  let wordCount = 0;
  let order = 0;

  for (const category of parsed.categories) {
    const slug = slugify(category.name);
    let dbCategory = await prisma.category.findUnique({
      where: { documentSetId_slug: { documentSetId: documentSet.id, slug } },
    });

    if (!dbCategory) {
      dbCategory = await prisma.category.create({
        data: {
          name: category.name,
          slug,
          documentSetId: documentSet.id,
          order: order++,
        },
      });
    } else {
      await prisma.category.update({
        where: { id: dbCategory.id },
        data: { name: category.name, order: order++ },
      });
    }

    const importedKeys = new Set<string>();

    for (const w of category.words) {
      const key = normalizeWordKey(w.word);
      importedKeys.add(key);

      const existing = await prisma.word.findFirst({
        where: {
          categoryId: dbCategory.id,
          word: w.word,
        },
      });

      if (existing) {
        await prisma.word.update({
          where: { id: existing.id },
          data: {
            ipa: w.ipa,
            wordForm: w.wordForm,
            meaningEn: w.meaningEn,
            meaningVi: w.meaningVi,
            example: w.example,
            relatedForms: w.relatedForms,
            archived: false,
          },
        });
      } else {
        await prisma.word.create({
          data: {
            word: w.word,
            ipa: w.ipa,
            wordForm: w.wordForm,
            meaningEn: w.meaningEn,
            meaningVi: w.meaningVi,
            example: w.example,
            relatedForms: w.relatedForms,
            categoryId: dbCategory.id,
          },
        });
      }
      wordCount += 1;
    }

    const allWords = await prisma.word.findMany({
      where: { categoryId: dbCategory.id, archived: false },
    });

    for (const word of allWords) {
      if (!importedKeys.has(normalizeWordKey(word.word))) {
        await prisma.word.update({
          where: { id: word.id },
          data: { archived: true },
        });
      }
    }
  }

  await prisma.importLog.create({
    data: {
      sourceUrl: url,
      wordCount,
      status: "success",
      message: `Imported ${wordCount} words in ${parsed.categories.length} categories`,
    },
  });

  return { wordCount, categoryCount: parsed.categories.length };
}
