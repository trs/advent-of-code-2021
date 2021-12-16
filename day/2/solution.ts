import { readInputLines } from "../../lib/read.ts";

const directions = (await readInputLines()).map<
  [action: string, units: number]
>((direction) => {
  const [action, units] = direction.split(" ");
  return [action, Number(units)];
});

// Part 1

const [position, depth] = directions.reduce(
  ([position, depth], [action, units]) => {
    switch (action) {
      case "forward":
        position += units;
        break;
      case "down":
        depth += units;
        break;
      case "up":
        depth -= units;
        break;
    }
    return [position, depth];
  },
  [0, 0],
);

console.log("Part 1:", position * depth);

// Part 2

const [position2, depth2] = directions.reduce(
  ([position, depth, aim], [action, units]) => {
    switch (action) {
      case "forward":
        position += units;
        depth += aim * units;
        break;
      case "down":
        aim += units;
        break;
      case "up":
        aim -= units;
        break;
    }
    return [position, depth, aim];
  },
  [0, 0, 0],
);

console.log("Part 2:", position2 * depth2);
