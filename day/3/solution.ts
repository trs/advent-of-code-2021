import { readInputLines } from "lib/read.ts";

type Bit = 0 | 1;
type Bits = Bit[];
type BitsArray = Bits[];

const bitsArray = (await readInputLines())
  .map((value) => value.split("").map(Number) as Bits);

// Part 1

const bitsums = bitsArray.reduce(
  (sums, bits) =>
    sums.map((sum, i) => {
      return sum.set(bits[i], sum.get(bits[i])! + 1);
    }),
  Array.from<Map<0 | 1, number>>({ length: bitsArray[0].length }).map(() =>
    new Map([
      [0, 0],
      [1, 0],
    ])
  ),
);

const analyzeBitsums = (fn: (zero: number, one: number) => Bit) =>
  bitsums.map((sums) => fn(sums.get(0)!, sums.get(1)!)).join("");

const mostCommon = analyzeBitsums((zero, one) => zero > one ? 0 : 1);
const leastCommon = analyzeBitsums((zero, one) => zero < one ? 0 : 1);

const gammaRate = parseInt(mostCommon, 2);
const epsilonRate = parseInt(leastCommon, 2);

console.log("Part 1:", gammaRate * epsilonRate);

// Part 2

function getBitOccurrences(bitsArray: BitsArray, index: number) {
  return bitsArray.reduce((map, bits) => {
    return map.set(bits[index], [...map.get(bits[index])!, bits]);
  }, new Map<0 | 1, BitsArray>([[0, []], [1, []]]));
}

function gatherOccurrences(
  bitsArray: BitsArray,
  defaultBit: Bit,
  comp: (a: number, b: number) => 1 | 0 | -1,
  index = 0,
): Bits {
  const occurrences = getBitOccurrences(bitsArray, index);
  const comparator = comp(
    occurrences.get(0)!.length,
    occurrences.get(1)!.length,
  );

  const remainingBitsArray = comparator === 0
    ? occurrences.get(0)!
    : comparator === 1
    ? occurrences.get(1)!
    : occurrences.get(defaultBit)!;

  if (remainingBitsArray.length > 1) {
    return gatherOccurrences(remainingBitsArray, defaultBit, comp, index + 1);
  }

  return remainingBitsArray[0];
}

const mostCommonBits = gatherOccurrences(
  bitsArray,
  1,
  (a, b) => a < b ? 1 : b < a ? 0 : -1,
);
const leastCommonBits = gatherOccurrences(
  bitsArray,
  0,
  (a, b) => a > b ? 1 : b > a ? 0 : -1,
);

const oxygenGeneratorRating = parseInt(mostCommonBits.join(""), 2);
const co2ScrubberRating = parseInt(leastCommonBits.join(""), 2);

console.log("Part 2:", oxygenGeneratorRating * co2ScrubberRating);
