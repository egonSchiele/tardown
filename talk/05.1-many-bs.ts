const char = (character: string) => {
  return (input: string) => {
    return input[0] === character;
  };
};

const bParser = char("b");
console.log("bbb", bParser("bbb"));

export {};
