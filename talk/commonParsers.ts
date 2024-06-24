import { Parser, ParserResult } from "./types";

export const char = (character: string) => {
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

export const seq = (parsers: Parser[]) => {
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

export const many1 = (parser: Parser): Parser => {
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

export const anyChar = (input: string): ParserResult => {
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
