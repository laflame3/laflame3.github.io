# Yanxi Li · Personal website

[Visit the website](https://laflame3.github.io/)

Bilingual career profile for Yanxi Li (Travis), MSc Physics student at King’s College London. Includes education, experience, research projects, a web CV, contact links and a local profile assistant.

## Development

Node >=22. Run `npm ci --ignore-scripts`, `npm test`, `npm run build`, then `npm run preview` to open http://127.0.0.1:4317 . The static build is written to `out/`.

English and Chinese page content is in `content/` and `content_zh/`. Selected bilingual facts and source labels are in `src/lib/knowledge.js`. Keep them in sync when updating the profile. Tests check selected page/fact consistency and assistant behavior.

## Publishing

GitHub Actions builds and deploys `out/` after a push to main. GitHub Pages is configured to use GitHub Actions. The repository is the user site `laflame3.github.io`, so no project base path is required.

## Content and assistant

Career content combines selected CV material with the public portfolio and stock-selection repositories and the independent Enquiry Desk CRM prototype as of 15 October 2026. KCL MSc is in progress, expected 2027. Research-document accuracy is not a trading return; individual contribution details and existing review limitations are retained. Only selected public career summaries are included.

Ask Me performs deterministic local retrieval. It does not call an LLM, speak for Yanxi in real time, send questions to a server or save them. Source labels describe selected records and their dates, rather than independently verified achievements. Phone numbers, raw CV files and internal employer material are not included. The web CV supports browser printing; original-format downloads await selection.

## Attribution

Adapted from [xyjoey/PRISM](https://github.com/xyjoey/PRISM), source commit f2748db9821e98ed487eee5104ce4cc282aa8c1e. Retains its TOML/Markdown loading and static-export approach, with a custom presentation layer. The upstream MIT copyright and licence are preserved in LICENSE.

Homepage organization was informed by [Tianyou (Theo) Lai’s website](https://laitty.github.io/). No code, personal wording, images, logos or publications were copied from that reference.
