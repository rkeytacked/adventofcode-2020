#!/usr/bin/env node
const {log, readCharArrays} = require("./common");

/* * * * * * * *
 * * DAY  03 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/03.txt');
const {width, height} = lines;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function checkTrees(dx, dy) {
    let trees = 0;
    for (let y = 0, x = 0; y < height; y += dy, x += dx) {
        if (lines[y][x % width] === '#') {
            trees++;
        }
    }
    return trees;
}

log('solution #1:', checkTrees(3, 1));

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', checkTrees(1, 1) * checkTrees(3, 1) * checkTrees(5, 1) * checkTrees(7, 1) * checkTrees(1, 2));
