import {
  char,
  eof,
  many1,
  many1Till,
  or,
  parserDebug,
  seqR,
  spaces,
} from "tarsec";

const headingParser = seqR(
  many1(char("#")),
  spaces,
  many1Till(or(char("\n"), eof))
);

parserDebug("headingParser", () => {
  headingParser("# Hello, world!");
});
