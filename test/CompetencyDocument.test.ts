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
});
