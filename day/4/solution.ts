import { readInputLines } from "lib/read.ts";

const [inputNumbers, ...inputBoards] = await readInputLines("\n\n");

type Board = (number | "x")[][];

function collectBoard(inputBoard: string): Board {
  return inputBoard.split("\n").map((row) => {
    return row.split(/ {1,2}/g).filter(Boolean).map(Number);
  });
}

function markBoard(board: Board, number: number) {
  return board.map((col) => {
    return col.map((row) => {
      return row === number ? "x" : row;
    });
  });
}

function checkBoard(board: Board): boolean {
  // Horizontal
  for (let c = 0; c < board.length; c++) {
    let line = 0;
    for (let r = 0; r < board[c].length; r++) {
      const cell = board[c][r];
      if (cell === "x") {
        line++;
      }
      if (line === board.length) {
        return true;
      }
    }
  }

  // Vertical
  for (let r = 0; r < board[0].length; r++) {
    let line = 0;
    for (let c = 0; c < board.length; c++) {
      const cell = board[c][r];
      if (cell === "x") {
        line++;
      }
      if (line === board.length) {
        return true;
      }
    }
  }

  // Diagonal TL -> BR
  for (let c = 0, r = 0; c < board.length; c++, r++) {
    let line = 0;
    const cell = board[c][r];
    if (cell === "x") {
      line++;
    }
    if (line === board.length) {
      return true;
    }
  }

  // Diagonal TR -> BL
  for (let c = board.length - 1, r = 0; c >= 0; c--, r++) {
    let line = 0;
    const cell = board[c][r];
    if (cell === "x") {
      line++;
    }
    if (line === board.length) {
      return true;
    }
  }
  return false;
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function sumBoard(board: Board): number {
  return board.reduce((sum, col) => {
    return sum + col.filter(isNumber).reduce((sum, row) => sum + row, 0);
  }, 0);
}

const numbers = inputNumbers.split(",").map(Number);

// Part 1

let boardsPt1 = inputBoards.map(collectBoard);

let firstWinner = 0;
for (const number of numbers) {
  if (firstWinner > 0) break;

  boardsPt1 = boardsPt1.map((board) => {
    if (firstWinner > 0) return board;

    board = markBoard(board, number);
    if (firstWinner === 0 && checkBoard(board)) {
      const sum = sumBoard(board);
      firstWinner = sum * number;
    }
    return board;
  });
}

console.log("Part 1:", firstWinner);

// Part 2

let boardsPt2 = inputBoards.map(collectBoard);

let lastWinner = 0;
let activeBoards = 0;

for (const number of numbers) {
  boardsPt2 = boardsPt2.map((board) => {
    if (checkBoard(board)) return board;
    board = markBoard(board, number);
    if (checkBoard(board)) {
      const sum = sumBoard(board);
      lastWinner = sum * number;
    }
    return board;
  });

  const nextActiveBoards = boardsPt2.reduce(
    (count, board) => count + Number(!checkBoard(board)),
    0,
  );
  if (nextActiveBoards === 0 && activeBoards > 0) {
    break;
  }
  activeBoards = nextActiveBoards;
}

console.log("Part 2:", lastWinner);
