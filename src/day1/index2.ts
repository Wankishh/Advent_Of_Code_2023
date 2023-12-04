const numbersFromString = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const mapToNumber = {
    ["one"]: 1,
    ["two"]: 2,
    ["three"]: 3,
    ["four"]: 4,
    ["five"]: 5,
    ["six"]: 6,
    ["seven"]: 7,
    ["eight"]: 8,
    ["nine"]: 9,
    ["1"]: 1,
    ["2"]: 2,
    ["3"]: 3,
    ["4"]: 4,
    ["5"]: 5,
    ["6"]: 6,
    ["7"]: 7,
    ["8"]: 8,
    ["9"]: 9,
}
const getFirstAndLastNumber = (input: string): number => {
    const first = {
        num: 0,
        index: -1,
    };

    const last = {
        num: 0,
        index: -1,
    };


    numbersFromString.forEach((match) => {
        const index = input.indexOf(match);
        const lastIndex = input.lastIndexOf(match);
        // means there is a number where the first and last index are different
        const isDifferent = index !== lastIndex;
        if (index !== -1) {
            if (first.index === -1 || index < first.index) {
                first.index = index;
                first.num = mapToNumber[match];
            }

            if (last.index === -1 || lastIndex > last.index) {
                last.index = lastIndex;
                last.num = mapToNumber[match];
            }
        }
    });

    if (!first.num && !last.num) {
        return 0;
    }
    const match = `${first.num}${last.num}`;
    return +match;
}
export default function work(args: string[]) {
    const split = args[0].split('\n').filter((line) => line);
    const nums = split.map((line) => getFirstAndLastNumber(line));
    let sum = 0;
    nums.forEach((num) => {
        sum += num;
    });
    return sum;
}