import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";

const program = new Command();

program
  .option('-i, --input <path>', 'Excelファイルのパスを指定（.xlsx）')
  .parse(process.argv);

const options = program.opts();

// 入力チェック
if (!options.input) {
  console.error('❌ Excelファイルのパスが指定されていません。');
  process.exit(1);
}

const ext = path.extname(options.input);
if (!fs.existsSync(options.input)) {
  console.error(`❌ 指定されたファイルが存在しません: ${options.input}`);
  process.exit(1);
}

if (ext !== '.xlsx') {
  console.error(`❌ 対応しているのは .xlsx ファイルのみです: ${options.input}`);
  process.exit(1);
}

export const inputExcelPath = path.resolve(options.input);