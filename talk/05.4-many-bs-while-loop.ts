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
let rest = "bbb";
while (true) {
  const result = bParser(rest);
  console.log({ result });
  if (result.success) {
    rest = result.rest;
  } else {
    break;
  }
}


const cParser = char("c");
rest = "ccc";
while (true) {
  const result = cParser(rest);
  console.log({ result });
  if (result.success) {
    rest = result.rest;
  } else {
    break;
  }
}

export { };
