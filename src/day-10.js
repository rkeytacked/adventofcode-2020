#!/usr/bin/env node
const {log, readLines, toNumber, sort, prod} = require("./common");

/* * * * * * * *
 * * DAY  10 * *
 * * * * * * * */

let lines = readLines('../inputs/10.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let values = sort(lines);
values.push(values[values.length - 1] + 3);

let ones = 0;
let threes = 0;
for (let joltage = 0, i = 0; i < values.length; joltage = values[i++]) {
    if (joltage + 1 === values[i]) {
        ones++;
    } else {
        threes++;
    }
}

log('solution #1:', ones, '*', threes, '=', ones * threes);

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let oneChains = [];
for (let joltage = 0, consecutiveOnes = 0, i = 0; i < values.length; joltage = values[i++]) {
    if (joltage + 1 === values[i]) {
        consecutiveOnes++;
    } else {
        oneChains.push(consecutiveOnes);
        consecutiveOnes = 0;
    }
}

let optionsCount = [1, 1, 2, 4, 7];

log('solution #2:', prod(oneChains.map(c => optionsCount[c])));
