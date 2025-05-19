import fs from "fs";
import path from "path";

export function writeMarkdownToFile(markdown: string, title: string, outputDir = 'output') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const safeTitle = title.replace(/[\\/:*?"<>|]/g, '_');
  const filePath = path.join(outputDir, `${safeTitle}.md`);

  fs.writeFileSync(filePath, markdown, 'utf-8');

  console.log(`✅ Markdownファイルを書き出しました: ${filePath}`);
}
