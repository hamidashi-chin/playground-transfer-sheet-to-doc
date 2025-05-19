import path from "path";
import fs from "fs";

export function getTimestampDirName(baseDir: string): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  // suffix用タイムスタンプ文字列作成 `yyyymmdd_his`
  const timestamp = String(now.getFullYear())
                  + String(pad(now.getMonth()))
                  + String(pad(now.getDate()))
                  + '_'
                  + String(pad(now.getHours()))
                  + String(pad(now.getMinutes()))
                  + String(pad(now.getSeconds()));

  const outputDir = path.join(baseDir, timestamp);

  return outputDir;
}
