import {
  capture,
  char,
  count,
  eof,
  many1Till,
  or,
  Parser,
  seqC,
  set,
  spaces,
  many1,
  parserDebug,
  sepBy,
} from "tarsec";

type Heading = {
  type: "heading";
  level: number;
  content: string;
};

type Paragraph = {
  type: "paragraph";
  content: string;
};

type Markdown = Heading | Paragraph;

const headingParser: Parser<Heading> = seqC(
  set("type", "heading"),
  capture(count(char("#")), "level"),
  spaces,
  capture(many1Till(or(char("\n"), eof)), "content")
);

const paragraphParser: Parser<Paragraph> = seqC(
  set("type", "paragraph"),
  capture(many1Till(or(char("\n"), eof)), "content")
);

const markdownParser: Parser<Markdown[]> = sepBy(
  spaces,
  or(headingParser, paragraphParser)
);

const markdown = `
# TypeScript

TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS.
`;

console.log(markdownParser(markdown.trim()));
