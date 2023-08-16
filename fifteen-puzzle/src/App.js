import { ChakraProvider } from '@chakra-ui/react';
import Puzzle from './Puzzle';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Puzzle />
      </div>
    </ChakraProvider>
  );
}

export default App;
