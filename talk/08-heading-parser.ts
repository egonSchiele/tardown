import { char, seq } from "./commonParsers.js";
import { Parser, ParserResult } from "./types.js";

const many1 = (parser: Parser): Parser => {
  return (input: string): ParserResult => {
    let rest = input;
    let parsed = "";
    while (true) {
      const result = parser(rest);
      if (result.success) {
        parsed += result.parsed;
        rest = result.rest;
      } else {
        if (parsed.length === 0) {
          return result;
        } else {
          return {
            success: true,
            parsed,
            rest,
          };
        }
      }
    }
  };
};

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

const headingParser = seq([many1(char("#")), char(" "), many1(anyChar)]);

console.log(headingParser("# Hello, world!"));
console.log(headingParser("Hello, world!"));
