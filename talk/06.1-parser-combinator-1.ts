import { char } from "./commonParsers.js";
import { Parser, ParserResult } from "./types";

const many = (parser: Parser): Parser => {
  return (input: string): ParserResult => {
    let rest = input;
    let parsed = "";
    while (true) {
      const result = parser(rest);
      if (result.success) {
        parsed += result.parsed;
        rest = result.rest;
      } else {
        return {
          success: true,
          parsed,
          rest,
        };
      }
    }
  };
};

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

const bParser = many1(char("b"));

console.log("bParser");
console.log("a", bParser("a"));
console.log("b", bParser("b"));
console.log("bbb", bParser("bbb"));
