
const getFirstAndLastNumber = (input: string): number => {
    const numbers = [];
    for(let i = 0; i < input.length; i++) {
        const char = input[i];
        if(!isNaN(parseInt(char, 10))) {
            numbers.push(char);
        }
    }

    const firstNumber = numbers ? parseInt(numbers[0], 10) : 0;
    const lastNumber = numbers ? parseInt(numbers[numbers.length - 1], 10) : 0;
    if(!firstNumber && !lastNumber) return 0;
    return parseInt(`${firstNumber}${lastNumber}`, 10);
}
export default function work(args: string[]) {
    const split = args[0].split('\n');
    const nums = split.map((line) => getFirstAndLastNumber(line));
    return nums.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
}