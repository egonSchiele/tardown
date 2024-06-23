function aParser(input: string): boolean {
  return input === "a";
}

function bParser(input: string): boolean {
  return input === "b";
}

console.log("aParser");
console.log("a", aParser("a"));
console.log("b", aParser("b"));

console.log("bParser");
console.log("a", bParser("a"));
console.log("b", bParser("b"));

export {};
