import path from "path";
import { loadConfig } from "../config/loadConfig";
import { readExcelSheets } from "./infrastructure/excel/readExcelFile";
import { DocumentFactory } from "./domain/DocumentFactory";
import { writeMarkdownToFile } from "./utils/writeMarkdown";
import { inputExcelPath } from "./cli";
import { getTimestampDirName } from "./utils/timestampDir";

async function main() {
  const config = loadConfig(path.join(__dirname, '../config/config.json'));
  console.log('config:', config);
  const allValidatedCompetencies = readExcelSheets(inputExcelPath);
  const outputDir = getTimestampDirName(path.join(__dirname, '../output'));

  for (const [competencyName, values] of Object.entries(allValidatedCompetencies)) {
    const doc = DocumentFactory.fromExcel(values, config, competencyName);
    const markdown = doc.toMarkdown();
    writeMarkdownToFile(markdown, competencyName, outputDir);
  }
}

main().catch(console.error);
