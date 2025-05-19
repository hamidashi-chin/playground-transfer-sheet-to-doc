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

export function readExcelSheets(filePath: string): Record<string, string[][]> {
  const buffer = fs.readFileSync(filePath);
  const workbook = xlsx.read(buffer, { type: 'buffer' });

  const result: Record<string, string[][]> = {};

  for (const sheetName of workbook.SheetNames) {
    // @todo コンピ項目名と一致するシートしか取得しない
    const sheet = workbook.Sheets[sheetName];
    const values = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      defval: '',
    }) as string[][];

    result[sheetName] = values;
  }
  return result;
}
