import fs from "fs";
import path from "path";

export type Config = {
  itemName: string;
  perspectives: {
    current: PerspectiveCells;
    upper: PerspectiveCells;
  };
  valuationTargets: {
    startLine: string;
    episode: string;
    targetEvaluation: string;
    supervisorEvaluation: string;
    targetName: string;
  };
};

type PerspectiveCells = {
  level: string;
  perspective: string;
  example: string;
};
export function loadConfig(configPath: string): Config {
  const fullPath = path.resolve(configPath);
  const json = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(json);
}
