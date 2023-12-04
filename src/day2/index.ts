interface Delimiter {
    r: number;
    g: number;
    b: number;
}

function extractGameNUmberAndSplits(row: string) {
    const split = row.split(':');
    const leftPart = split[0];
    const gameNumber = leftPart.split(' ')[1];
    const rightPart = split[1];
    const setSplit = rightPart.split(';');
    return {gameNumber, setSplit};
}

function extractCountAndLetterOfSet(item: string) {
    const itemSplit = item.trim().split(' ');
    const color = itemSplit[1];
    const count = parseInt(itemSplit[0]);
    const getFirstLetter = color[0] as keyof Delimiter;
    return {count, getFirstLetter};
}

function isSetPossible(set: string, delimiters: Delimiter) {
    const setSplit = set.split(',');
    return setSplit.some(item => {
        const {count, getFirstLetter} = extractCountAndLetterOfSet(item);
        return count > delimiters[getFirstLetter];
    });
}

export function part1(input: string, delimiters: Delimiter) {
    const gamesSplit = input.split('\n');

    let result = 0;


    for (const row of gamesSplit) {
        const {gameNumber, setSplit} = extractGameNUmberAndSplits(row);

        const isSomeSetNotPossible= setSplit.some(set => {
            return isSetPossible(set, delimiters);
        });

        if(!isSomeSetNotPossible) {
            result += +gameNumber;
        }
    }
    return result;
}

export function part2(input: string) {
    const gamesSplit = input.split('\n');
    let result = 0;

    for(const game of gamesSplit) {
        const { setSplit} = extractGameNUmberAndSplits(game);

        const gameMaxCounts = {
            r: 0,
            g: 0,
            b: 0,
        };

        for(const set of setSplit) {
            const setSplit = set.split(',');
            for(const item of setSplit) {
                const {count, getFirstLetter} = extractCountAndLetterOfSet(item);
                gameMaxCounts[getFirstLetter] = Math.max(gameMaxCounts[getFirstLetter], count);
            }
        }

        result += gameMaxCounts.r * gameMaxCounts.g * gameMaxCounts.b;
    }

    return result;
}