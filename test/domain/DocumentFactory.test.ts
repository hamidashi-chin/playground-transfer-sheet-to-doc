import { Config } from "../../config/loadConfig";
import { DocumentFactory } from "../../src/domain/DocumentFactory";

const mockValues = [
  ['', 'チームワーク', ''], // B1 = itemName
  ["2\n(現)", 'メンバーを育成する', '具体例A'], // A2~C2 = current
  ['3\n(上)', 'メンバーを巻き込んで育成する', '具体例B'], // A3~C3 = upper
  [], [], // 空行
  ['','','',''], // 5行目
  ['', '', 'OJTでサポートした', '4', '3', '山田太郎'], // 6行目
];

const mockConfig: Config = {
  itemName: 'B1',
  perspectives: {
    current: { level: 'A2', perspective: 'B2', example: 'C2' },
    upper: { level: 'A3', perspective: 'B3', example: 'C3' }
  },
  valuationTargets: {
    startLine: '6',
    episode: 'C',
    targetEvaluation: 'D',
    supervisorEvaluation: 'E',
    targetName: 'F'
  }
};

test('itemNameを読み取ってtitleに設定できる', () => {
  const doc = DocumentFactory.fromExcel(mockValues, mockConfig);
  expect(doc.competencyName).toBe('チームワーク');
});

test('perspectives.currentを読み取って格納させる', () => {
  const doc = DocumentFactory.fromExcel(mockValues, mockConfig);
  expect(doc.perspectives[0]).toEqual({
    type: 'current',
    level: 2,
    perspective: 'メンバーを育成する',
    example: '具体例A'
  });
});

test('perspectives.upperを読み取って格納させる', () => {
  const doc = DocumentFactory.fromExcel(mockValues, mockConfig);
  expect(doc.perspectives[1]).toEqual({
    type: 'upper',
    level: 3,
    perspective: 'メンバーを巻き込んで育成する',
    example: '具体例B'
  });
});

test('valuationTargetsを走査してエピソードを格納できる', () => {
  const doc = DocumentFactory.fromExcel(mockValues, mockConfig);
  expect(doc.episodes).toEqual([
    {
      targetName: '山田太郎',
      episode: 'OJTでサポートした',
      targetEvaluation: '4',
      supervisorEvaluation: '3'
    }
  ]);
});