import { formatDocumentToMarkdown } from '../src/formatter';

test('ドキュメントをMarkdown形式で出力できる', () => {
  const input = {
    title: 'テキトーな資料',
    sections: [
      {
        heading: 'イントロダクション',
        content: ['これはテスト用のイントロです。']
      },
      {
        heading: 'まとめ',
        content: ['これはまとめです。']
      }
    ]
  };

  const expected = `# テキトーな資料

## イントロダクション

これはテスト用のイントロです。

---

## まとめ

これはまとめです。

---`;
  const actual = formatDocumentToMarkdown(input);
  expect(actual.trim()).toBe(expected.trim());
});

