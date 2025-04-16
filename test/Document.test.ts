import { Document } from '../src/domain/Document';

test('DocumentクラスがMarkdownに変換できる', () => {
  const doc = new Document('テスト資料', [
    {
      heading: '概要',
      content: ['これは概要です。']
    },
    {
      heading: '詳細',
      content: ['これは詳細です。']
    }
  ]);

  const expected = `# テスト資料

## 概要

これは概要です。

---

## 詳細

これは詳細です。

---`;

  expect(doc.toMarkdown().trim()).toBe(expected.trim());
});
