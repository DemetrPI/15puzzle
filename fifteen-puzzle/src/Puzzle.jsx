import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { generatePuzzle, canSwap, swap } from './puzzleLogic';
import { solveWithAStar } from './puzzleLogic';

function Puzzle() {
  const [puzzle, setPuzzle] = useState(generatePuzzle());

  const handleAStarSolve = async () => {
    const solution = await solveWithAStar(puzzle);
    animateSolution(solution);
  };

  const animateSolution = (solutionSteps) => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < solutionSteps.length) {
        setPuzzle(solutionSteps[step]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 500); // 500ms interval between steps
  };

  const handleTileClick = (index) => {
    if (canSwap(puzzle, index)) {
      const newPuzzle = swap(puzzle, index);
      setPuzzle(newPuzzle);
    }
  };

  return (
    <>
      <Box
        width="250px"
        height="250px"
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gap={1}
        bg="gray.300"
        p={1}
        borderRadius="md"
      >
        {puzzle.map((value, index) => (
          <Button
            key={index}
            flex="1"
            height="100%"
            bg={value === null ? 'transparent' : 'teal.200'}
            _hover={{ bg: value === null ? 'transparent' : 'teal.300' }}
            onClick={() => handleTileClick(index)}
            isDisabled={value === null}
          >
            {value}
          </Button>
        ))}

      </Box>
      <Box>
        <Button onClick={handleAStarSolve}>Solve with AI</Button>

      </Box>
    </>
  );
}

export default Puzzle;
