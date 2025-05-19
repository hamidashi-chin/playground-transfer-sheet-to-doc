import fs from "fs";
import path from "path";
import { writeMarkdownToFile } from "../../src/utils/writeMarkdown";

describe('writeMarkdownToFile', () => {
  const outputDir = path.resolve(__dirname, '../../test-output');
  const title = 'test_document';
  const expectedPath = path.join(outputDir, `${title}.md`);
  console.log(`expectedPath: ${expectedPath}`);

  afterAll(() => {
    if (fs.existsSync(outputDir)) {
      fs.rmSync(outputDir, { recursive:true, force: true });
    }
  });

  test('Markdownファイルを書き出せる', () => {
    writeMarkdownToFile('# タイトル\n\n内容です', title, outputDir);
    expect(fs.existsSync(expectedPath)).toBe(true);
  });
});
