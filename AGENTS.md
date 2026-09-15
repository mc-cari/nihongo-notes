# Nihongo Field Guide instructions

## Furigana for new class content

For every new or revised class section, add readings wherever kanji appears:

- Titles use `[[surface|reading]]`, for example `[[横|よこ]]`.
- Descriptions, summaries, patterns, details, and cautions use the same `[[surface|reading]]` syntax, for example `[[隣|となり]]`.
- Examples store furigana in each kanji-containing token's `reading` field.

The site renders these annotations as furigana, but it must not infer readings automatically because kanji readings depend on context. After class-content changes, run `bun run check` and `bun run build`, then verify the rendered page at desktop and mobile widths.
