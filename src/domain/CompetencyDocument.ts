type Perspective = {
  title: string;
  description: string[];
}

type Episode = {
  name: string;
  content: string;
}

export class CompetencyDocument {
  constructor(
    public readonly competencyName: string,
    public readonly perspectives: any[],
    public readonly episodes: any[],
  ) {}

  toMarkdown(): string {

    let markdown = `# ${this.competencyName}\n\n`;

    const current = this.perspectives.find(p => p.type === 'current');
    if (current) {
      markdown += `## 現在の評価観点\n`;
      markdown += `- レベル: レベル${current.level}\n`;
      markdown += `- 観点: ${current.perspective}\n`;
      markdown += `- 具体例: ${current.example}\n\n`;
    }

    const upper = this.perspectives.find(p => p.type === 'upper');
    if (upper) {
      markdown += `## 上位の期待値\n`;
      markdown += `- レベル: レベル${upper.level}\n`;
      markdown += `- 観点: ${upper.perspective}\n`;
      markdown += `- 具体例: ${upper.example}\n\n`;
    }

    markdown += `---\n\n`;

    if (this.episodes.length > 0) {
      for (const ep of this.episodes) {
        markdown += `### ${ep.targetName}\n`;
        markdown += `${ep.episode}\n`;
        markdown += `自己評価: ${ep.targetEvaluation} / 上長評価: ${ep.supervisorEvaluation}\n\n`;
      }
    }

    return markdown;
  }
}
