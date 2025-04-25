import { CompetencyDocument } from "../src/domain/CompetencyDocument";

describe('CompetencyDocument', () => {
  test('タイトルと水平線までをMarkdownに変換できる', () => {
    const doc = new CompetencyDocument(
      'チームワーク',
      [],
      []
    );

    const markdown = doc.toMarkdown();

    expect(markdown).toContain('# チームワーク');
    expect(markdown).toContain('---');
  });

  test('perspectives.current をMarkdownに変換できる', () => {
    const doc = new CompetencyDocument(
      'チームワーク',
      [
        {
          type: 'current',
          level: '3',
          perspective: 'メンバーを育成する',
          example: '具体例A',
        }
      ],
      []
    );

    const markdown = doc.toMarkdown();

    expect(markdown).toContain('## 現在の評価観点');
    expect(markdown).toContain('- レベル: レベル3');
    expect(markdown).toContain('- 観点: メンバーを育成する');
    expect(markdown).toContain('- 具体例: 具体例A');
  });
});
