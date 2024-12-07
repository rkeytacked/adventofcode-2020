#!/usr/bin/env node
const {log, readLines, split, toNumber, key} = require("./common");

/* * * * * * * *
 * * DAY  24 * *
 * * * * * * * */

let lines = readLines('../inputs/24.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function goTo(instr) {
    let x = 0, y = 0;
    for (let i = 0; i < instr.length;) {
        switch (instr[i++]) {
            case 'e':
                x += 1;
                break;
            case 'w':
                x -= 1;
                break;
            case 's':
                y += 1;
                switch (instr[i++]) {
                    case 'e':
                        x += 1;
                        break;
                    case 'w':
                        break;
                }
                break;
            case 'n':
                y -= 1;
                switch (instr[i++]) {
                    case 'e':
                        break;
                    case 'w':
                        x -= 1;
                        break;
                }
                break;
        }
    }
    return key(x, y);
}

const blacks = new Set();

function flipTile(pos) {
    if (blacks.has(pos)) {
        blacks.delete(pos);
    } else {
        blacks.add(pos);
    }
}

for (const instr of lines) {
    flipTile(goTo(instr));
}

log('solution #1:', blacks.size);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function isFlippableTile(x, y) {
    let tile = key(x, y);
    let adj = [key(x, y - 1), key(x, y + 1), key(x + 1, y), key(x + 1, y + 1), key(x - 1, y), key(x - 1, y - 1)];
    let numBlackAdj = adj.filter(a => blacks.has(a)).length;
    return blacks.has(tile) ? (numBlackAdj < 1 || numBlackAdj > 2) : (numBlackAdj === 2);
}

function determineFlippables() {
    let result = new Set();
    for (let [x, y] of [...blacks].map(split(/:/g, toNumber))) {
        isFlippableTile(x, y) && result.add(key(x, y));
        isFlippableTile(x, y + 1) && result.add(key(x, y + 1));
        isFlippableTile(x, y - 1) && result.add(key(x, y - 1));
        isFlippableTile(x + 1, y) && result.add(key(x + 1, y));
        isFlippableTile(x + 1, y + 1) && result.add(key(x + 1, y + 1));
        isFlippableTile(x - 1, y) && result.add(key(x - 1, y));
        isFlippableTile(x - 1, y - 1) && result.add(key(x - 1, y - 1));
    }
    return [...result];
}

for (let i = 0; i < 100; i++) {
    determineFlippables().forEach(flipTile);
}

log('solution #2:', blacks.size);
