import { char, seq } from "./commonParsers.js";

const string = (str: string) => {
  const chars = Array.from(str);
  const parsers = chars.map((c) => char(c));
  return seq(parsers);
};

const helloParser = string("hello");

console.log("hello", helloParser("hello"));
console.log("hella", helloParser("hella"));

export {};
