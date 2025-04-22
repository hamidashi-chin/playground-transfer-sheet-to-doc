import { Config } from "../../config/loadConfig";
import { cellToIndexes } from "../utils/cell";
import { CompetencyDocument } from "./CompetencyDocument";

export class DocumentFactory {
  static fromExcel(values: string[][], config: Config): CompetencyDocument {

    const [titleRow, titleCol] = cellToIndexes(config.itemName);
    const title = values[titleRow]?.[titleCol] ?? '';

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

    return new CompetencyDocument(title, [perspectiveCurrent, perspectiveUpper], []);
  }
}
