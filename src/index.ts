import path from "path";
import { loadConfig } from "../config/loadConfig";
import { readExcelFile } from "./infrastructure/excel/readExcelFile";
import { DocumentFactory } from "./domain/DocumentFactory";
import { writeMarkdownToFile } from "./utils/writeMarkdown";
import { inputExcelPath } from "./cli";

async function main() {
  const config = loadConfig(path.join(__dirname, '../config/config.json'));
  const values = readExcelFile(inputExcelPath);
  const doc = DocumentFactory.fromExcel(values, config);
  const markdown = doc.toMarkdown();
  writeMarkdownToFile(markdown, doc.competencyName);
}

main().catch(console.error);
