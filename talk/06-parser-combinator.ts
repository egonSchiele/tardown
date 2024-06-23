import { char } from "./commonParsers.js";
import { Parser, ParserResult } from "./types.js";

const seq = (parsers: Parser[]) => {
  return (input: string): ParserResult => {
    let rest = input;
    let parsed = "";
    for (const parser of parsers) {
      const result = parser(rest);
      if (result.success) {
        parsed += result.parsed;
        rest = result.rest;
      } else {
        return result;
      }
    }
    return {
      success: true,
      parsed,
      rest,
    };
  };
};

const helloParser = seq([
  char("h"),
  char("e"),
  char("l"),
  char("l"),
  char("o"),
]);

console.log("hello", helloParser("hello"));
console.log("hella", helloParser("hella"));

export {};
