import { Config } from "../../config/loadConfig";
import { cellToIndexes } from "../utils/cell";
import { CompetencyDocument } from "./CompetencyDocument";

export class DocumentFactory {
  static fromExcel(values: string[][], config: Config, competencyName: string): CompetencyDocument {

    // コンピテンシー名を取得します
    const title = competencyName;

    /**
     * 現等級の観点等取得します
     */
    const current = config.perspectives.current;
    const [levelRow, levelCol] = cellToIndexes(current.level);
    const [perspRow, perspCol] = cellToIndexes(current.perspective);
    const [exRow, exCol]       = cellToIndexes(current.example);
    const level = parseInt(values[levelRow]?.[levelCol] ?? '', 10);

    const perspectiveCurrent = {
      type: 'current' as const,
      level: level,
      perspective: values[perspRow]?.[perspCol] ?? '',
      example: values[exRow]?.[exCol] ?? ''
    };

    /**
     * １つ上の等級の観点等取得します
     */
    const upper = config.perspectives.upper;
    const [uLevelRow, uLevelCol] = cellToIndexes(upper.level);
    const [uPerspRow, uPerspCol] = cellToIndexes(upper.perspective);
    const [uExRow, uExCol]       = cellToIndexes(upper.example);
    const uLevel = parseInt(values[uLevelRow]?.[uLevelCol] ?? '', 10);

    const perspectiveUpper = {
      type: 'upper' as const,
      level: uLevel,
      perspective: values[uPerspRow]?.[uPerspCol] ?? '',
      example: values[uExRow]?.[uExCol] ?? '',
    };

    /**
     * エピソード取得します
     */
    const startRow = parseInt(config.valuationTargets.startLine, 10) - 1;
    const episodes = [];
    for (let row = startRow; row < values.length; row++) {
      const episode = values[row]?.[cellToIndexes(config.valuationTargets.episode + row)[1]] ?? '';
      const targetEval = values[row]?.[cellToIndexes(config.valuationTargets.targetEvaluation + row)[1]] ?? '';
      const supervisorEval = values[row]?.[cellToIndexes(config.valuationTargets.supervisorEvaluation + row)[1]] ?? '';
      const name = values[row]?.[cellToIndexes(config.valuationTargets.targetName + row)[1]] ?? '';

      if (!episode && !targetEval && !supervisorEval && !name) continue;

      episodes.push({
        targetName: name,
        episode,
        targetEvaluation: targetEval,
        supervisorEvaluation: supervisorEval,
      });
    }

    return new CompetencyDocument(title, [perspectiveCurrent, perspectiveUpper], episodes);
  }
}
