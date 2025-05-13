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

  test('perspectives.upper をMarkdownに変換できる', () => {
    const doc = new CompetencyDocument(
      '育成力',
      [
        {
          type: 'upper',
          level: '4',
          perspective: 'メンバーを巻き込んで育成する',
          example: '具体例B',
        }
      ],
      []
    );
  
    const markdown = doc.toMarkdown();
  
    expect(markdown).toContain('## 上位の期待値');
    expect(markdown).toContain('- レベル: レベル4');
    expect(markdown).toContain('- 観点: メンバーを巻き込んで育成する');
    expect(markdown).toContain('- 具体例: 具体例B');
  });

  test('episodes をMarkdownに変換できる', () => {
    const doc = new CompetencyDocument(
      '育成力',
      [],
      [
        {
          targetName: '山田太郎',
          episode: 'OJTでサポートした',
          targetEvaluation: '4',
          supervisorEvaluation: '3'
        }
      ],
    );

    const markdown = doc.toMarkdown();

    expect(markdown).toContain('### 山田太郎');
    expect(markdown).toContain('OJTでサポートした');
    expect(markdown).toContain('自己評価: 4 / 上長評価: 3');
  });

  test('全体のMarkdownを出力できる', () => {
    const doc = new CompetencyDocument(
      '育成力',
      [
        {
          type: 'current',
          level: '3',
          perspective: 'メンバーを育成する',
          example: '具体例A',
        },
        {
          type: 'upper',
          level: '4',
          perspective: 'メンバーを巻き込んで育成する',
          example: '具体例B',
        }
      ],
      [
        {
          targetName: '山田太郎',
          episode: 'OJTでサポートした',
          targetEvaluation: '4',
          supervisorEvaluation: '3',
        },
        {
          targetName: '佐藤花子',
          episode: '資料作成をリードした',
          targetEvaluation: '5',
          supervisorEvaluation: '4',
        }
      ]
    );
  
    const markdown = doc.toMarkdown();
  
    expect(markdown).toContain('# 育成力');
  
    expect(markdown).toContain('## 現在の評価観点');
    expect(markdown).toContain('- レベル: レベル3');
    expect(markdown).toContain('- 観点: メンバーを育成する');
    expect(markdown).toContain('- 具体例: 具体例A');
  
    expect(markdown).toContain('## 上位の期待値');
    expect(markdown).toContain('- レベル: レベル4');
    expect(markdown).toContain('- 観点: メンバーを巻き込んで育成する');
    expect(markdown).toContain('- 具体例: 具体例B');
  
    expect(markdown).toContain('### 山田太郎');
    expect(markdown).toContain('OJTでサポートした');
    expect(markdown).toContain('自己評価: 4 / 上長評価: 3');
  
    expect(markdown).toContain('### 佐藤花子');
    expect(markdown).toContain('資料作成をリードした');
    expect(markdown).toContain('自己評価: 5 / 上長評価: 4');
  });
});
