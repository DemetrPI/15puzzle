import { aStar, dfs, hillClimbing } from "./algorithm.js"; // Import algorithms

export function generatePuzzle() {
  let numbers = Array.from({ length: 15 }, (_, index) => index + 1);
  numbers = shuffle(numbers);
  numbers.push(null); // for the empty spot

  // Check if the generated puzzle is solvable, otherwise shuffle again
  while (!isSolvable(numbers)) {
    numbers = shuffle(numbers);
  }

  return numbers;
}

function isSolvable(numbers) {
  const inversions = countInversions(numbers);
  return inversions % 2 === 0; // If inversions are even, puzzle is solvable
}

function countInversions(numbers) {
  let inversions = 0;
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] && numbers[j] && numbers[i] > numbers[j]) {
        inversions++;
      }
    }
  }
  return inversions;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function canSwap(puzzle, index) {
  const emptyIndex = puzzle.indexOf(null);
  const { row: emptyRow, col: emptyCol } = getRowCol(emptyIndex);
  const { row, col } = getRowCol(index);

  const rowDiff = Math.abs(emptyRow - row);
  const colDiff = Math.abs(emptyCol - col);

  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

export function swap(puzzle, index) {
  const emptyIndex = puzzle.indexOf(null);
  const newPuzzle = [...puzzle];
  [newPuzzle[emptyIndex], newPuzzle[index]] = [
    newPuzzle[index],
    newPuzzle[emptyIndex],
  ];
  return newPuzzle;
}

function getRowCol(index) {
  return {
    row: Math.floor(index / 4),
    col: index % 4,
  };
}

function convertTo2D(puzzle1D) {
  const puzzle2D = [];
  for (let i = 0; i < 4; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      row.push(puzzle1D[i * 4 + j] === null ? 0 : puzzle1D[i * 4 + j]);
    }
    puzzle2D.push(row);
  }
  return puzzle2D;
}

function convertTo1D(puzzle2D) {
  const puzzle1D = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      puzzle1D.push(puzzle2D[i][j] === 0 ? null : puzzle2D[i][j]);
    }
  }
  return puzzle1D;
}

export function solveWithAStar(puzzle1D) {
  const puzzle2D = convertTo2D(puzzle1D);
  const result = aStar(puzzle2D);
  return result.board_list.map((board) => convertTo1D(board)).reverse();
}

export async function solveWithDFS(puzzle1D) {
  const puzzle2D = convertTo2D(puzzle1D);
  const result = await dfs(puzzle2D);
  return result.board_list.map((board) => convertTo1D(board)).reverse();
}


export function solveWithHillClimbing(puzzle1D) {
  const puzzle2D = convertTo2D(puzzle1D);
  const result = hillClimbing(puzzle2D);
  return result.board_list.map((board) => convertTo1D(board)).reverse();
}
