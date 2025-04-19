import { CompetencyDocument } from "../src/domain/CompetencyDocument";

test('toMarkdownで観点と評価が含まれる Markdownを生成できる', () => {
  const doc = new CompetencyDocument(
    'チームワーク',
    [
      {title: 'チームワーク', description: ['ほげほげ']}
    ],
    [
      {name: 'ふがふが', content: 'テストテスト'},
      {name: 'ぴよぴよ', content: 'テストテストテスト'}
    ]
  );

  const expected = 'hoge';

//   const expected = `# チームワーク

// ## チームワーク

// ほげほげ

// ---

// ### ふがふが

// テストテスト

// ---

// ### ぴよぴよ

// テストテストテスト

// ---`;

  expect(doc.toMarkdown().trim()).toBe(expected.trim());
});
