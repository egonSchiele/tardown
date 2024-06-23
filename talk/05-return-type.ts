import { ParserResult } from "./types";

const char = (character: string) => {
  return (input: string): ParserResult => {
    if (input[0] === character) {
      return {
        success: true,
        parsed: character,
        rest: input.slice(1),
      };
    } else {
      return {
        success: false,
        message: `Expected ${character}, got ${input[0]}`,
        rest: input,
      };
    }
  };
};

const aParser = char("a");
const bParser = char("b");

console.log("aParser");
console.log("a", aParser("a"));
console.log("b", aParser("b"));

console.log("bParser");
console.log("a", bParser("a"));
console.log("b", bParser("b"));

//console.log("and", aParser("and"));
export {};
