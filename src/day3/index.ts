

function createMatrixFromInput(input: string) {
    const lines = input.split('\n');
    const matrix = [];

    for (const line of lines) {
        const row = [];
        for (const char of line) {
            row.push(char.trim());
        }
        matrix.push(row);
    }
    return matrix;
}
export function part1(input: string): number {
    const matrix = createMatrixFromInput(input);

    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        let workNumber: string = "";
        let startIndex = -1;
        let endIndex = -1;

        const resetIndex = () => {
            startIndex = -1;
            endIndex = -1;
            workNumber = "";
        }

        for(let j = 0; j < row.length; j++) {
            const isDigit = !isNaN(parseInt(row[j]));
            const isLast = j === row.length - 1;

            if(isLast && isDigit) {
                workNumber += row[j];
            }

            if(isDigit && !isLast) {
                workNumber += row[j];

                if(startIndex === -1) {
                    startIndex = j;
                }
            } else if(workNumber.length) {
                endIndex = j;
                const findAdjacentSymbols = (rowIndex: number, startColIndex : number, endColIndex: number) => {
                    const startIndex = startColIndex >= 0 ? startColIndex : 0;
                    const endIndex = endColIndex >= row.length ? row.length : endColIndex;

                    for(let k = startIndex; k <= endIndex; k++) {
                        const charVal = matrix?.[rowIndex]?.[k] ?? ".";
                        const isDigit = !isNaN(parseInt(charVal));
                        const isDot = charVal === '.';
                        if(!isDigit && !isDot) {
                            return true;
                        }
                    }
                    return false;
                };

                const upperRowIndex = i === 0 ? -1 : i - 1;
                const lowerRowIndex = i === matrix.length ? -1 : i + 1;

                const startColIndexWithDiagonal = startIndex - 1;
                const endColIndexWithDiagonal = endIndex;

                const upperRowAdj = upperRowIndex >= 0 ? findAdjacentSymbols(upperRowIndex, startColIndexWithDiagonal, endColIndexWithDiagonal) : false;
                const lowerRowAdj = lowerRowIndex >= 0 ? findAdjacentSymbols(lowerRowIndex, startColIndexWithDiagonal, endColIndexWithDiagonal) : false;
                const currentRowAdj = findAdjacentSymbols(i, startColIndexWithDiagonal, endColIndexWithDiagonal);

                if(upperRowAdj || lowerRowAdj || currentRowAdj) {
                    sum += parseInt(workNumber);
                }

                resetIndex();
            }
        }
    }

    return sum;
}


export function part2(input: string): number {
    const matrix = createMatrixFromInput(input);

    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i];
        let startIndex = -1;
        let endIndex = -1;

        const resetIndex = () => {
            startIndex = -1;
            endIndex = -1;
        }

        for(let j = 0; j < row.length; j++) {
            const isStar = row[j] === '*';
            startIndex = isStar ? j : startIndex;
            if(isStar) {
                endIndex = j;
                const extractAdjacentNumbers = (rowIndex: number, startColIndex : number): number => {
                    const row = matrix[rowIndex];
                    let startIndex = startColIndex >= 0 ? startColIndex : 0;

                    let isStartFound = false;

                    /// 1. Find the start of the number
                    /// 2. Collect all the numbers from our startingPoint

                    while(!isStartFound) {
                        const charVal = row?.[startIndex] ?? ".";
                        const isDigit = !isNaN(parseInt(charVal));
                        const isBeginning = startIndex === 0;
                        if(isBeginning) {
                            isStartFound = true;
                            if(!isDigit) {
                                startIndex += 1;
                            }
                        } else if(!isDigit) {
                            startIndex += 1;
                            isStartFound = true;
                        } else {
                            startIndex -= 1;
                        }
                    }

                    let sum = "";
                    for( let i = startIndex; i < row?.length; i++) {
                        const charVal = row?.[i] ?? ".";
                        const isDigit = !isNaN(parseInt(charVal));
                        if(isDigit) {
                            sum += charVal;
                        } else {
                            break;
                        }
                    }

                    return parseInt(sum);
                };
                const findHasNumbersAdjesent = (rowIndex: number, startColIndex : number, endColIndex: number, onlyCheckNextSymbol = false): number => {
                    const startIndex = startColIndex >= 0 ? startColIndex : 0;
                    const endIndex = endColIndex >= row.length ? row.length : endColIndex;

                    if(onlyCheckNextSymbol) {
                        const charVal = matrix?.[rowIndex]?.[startIndex] ?? ".";
                        const isDigit = !isNaN(parseInt(charVal));
                        if(isDigit) {
                            return extractAdjacentNumbers(rowIndex, startIndex);
                        }

                        return null;
                    }

                    for(let k = startIndex; k <= endIndex; k++) {
                        const charVal = matrix?.[rowIndex]?.[k] ?? ".";
                        const isDigit = !isNaN(parseInt(charVal));
                        if(isDigit) {
                            return extractAdjacentNumbers(rowIndex, k);
                        }
                    }
                    return null;
                };

                const upperRowIndex = i === 0 ? -1 : i - 1;
                const lowerRowIndex = i === matrix.length ? -1 : i + 1;

                const startColIndexWithDiagonal = startIndex - 1;
                const endColIndexWithDiagonal = endIndex + 1;

                const upperRowAdj = upperRowIndex >= 0 ? findHasNumbersAdjesent(upperRowIndex, startColIndexWithDiagonal, endColIndexWithDiagonal) : null;
                const lowerRowAdj = lowerRowIndex >= 0 ? findHasNumbersAdjesent(lowerRowIndex, startColIndexWithDiagonal, endColIndexWithDiagonal) : null;

                const currentRowStart = findHasNumbersAdjesent(i, startColIndexWithDiagonal, 0, true);
                const currentRowEnd = findHasNumbersAdjesent(i, endColIndexWithDiagonal, 0, true);

                const atLeastTwoPositivesContainer = [upperRowAdj, lowerRowAdj, currentRowStart, currentRowEnd].filter(x => x !== null);

                if(atLeastTwoPositivesContainer && atLeastTwoPositivesContainer.length === 2) {
                    sum += atLeastTwoPositivesContainer.reduce((a, b) => a * b);
                }

                resetIndex();
            }
        }
    }

    return sum;
}