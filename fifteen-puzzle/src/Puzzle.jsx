import { Box, Button, Flex } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import {
   generatePuzzle, 
   canSwap, 
   swap,
   solveWithAStar,
   solveWithDFS, 
   solveWithHillClimbing 
  } from './puzzleLogic';


function Puzzle() {
  const [puzzle, setPuzzle] = useState(generatePuzzle());
  const [counter, setCounter] = useState(0);

  // Create a ref to access the DOM element
  const stepTxtRef = useRef(null);

    // Use useEffect to update the DOM element when the counter changes
    useEffect(() => {
      // Check if the ref is available
      if (stepTxtRef.current) {
        // Update the innerHTML of the element
        stepTxtRef.current.innerHTML = `Step: ${counter}`;
      }
    }, [counter]);


  const handleAStarSolve = () => {
    setTimeout(async() => {
      try {
        const solution = solveWithAStar(puzzle);
        animateSolution(solution)
      } catch (error){
        console.log("A* failed!")
      }
    }, 2000)
  };

  const handleDFS = async () => {
    setTimeout(async() => {
      try {
        const solution = await solveWithDFS(puzzle);
        animateSolution(solution)
      } catch (error){
        console.log("DFS failed!")
      }
    }, 2000)
   };

  const handleHillClimbing =  () => {
    setTimeout(async() => {
      try {
        const solution =  solveWithHillClimbing(puzzle);
        animateSolution(solution);
      } catch (error){
        console.log("HillClimbing failed!")
      }
    }, 2000)
  };

  const animateSolution = (solutionSteps) => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < solutionSteps.length) {
        setPuzzle(solutionSteps[step]);
        step++;
        setCounter(step + 1)
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
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        width={["90%", "250px"]} // Adjust width for mobile and non-mobile views
        height={["90vw", "250px"]} // Maintain the aspect ratio in mobile view
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
            bg={value === null ? "transparent" : "teal.200"}
            _hover={{ bg: value === null ? "transparent" : "teal.300" }}
            onClick={() => handleTileClick(index)}
            isDisabled={value === null}
          >
            {value}
          </Button>
        ))}
      </Box>
      <Box mt={3}>
        <Button onClick={handleAStarSolve}>Solve with A*</Button>
        <Button onClick={handleDFS}>Solve with DFS</Button>
        <Button onClick={handleHillClimbing}>Solve with Hill Climbing</Button>
        <h3 
        id='step-text'
        ref={stepTxtRef}
        >
          Step:{counter}
        </h3>
      </Box>
    </Flex>
  );
  
}

export default Puzzle;
