#!/usr/bin/env node
const {log, readLines, split, toNumber, key} = require("./common");

/* * * * * * * *
 * * DAY  25 * *
 * * * * * * * */

let lines = readLines('../inputs/25.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function transform(subjectNr, loopSize) {
    let value = 1;
    for (let i = 0; i < loopSize; i++) {
        value *= subjectNr;
        value %= 20201227;
    }
    return value;
}

function reverseEngineerLoopSize(subjectNr, result) {
    let value = 1;
    for (let i = 0; ; i++) {
        if (value === result) {
            return i;
        }
        value *= subjectNr;
        value %= 20201227;
    }
}

const [doorPubkey, cardPubkey] = lines;
const doorLoopSize = reverseEngineerLoopSize(7, doorPubkey);
const encKey = transform(cardPubkey, doorLoopSize);

log('solution #1:', encKey);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

//log('solution #2:', blacks.size);
