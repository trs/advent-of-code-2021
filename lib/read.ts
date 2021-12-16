export const readInput = async () => await Deno.readTextFile("./input.txt");

export const readInputLines = async () =>
  (await readInput()).split("\n").filter(Boolean);

export const readInputLinesAsNumbers = async () =>
  (await readInputLines()).map((val) => Number(val));
