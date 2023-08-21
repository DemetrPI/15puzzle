import { Heap } from './heap'

const SOLVED_STATE = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
];


function aStar(initialState) {
    return new Promise((resolve, reject) => {
        let distance = {};
        let queue = new Heap((o1, o2) => {
            return o1.priority > o2.priority;
        });
        let initialBlankCoord = getBlankCoordinates(initialState);
        let initialHeuristic = computeHeuristic(initialState);
        let solved = false;
        let previous = {};
        let visited = new Set();

        previous[initialState] = -1;
        distance[initialState] = 0;

        queue.insert({
            data: [initialBlankCoord, initialState, initialHeuristic],
            priority: initialHeuristic,
        });

        while (!queue.isEmpty() && !solved) {
            let current = queue.pop();
            let currentState = current.data[1];
            let currentBlankCoord = current.data[0];

            visited.add(currentState);

            let nextPossibleStates = getNextPossibleStates(
                currentBlankCoord,
                currentState
            );
            for (let i = 0; i < nextPossibleStates.length; ++i) {
                let possibleState = nextPossibleStates[i][1];
                let possibleBlankCoord = nextPossibleStates[i][0];
                if (visited.has(possibleState)) continue;

                if (
                    (distance[possibleState] !== undefined
                        ? distance[possibleState]
                        : Infinity) >
                    distance[currentState] + 1
                ) {
                    distance[possibleState] = distance[currentState] + 1;
                    let possibleStateHeuristic =
                        computeHeuristic(possibleState);
                    let priority =
                        distance[possibleState] + possibleStateHeuristic;
                    queue.insert({
                        data: [
                            possibleBlankCoord,
                            possibleState,
                            possibleStateHeuristic,
                        ],
                        priority: priority,
                    });
                    previous[possibleState] = currentState;

                    if (possibleStateHeuristic === 0) {
                        solved = true;
                        break;
                    }
                }
            }
        }

        if (solved) {
            let boardList = [];
            let tempState = JSON.parse(JSON.stringify(SOLVED_STATE));

            while (tempState !== -1) {
                boardList.push(tempState);
                tempState = previous[tempState];
            }
            resolve({ found: true, board_list: boardList });
        }

        reject({ found: false, board_list: [] });
    });
}

function getNextPossibleStates(blankCoord, state) {
    const nextPossibleStates = [];

    const dx = [-1, 0, 1, 0];
    const dy = [0, -1, 0, 1];

    for (let d = 0; d < 4; ++d) {
        let nextX = dx[d] + blankCoord["x"];
        let nextY = dy[d] + blankCoord["y"];
        //  check if  the coordinate is valid
        if (0 <= nextX && nextX < 4 && 0 <= nextY && nextY < 4) {
            const nextState = JSON.parse(JSON.stringify(state));
            nextState[blankCoord["x"]][blankCoord["y"]] = state[nextX][nextY];
            nextState[nextX][nextY] = state[blankCoord["x"]][blankCoord["y"]];
            nextPossibleStates.push([
                { x: nextX, y: nextY },
                JSON.parse(JSON.stringify(nextState)),
            ]);
        }
    }

    return nextPossibleStates;
}

function computeHeuristic(state) {
    let cost = 0;

    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (state[i][j] !== 0) {
                let x = Math.floor((state[i][j] - 1) / 4);
                let y = (state[i][j] - 1) % 4;
                cost += Math.abs(x - i) + Math.abs(y - j);
            }
        }
    }

    return cost;
}

function getBlankCoordinates(state) {
    for (let i = 0; i < 4; ++i)
        for (let j = 0; j < 4; ++j)
            if (state[i][j] === 0) return { x: i, y: j };
}

export default aStar;