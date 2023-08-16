export function generatePuzzle() {
  let numbers = Array.from({ length: 15 }, (_, index) => index + 1);
  numbers = shuffle(numbers);
  numbers.push(null); // for the empty spot
  return numbers;
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
  [newPuzzle[emptyIndex], newPuzzle[index]] = [newPuzzle[index], newPuzzle[emptyIndex]];
  return newPuzzle;
}

function getRowCol(index) {
  return {
    row: Math.floor(index / 4),
    col: index % 4
  };
}
