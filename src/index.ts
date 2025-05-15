import path from "path";
import { loadConfig } from "../config/loadConfig";
import { readExcelFile } from "./infrastructure/excel/readExcelFile";
import { DocumentFactory } from "./domain/DocumentFactory";
import { writeMarkdownToFile } from "./utils/writeMarkdown";

// const sheetId = '1Tb0gZxGOCiBlbFZKZdXgXp5dV-IDtX3J';
const sheetId = '1U6HQuh5IfwgKzcIe7CdC3GUgDV_MgcCjjy0oYsIKZxY';
// const range = 'A1:I25';
// const range = 'sheet1!A1:I25';
const range = 'sheet01!A1:I30';

async function main() {
  const config = loadConfig(path.join(__dirname, '../config/config.json'));
  const values = readExcelFile(path.join(__dirname, '../test/asserts/テスト用excel.xlsx'));

  const doc = DocumentFactory.fromExcel(values, config);
  const markdown = doc.toMarkdown();
  
  writeMarkdownToFile(markdown, doc.competencyName);
}

main().catch(console.error);
