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

const bParser = char("b");
const result1 = bParser("bbb");
console.log({ result1 });
if (result1.success) {
  const result2 = bParser(result1.rest);
  console.log({ result2 });
}

export {};
