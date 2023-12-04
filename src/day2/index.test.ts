import {describe, expect, it} from "@jest/globals";
import {part1, part2} from "./index";
import {readFileSync} from "fs";

const delimiters = {
    r: 12,
    g: 13,
    b: 14,
};

const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

describe('Day 2 - Part 1', () => {
    it('Should pass default case', () => {
        const sum = part1(input, delimiters);
        expect(sum).toBe(8);
    });

    it('Should pass input case', () => {
        const input = readFileSync(__dirname + '/input.txt', 'utf-8');
        const sum = part1(input, delimiters);
        expect(sum).toBe(2162);
    });
});


describe('Day 2 - Part 2', () => {
    it('Should pass default case', () => {
        const sum = part2(input);
        expect(sum).toBe(2286);
    });

    it('Should pass input case', () => {
        const input = readFileSync(__dirname + '/input.txt', 'utf-8');
        const sum = part2(input);
        expect(sum).toBe(72513);
    });
});