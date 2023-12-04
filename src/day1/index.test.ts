import {describe, it, expect} from "@jest/globals";
import work from "./index";
import work2 from "./index2";
import {readFileSync} from "fs";

describe('Day 1', () => {
    it('Given case', () => {
        const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
        expect(work([input])).toBe(142);
    });

    it('Real input', () => {
        const data = readFileSync(__dirname + '/input_1.txt', 'utf8');
        const sum = work([data]);
        expect(sum).toBe(55712);
    });

});

describe('Day 1 part 2', () => {

    it('Given case', () => {
        const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
        expect(work2([input])).toBe(281);
    });

    it('Random case from input - 1', () => {
        const input = `fourbbnqscg3
        onetwo2fivef54
        nctbrzqsdljjsix5
        5mblhxfqfns9nine
        6gbone8
        6gd9
        eight5nrzhl4sixseventrvtwokg`;
        const sum = work2([input]);
        expect(sum).toBe(400);
    })

    it('Random case from input - 2', () => {
        const input = `7rmchptmrglsix21two
        91tmvvktwo
        seven9fqmfkgthree9sevenfive6
        jrcj441
        1nine9
        674foursncnphhnd92
        fsfrcgsonefivelpkz5threesnrzzvxcdn4fl`;
        const sum = work2([input]);
        // 72, 92, 76, 41, 19, 62, 14 = 376
        expect(sum).toBe(376);
    });

    it('Should container multiple duplicates and return correct', () => {
        const input = `sevendxbninefour2fourclmln`;
        const sum = work2([input]);
        expect(sum).toBe(74);
    })

    it('Real input', () => {
        const fs = require('fs');
        const data = fs.readFileSync(__dirname + '/input_1.txt', 'utf8');
        const sum = work2([data]);
        expect(sum).toBe(55413);
    });
});