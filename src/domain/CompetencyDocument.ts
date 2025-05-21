export class CompetencyDocument {
  constructor(
    public readonly competencyName: string,
    public readonly perspectives: any[],
    public readonly episodes: any[],
  ) {}

  toMarkdown(): string {

    let markdown = `# ${this.competencyName}\n\n`;

    const lines: string[] = [];
    (['current', 'upper'] as const).forEach(type => {
      const perspective = this.perspectives.find(p => p.type === type);
      if (perspective) {
        lines.push(...this.formatPerspectiveSection(type, perspective));
      }
    });
    markdown += lines.join('\n');

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

  private formatPerspectiveSection(
    type: 'current' | 'upper',
    perspective: {level: string; perspective: string; example: string}
  ): string[] {
    const label = type === 'upper' ? '上位の期待値' : '現在の評価観点';
    return [
      `## ${label}`,
      `- レベル: ${perspective.level}`,
      `- 観点: ${perspective.perspective}`,
      `- 具体例: ${perspective.example}`,
      ''
    ];
  }
}
