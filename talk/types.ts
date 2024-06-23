export type ParserSuccess = {
  success: true;
  parsed: string;
  rest: string;
};

/** Represents a parse failure. */
export type ParserFailure = {
  success: false;
  message: string;
  rest: string;
};

export type ParserResult = ParserSuccess | ParserFailure;
export type Parser = (input: string) => ParserResult;
