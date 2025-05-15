import fs from "fs";
import path from "path";

export function writeMarkdownToFile(markdown: string, title: string, outputDir = 'output') {
  const safeTitle = title.replace(/[\\/:*?"<>|]/g, '_');

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

  const filePath = path.join(outputDir, `${safeTitle}_${timestamp}.md`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(filePath, markdown, 'utf-8');
  console.log(`✅ Markdownファイルを書き出しました: ${filePath}`);
}
