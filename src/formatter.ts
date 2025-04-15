type DocumentSection = {
  heading: string;
  content: string[];
};

type DocumentInput = {
  title: string;
  sections: DocumentSection[];
};

export function formatDocumentToMarkdown(doc: DocumentInput): string {
  const lines: string[] = [];

  lines.push(`# ${doc.title}`, '');

  for (const section of doc.sections) {
    lines.push(`## ${section.heading}`, '');
    lines.push(...section.content, '', '---', '');
  }

  return lines.join('\n').trim();
}