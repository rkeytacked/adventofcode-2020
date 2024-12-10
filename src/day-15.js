#!/usr/bin/env node
const {log, readLines, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  15 * *
 * * * * * * * */

let [startNumbers] = readLines('../inputs/15.txt', split(/,/g, toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let lastSpoken = [];

let turn = 1, nextNumber = startNumbers[0];
for (let i = 1; i < startNumbers.length; i++) {
    lastSpoken[nextNumber] = turn++;
    nextNumber = startNumbers[i];
}

function turnUntil(target) {
    lastSpoken.length = target;
    while (turn < target) {
        let diff = turn - (lastSpoken[nextNumber] ?? turn);
        lastSpoken[nextNumber] = turn++;
        nextNumber = diff;
    }
    return nextNumber;
}

log('solution #1:', turnUntil(2020));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', turnUntil(30000000));
