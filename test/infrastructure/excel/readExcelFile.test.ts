import path from 'path';
import { readExcelFile } from '../../../src/infrastructure/excel/readExcelFile';

describe('readExcelFile', () => {
  test('Excelファイルを読み込み、２次元配列として返す', () => {
    const filePath = path.join(__dirname, '../../asserts/テスト用excel.xlsx');
    const result = readExcelFile(filePath);

    // コンピ項目が取得できるか？
    expect(result[0][1]).toBe('チームワーク');

    // currentの項目が取得できるか？
    expect(result[1][0]).toBe('2\n(現)');
    expect(result[1][1]).toBe('■何事でも前向きに捉え、自ら進んで他のメンバーに協力している。');
    expect(result[1][2]).toBe('■メンバーからの依頼に対して、進んで協力している。\n■他のメンバーが抱えている問題に対して、自分が提供できる情報・ツールなどがあれば惜しみなく提供し、問題の解決を支援している。');

    // upperの項目が取得できるか？
    expect(result[2][0]).toBe('3\n(上)');
    expect(result[2][1]).toBe('■他者の考えや能力を尊重し、そこから学ぼうとしたり、情報を積極的に交換している。');
    expect(result[2][2]).toBe('■他者の考えや意見を尊重して、耳を傾けている。\n■質問の仕方を工夫して有用な意見・アイデアを引き出し、チームや課題解決に役立てている。\n■自分が学んだ知識・スキルや、自分が得た有用な情報をチームメンバーにシェアするための勉強会などを積極的に開催している。');

    // episodeが取得できるか？
    // １人目
    expect(result[5][2]).toBe('チームワークエピソード　ああああ');
    expect(result[5][3]).toBe(3);
    expect(result[5][4]).toBe(4);
    expect(result[5][5]).toBe('テスト　あああ');

    // 20人目
    expect(result[24][2]).toBe('チームワークエピソード　とととと');
    expect(result[24][3]).toBe(5);
    expect(result[24][4]).toBe(5);
    expect(result[24][5]).toBe('テスト　ととと');
  });
});