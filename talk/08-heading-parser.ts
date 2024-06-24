import { anyChar, char, many1, seq } from "./commonParsers.js";

const headingParser = seq([many1(char("#")), char(" "), many1(anyChar)]);

console.log(headingParser("# Hello, world!"));
console.log(headingParser("Hello, world!"));
