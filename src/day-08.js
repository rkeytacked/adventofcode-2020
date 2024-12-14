#!/usr/bin/env node
const {log, readLines, split} = require("./common");

/* * * * * * * *
 * * DAY  08 * *
 * * * * * * * */

let lines = readLines('../inputs/08.txt', split(/\s+/g));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function runCode() {
    let index = 0, accumulator = 0;
    let visited = new Array(lines.length);

    while (index < lines.length && !visited[index]) {
        visited[index] = true;
        let [cmd, arg] = lines[index];
        if (cmd === 'jmp') {
            index += Number(arg);
        } else {
            index++;
            if (cmd === 'acc') {
                accumulator += Number(arg);
            }
        }
    }
    return {index, accumulator};
}

log('solution #1:', runCode().accumulator);

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function swap(index) {
    lines[index][0] = lines[index][0] === 'nop' ? 'jmp' : 'nop';
}

function fixBrokenCmd() {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i][0] === 'acc') {
            continue;
        }
        swap(i);
        let {index, accumulator} = runCode();
        if (index === lines.length) {
            return accumulator;
        }
        swap(i);
    }
}

log('solution #2:', fixBrokenCmd());
