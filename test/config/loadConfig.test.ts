import fs from 'fs';
import path from 'path';
import { Config, loadConfig } from '../../config/loadConfig';

const mockConfigPath = path.join(__dirname, 'mockConfig.json');

const mockConfig: Config = {
  itemName: "B1",
  perspectives: {
    current: { level: "A2", perspective: "B2", example: "C2" },
    upper: { level: "A3", perspective: "B3", example: "C3" }
  },
  valuationTargets: {
    startLine: "6",
    episode: "C",
    targetEvaluation: "D",
    supervisorEvaluation: "E",
    targetName: "F"
  }
};

beforeAll(() => {
  fs.writeFileSync(mockConfigPath, JSON.stringify(mockConfig, null, 2), 'utf-8');
});

afterAll(() => {
  fs.unlinkSync(mockConfigPath);
});

test('itemNameを取得できる', () => {
  const config = loadConfig(mockConfigPath);
  expect(config.itemName).toEqual('B1');
});

test('現等級のレベル、観点、エピソード例が取得できる', () => {
  const config = loadConfig(mockConfigPath);
  expect(config.perspectives.current.level).toEqual('A2');
  expect(config.perspectives.current.perspective).toEqual('B2');
  expect(config.perspectives.current.example).toEqual('C2');
});

test('正常にconfig.jsonを読み込める', () => {
  const config = loadConfig(mockConfigPath);
  expect(config).toEqual(mockConfig);
});