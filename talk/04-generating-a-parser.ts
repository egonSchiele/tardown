/*
const aParser2 = (input: string): boolean => {
  return input === "a";
};
*/

const char = (character: string) => {
  return (input: string) => {
    return input[0] === character;
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

console.log("bbb", bParser("bbb"));

export {};
