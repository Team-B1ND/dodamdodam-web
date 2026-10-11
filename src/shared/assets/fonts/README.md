# Pretendard web fonts

These unmodified WOFF2 files come from the official `pretendard@1.3.9` npm package ([source](https://github.com/orioncactus/pretendard/tree/v1.3.9), SIL OFL 1.1 in `OFL.txt`). Its full WOFF files match the former local originals byte for byte. Font metadata reports `Version 1.309`.

All nine weights (100–900), `font-display: swap`, original glyph outlines and all 14,336 mapped characters remain available. The 92 official subsets cover 12,029 characters per weight. Complete WOFF2 faces must appear first and remain eligible for every Unicode character: later subsets handle ordinary text, while complete faces preserve rare input and combining-cluster shaping. Restricting the complete faces to missing codepoints breaks combining accents and decomposed Hangul. Every asset is self-hosted. Vite keeps every WOFF2 as a separate hashed asset, including files under 4KB, so unused subsets do not inflate render-blocking CSS.

The 837 font files occupy 17,379,412 bytes, versus 10,063,292 bytes for the former WOFF files. Browsers fetch only the required subsets; a temporary Chrome sample of ordinary login text fetched 173,960 bytes and registration text 152,564 bytes, without any complete face. Actual page transfer depends on its text and weights. Latin combining text or other rare input can load a complete face (694,804–800,404 bytes per weight).

To reproduce, download/extract `pretendard@1.3.9` with `npm pack pretendard@1.3.9` in a temporary directory, install `fonttools[woff]` in a temporary Python environment, then run:

```sh
python src/shared/assets/fonts/generate.py /path/to/package/dist/web/static
```

`generate.py` copies official bytes unchanged, checks version/weights/coverage, regenerates CSS, and runs the repository's existing Prettier command. Adjacent weights share the same Unicode partition to keep compressed CSS small. No new app dependency is required.
