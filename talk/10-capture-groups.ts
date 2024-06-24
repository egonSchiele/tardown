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
} from "tarsec";

const headingParser = seqC(
  capture(many1(char("#")), "level"),
  spaces,
  capture(many1Till(or(char("\n"), eof)), "content")
);

console.log(headingParser("# Hello, world!"));
console.log(headingParser("Hello, world!"));
