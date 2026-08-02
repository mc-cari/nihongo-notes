# Nihongo Field Guide content schema

## Class location

Store one JSON object per class in `src/content/classes/<slug>.json`. Use a stable lowercase hyphenated slug. The Astro collection schema in `src/content.config.ts` is authoritative.

Required top-level content:

- `title`, `japaneseTitle`, `order`, `kind`, `eyebrow`, and `summary`
- `sourceFiles`: exact filenames from `classes_files`
- `takeaways`: exactly three compact memories
- `grammar`: ordered grammar points
- `recall`: two or three prompt/answer pairs
- `related`: arrays of particle, verb-rule, and adjective-rule IDs

Use `kind: lesson` for numbered Minna no Nihongo lessons, `foundation` for broad introductory notes, and `practice` for situational dialogues or supplements. Include `bookLesson` only for numbered lessons.

## Grammar points

Each grammar point requires a stable `id`, `title`, `pattern`, `summary`, and at least one example. Add `detail` only when the summary cannot safely carry the nuance. Add `caution` for a likely mistake, not as decoration.

Example tokens use this shape:

```json
{"text":"図書館","reading":"としょかん","gloss":"library"}
```

- Add `reading` whenever `text` contains kanji.
- Add `gloss` to lexical items, grammar endings, and particles.
- Use `{"text":"。","plain":true}` for punctuation or deliberate unannotated separators.
- Split examples at useful learning boundaries, not at every character.
- Keep the sentence-level `english` natural; it does not need to mirror token order.
- Use `note` only for example-specific nuance.

## Shared references

`src/data/reference.ts` exports `particles`, `verbRules`, `adjectiveRules`, and kana tables.

- Particle IDs use their common romanized reading: `wa`, `ga`, `o`, `ni`, `de`, `e`, `to`, `mo`, `no`, `kara`, `made`.
- Verb and adjective rule IDs describe the rule rather than a lesson number.
- Add new IDs only when the rule is genuinely distinct.
- Maintain beginner-appropriate explanations and examples with the same token requirements as class content.

## Completion checklist

- The new slug and `order` are unique.
- All kanji tokens have accurate hiragana readings.
- All non-plain tokens have concise English glosses.
- Particle contrasts remain consistent with individual particle entries.
- Every related ID exists.
- No vocabulary dump was introduced.
- `npm run check` and `npm run build` pass.
