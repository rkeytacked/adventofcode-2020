#!/usr/bin/env node
const {log, readLines, sum, split} = require("./common");

/* * * * * * * *
 * * DAY  14 * *
 * * * * * * * */

let lines = readLines('../inputs/14.txt', split(/[\[\]\s=]+/g));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const memory = new Map();
let mask = '';

function applyMask(val, mask) {
    let binary = [...Number(val).toString(2)];
    while (binary.length < mask.length) {
        binary.unshift('0');
    }
    for (let i = 0; i < mask.length; i++) {
        let m = mask[i];
        if (m !== 'X') {
            binary[i] = m
        }
    }
    return Number.parseInt(binary.join(''), 2);
}

for (let [cmd, arg, val] of lines) {
    if (cmd === 'mask') {
        mask = arg;
    } else {
        memory.set(arg, applyMask(val, mask));
    }
}

log('solution #1:', sum(memory.values()));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */


function* floatMask(addr, mask) {
    let binary = [...Number(addr).toString(2)];
    while (binary.length < mask.length) {
        binary.unshift('0');
    }
    let floating = [];
    for (let i = 0; i < mask.length; i++) {
        let m = mask[i];
        if (m === '1') {
            binary[i] = m;
        } else if (m === 'X') {
            floating.push(i);
        }
    }
    for (let option = (1 << floating.length) - 1; option >= 0; option--) {
        for (let i = 0; i < floating.length; i++) {
            binary[floating[i]] = option & (1 << i) ? 1 : 0;
            yield Number.parseInt(binary.join(''), 2);
        }
    }
}


memory.clear();

for (let [cmd, arg, val] of lines) {
    if (cmd === 'mask') {
        mask = arg;
    } else {
        for (let addr of floatMask(arg, mask)) {
            memory.set(addr, Number(val));
        }
    }
}

log('solution #2:', sum(memory.values()));
