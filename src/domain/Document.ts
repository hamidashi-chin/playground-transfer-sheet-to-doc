export type Section = {
  heading: string;
  content: string[];
}

export class Document {
  constructor(
    public readonly title: string,
    public readonly sections: Section[],
  ) {}

  toMarkdown(): string {
    const lines: string[] = [];
    
    lines.push(`# ${this.title}`, '');

    for (const section of this.sections) {
      lines.push(`## ${section.heading}`, '');
      lines.push(...section.content, '', '---', '');
    }

    return lines.join('\n').trim();
  }
}
