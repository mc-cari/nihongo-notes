import { readdir, readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);
const classDir = new URL("src/content/classes/", root);
const referencePath = new URL("src/data/reference.ts", root);
const errors = [];

const files = (await readdir(classDir)).filter((file) => file.endsWith(".json"))
  .sort();
const entries = await Promise.all(files.map(async (file) => ({
  slug: file.replace(/\.json$/, ""),
  file,
  data: JSON.parse(await readFile(new URL(file, classDir), "utf8")),
})));

const duplicateValues = (values) =>
  values.filter((value, index) => values.indexOf(value) !== index);
for (
  const order of new Set(
    duplicateValues(entries.map((entry) => entry.data.order)),
  )
) {
  errors.push(`Duplicate class order: ${order}`);
}

const referenceSource = await readFile(referencePath, "utf8");
const idsInSection = (start, end) => {
  const section = referenceSource.slice(
    referenceSource.indexOf(start),
    referenceSource.indexOf(end),
  );
  return new Set(
    [...section.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]),
  );
};

const known = {
  particles: idsInSection("export const particles", "export const verbRules"),
  verbs: idsInSection("export const verbRules", "export const adjectiveRules"),
  adjectives: idsInSection(
    "export const adjectiveRules",
    "export const kanaRows",
  ),
};

const hasKanji = (text) => /\p{Script=Han}/u.test(text);

for (const { file, data } of entries) {
  if (data.takeaways.length !== 3) {
    errors.push(`${file}: expected exactly three takeaways`);
  }

  for (const [group, ids] of Object.entries(data.related)) {
    for (const id of ids) {
      if (!known[group]?.has(id)) {
        errors.push(`${file}: unknown ${group} reference "${id}"`);
      }
    }
  }

  data.grammar.forEach((point, pointIndex) => {
    point.examples.forEach((example, exampleIndex) => {
      example.tokens.forEach((token, tokenIndex) => {
        const location =
          `${file} grammar[${pointIndex}] example[${exampleIndex}] token[${tokenIndex}]`;
        if (!token.plain && !token.gloss?.trim()) {
          errors.push(`${location}: interactive token needs a gloss`);
        }
        if (!token.plain && hasKanji(token.text) && !token.reading?.trim()) {
          errors.push(`${location}: kanji token needs a reading`);
        }
      });
    });
  });
}

if (errors.length) {
  console.error(`Content validation failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Content validation passed: ${entries.length} classes, ${files.length} JSON files.`,
);
