---
name: update-nihongo-study
description: Add a Japanese class, Minna no Nihongo lesson, teacher PDF, scan, or class note to the Nihongo Field Guide. Use when new material is placed in classes_files or when asked to add, revise, or synchronize a class and its related particle, verb, adjective, furigana, translation, or kana references.
---

# Update Nihongo Study

Turn new class material into a compact grammar review and keep the shared reference pages synchronized.

## Workflow

1. Inspect `classes_files` and identify the new or changed source. Compare it with `sourceFiles` in `src/content/classes/*.json`; do not rebuild unrelated classes.
2. Read the complete source. Use text extraction for PDFs and visual inspection/OCR for scans. If a reading or rule is genuinely ambiguous after inspecting the source, flag it instead of inventing it.
3. Read [references/content-schema.md](references/content-schema.md) before editing content.
4. Create or update one JSON entry in `src/content/classes`:
   - Summarize grammar, sentence patterns, contrasts, and common mistakes.
   - Omit vocabulary lists unless a word is necessary to explain a grammar rule.
   - Add one or two natural examples per grammar point.
   - Tokenize every example. Store furigana for kanji and a concise English gloss for every interactive Japanese token.
   - Store a natural full-sentence translation separately from word glosses.
   - Add two or three unscored recall prompts.
5. Update `src/data/reference.ts` only when the class introduces or reinforces a particle, verb rule, adjective rule, or kana exception:
   - Reuse existing IDs and avoid duplicate explanations.
   - Add the class ID to the relevant reference entry.
   - Expand a comparison when the new lesson creates a meaningful confusion, especially は/が or に/で.
   - Keep reference pages cumulative; never remove earlier rules merely because the new class does not use them.
6. Preserve the source files in `classes_files`. Do not copy them into `public` or expose them in the generated site.
7. Run `deno task check` and `deno task build`. Inspect the new class page in a browser at mobile and desktop widths, and verify hover, focus, and tap gloss behavior.
8. Report the class entry added, shared references changed, validation results, and any uncertain source readings that need human review.

## Editorial Rules

- Write for fast recall, not textbook completeness.
- Explain particles by their Japanese role rather than one-to-one English translations.
- Preserve the source's lesson intent while paraphrasing its explanations.
- Prefer common, natural beginner examples over novel vocabulary.
- Keep the interface copy in English and Japanese examples in Japanese.
- Generate translations during the class update. Never add runtime translation calls or API keys.
- Keep all cross-reference IDs stable because class pages link to them.
