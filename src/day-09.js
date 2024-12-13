#!/usr/bin/env node
const {log, readLines, toNumber, min, max} = require("./common");

/* * * * * * * *
 * * DAY  09 * *
 * * * * * * * */

let lines = readLines('../inputs/09.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function isWrongNumber(number, index) {
    if (index < 25) {
        return false;
    }
    for (let i = index - 25; i < index; i++) {
        for (let j = i + 1; j < index; j++) {
            if (lines[i] + lines[j] === number) {
                return false;
            }
        }
    }
    return true;
}

let wrongNumber = lines.find(isWrongNumber);

log('solution #1:', wrongNumber);

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function findEncryptionWeakness(number) {
    for (let i = 0; i < lines.length; i++) {
        for (let goal = number - lines[i], j = i + 1; j < lines.length && goal > 0; goal -= lines[j++]) {
            if (goal === lines[j]) {
                let list = lines.slice(i, j + 1);
                return min(list) + max(list);
            }
        }
    }
}

log('solution #2:', findEncryptionWeakness(wrongNumber));
