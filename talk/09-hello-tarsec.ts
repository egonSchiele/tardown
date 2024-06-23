import {
  capture,
  char,
  count,
  eof,
  many1,
  many1Till,
  or,
  Parser,
  seqC,
  seqR,
  set,
  spaces,
} from "tarsec";

const headingParser = seqR(
  many1(char("#")),
  spaces,
  many1Till(or(char("\n"), eof))
);

console.log(headingParser("# Hello, world!"));
console.log(headingParser("Hello, world!"));
