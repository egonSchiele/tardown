import { capture, char, eof, many1, many1Till, or, seqC, spaces } from "tarsec";

const headingParser = seqC(
  capture(many1(char("#")), "level"),
  spaces,
  capture(many1Till(or(char("\n"), eof)), "content")
);

console.log(headingParser("# Hello, world!"));
console.log(headingParser("Hello, world!"));
