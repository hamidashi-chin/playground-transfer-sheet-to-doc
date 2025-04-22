import { cellToIndexes } from '../../src/utils/cell';

describe('cellToIndexes', () => {
  test('B1→[0, 1]に変換できる', () => {
    const result = cellToIndexes('B1');
    expect(result).toEqual([0, 1]);
  });

  test('A1→[0, 0]に変換できる', () => {
    expect(cellToIndexes('A1')).toEqual([0, 0]);
  });

  test('AA10→[9, 26]に変換できる', () => {
    expect(cellToIndexes('AA10')).toEqual([9, 26]);
  });

  test('AAA256→[255, 676]に変換できる', () => {
    expect(cellToIndexes('AAA256')).toEqual([255, 702]);
  });
});
