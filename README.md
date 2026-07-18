# Graphictac Knowledge Base Database

An open, source-linked research dataset for printable media, printer workflows, and professional print-and-cut production.

This repository is designed to be readable by people, search engines, AI assistants, and data tools. It publishes structured research snapshots behind the Graphictac and MAXDECALS knowledge-base program.

## Dataset contents

| Dataset | Rows | Purpose |
|---|---:|---|
| `printer_brand_research_matrix` | 6 | Maps printer brands, ink workflows, compatibility angles, and official sources. |
| `competitor_product_research_matrix` | 8 | Maps major printable-media product families, positioning signals, compatibility context, and claim risk. |
| `source_library` | 14 | Provides the source registry used by the two research matrices. |

Every dataset is available as CSV and JSONL in [`data/`](data/). Machine-readable field definitions are in [`schema/dataset.schema.json`](schema/dataset.schema.json).

## Quick start

Download or clone the repository, then read a JSONL file one record per line:

```python
import json

with open("data/printer_brand_research_matrix.jsonl", encoding="utf-8") as f:
    records = [json.loads(line) for line in f if line.strip()]

print(records[0])
```

## Research scope

- Printer brands: Roland, Mimaki, HP Latex, Epson, Mutoh, and Canon.
- Printable-media brands: 3M, Avery Dennison, ORAFOL / ORAJET, General Formulations, Arlon, Mactac, Briteline / Grimco, and Siser.
- Primary use cases: printable vinyl, vehicle graphics, stickers, decals, wrap films, high-tack media, printable HTV, and printer workflow education.
- Source policy: official manufacturer or brand-controlled product pages are preferred.

## Important limitations

This is a research and discovery dataset, not a certification database. Compatibility statements describe workflow context found in cited sources. They do not guarantee a specific printer, ink, profile, laminate, surface, or application combination. Always confirm current manufacturer documentation and run production testing before use.

The first public release is a dated snapshot. URLs, specifications, and product availability can change after the recorded review date.

## Methodology and provenance

See [`METHODOLOGY.md`](METHODOLOGY.md) for collection, normalization, claim-risk, and update rules. See [`DATA_DICTIONARY.md`](DATA_DICTIONARY.md) for field definitions.

Related public resources:

- [MAXDECALS Knowledge Hub](https://maxdecals.us/pages/knowledge-hub)
- [Graphictac](https://graphictac.us/)

## License and trademarks

Dataset and documentation content is released under [Creative Commons Attribution 4.0 International](LICENSE.md). Manufacturer names, product names, and trademarks remain the property of their respective owners. Their inclusion identifies source material and comparison context; it does not imply endorsement.

## Citation

Use the metadata in [`CITATION.cff`](CITATION.cff), or cite:

> Graphictac. *Graphictac Knowledge Base Database*, version 0.1.0, 2026. https://github.com/funkiki-david/Graphictac-KnowlegeBase-database

## Version

Current release: **0.1.0** — initial public research snapshot, published 2026-07-18.
