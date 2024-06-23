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
} from "tarsec";

type Heading = {
  type: "heading";
  level: number;
  content: string;
};

const headingParser: Parser<Heading> = seqC(
  set("type", "heading"),
  capture(count(char("#")), "level"),
  spaces,
  capture(many1Till(or(char("\n"), eof)), "content")
);

parserDebug("headingParser", () => {
  headingParser("# Hello, world!");
});
