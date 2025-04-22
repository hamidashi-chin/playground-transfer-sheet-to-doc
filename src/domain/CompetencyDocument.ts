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
    return 'hoge';
  }
}
