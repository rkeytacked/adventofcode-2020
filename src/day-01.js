#!/usr/bin/env node
const {log, readLines, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  01 * *
 * * * * * * * */

let lines = readLines('../inputs/01.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
        if (lines[i] + lines[j] === 2020) {
            log('solution #1:', lines[i], '*', lines[j], '=', lines[i] * lines[j]);
        }
    }
}

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
        for (let k = j + 1; k < lines.length; k++) {
            if (lines[i] + lines[j] + lines[k] === 2020) {
                log('solution #2:', lines[i], '*', lines[j], '*', lines[k], '=', lines[i] * lines[j] * lines[k]);
            }
        }
    }
}