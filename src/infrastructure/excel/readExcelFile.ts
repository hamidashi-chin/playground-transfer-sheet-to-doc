import * as fs from "fs";
import * as xlsx from "xlsx";

export function readExcelFile(filePath: string): string[][] {
  const buffer = fs.readFileSync(filePath);
  const workbook = xlsx.read(buffer, { type: 'buffer' });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const range = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

  return range;
}
