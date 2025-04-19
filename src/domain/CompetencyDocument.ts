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
    public readonly perspectives: Perspective[],
    public readonly episodes: Episode[],
  ) {}

  toMarkdown(): string {
    return 'hoge';
  }
}
