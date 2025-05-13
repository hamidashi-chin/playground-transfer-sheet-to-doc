import { loadConfig } from "../config/loadConfig";
import { readExcelFile } from "./infrastructure/excel/readExcelFile";

// const sheetId = '1Tb0gZxGOCiBlbFZKZdXgXp5dV-IDtX3J';
const sheetId = '1U6HQuh5IfwgKzcIe7CdC3GUgDV_MgcCjjy0oYsIKZxY';
// const range = 'A1:I25';
// const range = 'sheet1!A1:I25';
const range = 'sheet01!A1:I30';

async function main() {
  const config = loadConfig('config.json');
  const values = readExcelFile('sample.xlsx');
  console.log('読み取った内容：', values);
}

main().catch(console.error);
