function formatNumbers(numbers: string): number[] {
    return numbers.split(" ")
        .filter((num) => !!num)
        .map((num) => parseInt(num.trim()));
}

function extractMatchingNumbers(given: number[], winning: number[]): number[] {
    const found = [];
    for (let myNumber of given) {
        if (winning.includes(myNumber)) {
            found.push(myNumber);
        }
    }

    return found;
}

function calculateScore(found: number[]) {
    if (!found.length) {
        return 0;
    }
    let score = 1;
    for (let i = 1; i <= found.length; i++) {
        score = score * (i === 1 ? 1 : 2);
    }
    return score;
}

function extractNumbers(row: string) {
    const [leftSide, rightSide] = row.split(":");
    const [winNumbers, givenNumbers] = rightSide.split("|");
    const winNumbersFormatted = formatNumbers(winNumbers.trim());
    const givenNumbersFormatted = formatNumbers(givenNumbers.trim());
    const cardNumberMatch = leftSide.match(/(\d+)/g);
    return {winNumbersFormatted, givenNumbersFormatted, id: +cardNumberMatch[0]};
}


export function part1(input: string) {
    const rowSplit = input.trim().split("\n");
    let sum = 0;
    for (let row of rowSplit) {
        const {winNumbersFormatted, givenNumbersFormatted} = extractNumbers(row);
        const found = extractMatchingNumbers(givenNumbersFormatted, winNumbersFormatted);
        const score = calculateScore(found);
        sum += score;
    }
    return sum;
}

function extractNextCardIds(found: number[], id: number) {
    const localFound: number[] = [];

    for (let i = 1; i <= found.length; i++) {
        const futureCardId = id + i;
        localFound.push(futureCardId);
    }

    return localFound;
}

export function part2(input: string): number {
    const rowSplit = input.trim().split("\n");

    const map = new Map<number, number[]>();

    const byCardIdResult: {
        [key: number]: number,
    } = {};

    for (let row of rowSplit) {
        const {winNumbersFormatted, givenNumbersFormatted, id} = extractNumbers(row);
        const found = extractMatchingNumbers(givenNumbersFormatted, winNumbersFormatted);
        const localFound = extractNextCardIds(found, id);

        // Always start with 1 Scratch card
        byCardIdResult[id] = 1;

        map.set(id, localFound);
    }

    const iterateAndUpdateResults = (foundItems: number[]) => {
        foundItems.forEach((cardId) => {
            const item = byCardIdResult[cardId] ?? 0;
            byCardIdResult[cardId] = item + 1;
            iterateAndUpdateResults(map.get(cardId) ?? []);
        })
    }

    for(const [_key, value] of map.entries()) {
        iterateAndUpdateResults(value);
    }


    return Object.values(byCardIdResult).reduce((acc, curr) => acc + curr, 0);
}
