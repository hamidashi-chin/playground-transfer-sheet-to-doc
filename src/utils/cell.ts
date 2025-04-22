export function cellToIndexes(cell: string): [number, number] {

  const match = cell.match(/^([A-Z]+)(\d+)$/);
  if (!match) {
    throw new Error(`Invalid cell format: ${cell}`);
  }
  const colLetters = match[1];
  const row = parseInt(match[2], 10) - 1 ;

  /**
   * Excelの列のindex(番号)を取得します。
   */
  let col = 0;
  for (let i = 0; i < colLetters.length; i++) {
    col *= 26;
    col += colLetters.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
  }

  // セルのindex [row, col]
  return [row, col - 1];
}
