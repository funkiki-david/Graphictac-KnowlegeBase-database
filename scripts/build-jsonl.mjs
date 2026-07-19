import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");
const files = [
  "printer_brand_research_matrix.csv",
  "competitor_product_research_matrix.csv",
  "source_library.csv"
];

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];
    if (quoted && char === '"' && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [headers, ...values] = rows;
  return values.map((cells, rowIndex) => {
    if (cells.length !== headers.length) {
      throw new Error(`Column mismatch on row ${rowIndex + 2}: expected ${headers.length}, received ${cells.length}`);
    }
    return Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
  });
}

const manifest = {
  name: "MaxDecals Knowledge Base Database",
  version: "0.1.0",
  published: "2026-07-18",
  license: "CC-BY-4.0",
  publisher: "MaxDecals USA",
  canonical_url: "https://maxdecals.us/pages/knowledge-hub",
  repository: "https://github.com/funkiki-david/MaxDecals-Knowledge-Base-Database",
  dataset_mirror: "https://huggingface.co/datasets/funkikitech/MaxDecals-Knowledge-Base-Database",
  datasets: []
};

for (const file of files) {
  const csvPath = path.join(dataDir, file);
  const input = fs.readFileSync(csvPath, "utf8");
  const records = parseCsv(input);
  const jsonlName = file.replace(/\.csv$/, ".jsonl");
  const jsonlPath = path.join(dataDir, jsonlName);
  const jsonl = `${records.map((record) => JSON.stringify(record)).join("\n")}\n`;
  fs.writeFileSync(jsonlPath, jsonl, "utf8");

  manifest.datasets.push({
    name: file.replace(/\.csv$/, ""),
    csv: `data/${file}`,
    jsonl: `data/${jsonlName}`,
    rows: records.length,
    csv_sha256: crypto.createHash("sha256").update(input).digest("hex"),
    jsonl_sha256: crypto.createHash("sha256").update(jsonl).digest("hex")
  });
}

fs.writeFileSync(path.join(root, "dataset_manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(JSON.stringify(manifest, null, 2));
