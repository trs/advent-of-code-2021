import { readInputLinesAsNumbers } from "../../lib/read.ts";

const values = await readInputLinesAsNumbers();

// Part 1

const [increases] = values.reduce(([increases, previous], next) => [
  next > previous ? increases + 1 : increases,
  next,
], [-1, -1]);

console.log("Part 1:", increases);

// Part 2

const [increasesSlidingScale] = values
  .reduce((tuples, value) => {
    tuples.push([]);

    return tuples.map((tuple) =>
      tuple.length < 3 ? [...tuple, value] : tuple
    ) as [number?, number?, number?][];
  }, [] as [number?, number?, number?][])
  .map(([a, b, c]) => (a ?? 0) + (b ?? 0) + (c ?? 0))
  .reduce(([increases, previous], next) => [
    next > previous ? increases + 1 : increases,
    next,
  ], [-1, -1]);

console.log("Part 2:", increasesSlidingScale);
