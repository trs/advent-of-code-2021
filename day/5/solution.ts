import { readInputLines } from "lib/read.ts";

const inputLines = await readInputLines();

type Coordinates = [x: number, y: number];
type Line = [Coordinates, Coordinates];
type Map = number[][];

function buildLineCoordinates(inputLines: string[]): Line[] {
  return inputLines.filter(Boolean).map((line) => {
    return line.split(" -> ").map((coord) =>
      coord.split(",").map(Number)
    ) as Line;
  });
}

function buildMap(lines: Line[]): Map {
  const x = lines.reduce(
    (max, line) => Math.max(max, line[0][0], line[1][0]),
    0,
  );
  const y = lines.reduce(
    (max, line) => Math.max(max, line[0][1], line[1][1]),
    0,
  );

  return Array.from<number[]>({ length: y + 1 }).map(() =>
    Array.from<number>({ length: x + 1 }).fill(0)
  );
}

function onLine([[x1, y1], [x2, y2]]: Line, [x, y]: Coordinates): boolean {
  const dxc = x - x1;
  const dyc = y - y1;

  const dxl = x2 - x1;
  const dyl = y2 - y1;

  const cross = dxc * dyl - dyc * dxl;
  if (cross !== 0) return false;

  if (Math.abs(dxl) >= Math.abs(dyl)) {
    return dxl > 0 ? x1 <= x && x <= x2 : x2 <= x && x <= x1;
  } else {
    return dyl > 0 ? y1 <= y && y <= y2 : y2 <= y && y <= y1;
  }
}

function markLine(map: Map, line: Line): Map {
  return map.map((col, c) => {
    return col.map((row, r) => {
      return row + Number(onLine(line, [r, c]))
    })
  });
}

function sumPoints(map: Map, value: number) {
  return map.reduce(
    (sum, col) => col.reduce((s, row) => s + (row >= value ? 1 : 0), sum),
    0,
  );
}

const lines = buildLineCoordinates(inputLines);

const map = buildMap(lines);

// Part 1

const horizontalAndVerticalLines = lines.filter(([from, to]) => {
  return from[0] === to[0] || from[1] === to[1];
});

const part1Map = horizontalAndVerticalLines.reduce(
  (map, line) => markLine(map, line),
  map,
);

const overlappingPart1 = sumPoints(part1Map, 2);

console.log("Part 1:", overlappingPart1);

// Part 2

const part2Map = lines.reduce((map, line) => markLine(map, line), map);

const overlappingPart2 = sumPoints(part2Map, 2);

console.log("Part 2:", overlappingPart2);
