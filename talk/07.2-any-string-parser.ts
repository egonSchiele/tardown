import { many1 } from "./commonParsers.js";
import { ParserResult } from "./types";

const anyChar = (input: string): ParserResult => {
  if (input.length === 0) {
    return {
      success: false,
      message: "Expected any character, got nothing",
      rest: input,
    };
  } else {
    return {
      success: true,
      parsed: input[0],
      rest: input.slice(1),
    };
  }
};

const stringParser = many1(anyChar);

console.log("hello", stringParser("hello"));
console.log("hella", stringParser("hella"));
console.log("empty string", stringParser(""));
