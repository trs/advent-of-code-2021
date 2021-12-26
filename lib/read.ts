export const readInput = async () => await Deno.readTextFile("./input.txt");

export const readInputLines = async <T = string>(split = "\n") =>
  (await readInput()).split(split).filter(Boolean);

export const readInputLinesAsNumbers = async () =>
  (await readInputLines()).map((val) => Number(val));
