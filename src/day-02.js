#!/usr/bin/env node
const {log, readLines, split} = require("./common");

/* * * * * * * *
 * * DAY  02 * *
 * * * * * * * */

let lines = readLines('../inputs/02.txt', split(/[-:\s]+/g));
let passwords = lines.map(([a, b, letter, password]) => ({password, letter, a: Number(a), b: Number(b)}));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function isValid({password, letter, a, b}) {
    let occurrence = [...password].filter(x => x === letter).length;
    return occurrence >= a && occurrence <= b;
}

log('solution #1:', passwords.filter(isValid).length);

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function isValid2({password, letter, a, b}) {
    return (password[a - 1] === letter) !== (password[b - 1] === letter);
}

log('solution #2:', passwords.filter(isValid2).length);
