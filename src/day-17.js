#!/usr/bin/env node
const {log, readLines, sum, toNumber, readCharArrays, set, range} = require("./common");

/* * * * * * * *
 * * DAY  17 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/17.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let activeCells3D = set();
lines.forEach((line, y) => line.forEach((state, x) => state === '#' && activeCells3D.add([x, y, 0])));

function forNeighbors3D(x, y, z, callback) {
    for (i = -1; i <= 1; i++) {
        for (j = -1; j <= 1; j++) {
            for (k = -1; k <= 1; k++) {
                callback(x + i, y + j, z + k);
            }
        }
    }
}

function doCycle3D() {
    const candidates = set();
    const newActiveCells = set();
    activeCells3D.forEach(([x, y, z]) => forNeighbors3D(x, y, z, (x, y, z) => candidates.add([x, y, z])));
    candidates.forEach(([x, y, z]) => {
        let countActive = 0;
        forNeighbors3D(x, y, z, (x, y, z) => activeCells3D.has([x, y, z]) && countActive++);
        if (activeCells3D.has([x, y, z])) {
            (countActive === 3 || countActive === 4) && newActiveCells.add([x, y, z]);
        } else {
            countActive === 3 && newActiveCells.add([x, y, z]);
        }
    });
    activeCells3D = newActiveCells;
}

for (let i = 0; i < 6; i++) {
    doCycle3D();
}

log('solution #1:', activeCells3D.size);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let activeCells4D = set();
lines.forEach((line, y) => line.forEach((state, x) => state === '#' && activeCells4D.add([x, y, 0, 0])));

function forNeighbors4D(x, y, z, w, callback) {
    for (i = -1; i <= 1; i++) {
        for (j = -1; j <= 1; j++) {
            for (k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    callback(x + i, y + j, z + k, w + l);
                }
            }
        }
    }
}

function doCycle4D() {
    const candidates = set();
    const newActiveCells = set();
    activeCells4D.forEach(([x, y, z, w]) => forNeighbors4D(x, y, z, w, (x, y, z, w) => candidates.add([x, y, z, w])));
    candidates.forEach(([x, y, z, w]) => {
        let countActive = 0;
        forNeighbors4D(x, y, z, w, (x, y, z, w) => activeCells4D.has([x, y, z, w]) && countActive++);
        if (activeCells4D.has([x, y, z, w])) {
            (countActive === 3 || countActive === 4) && newActiveCells.add([x, y, z, w]);
        } else {
            countActive === 3 && newActiveCells.add([x, y, z, w]);
        }
    });
    activeCells4D = newActiveCells;
}

for (let i = 0; i < 6; i++) {
    doCycle4D();
}

log('solution #2:', activeCells4D.size);
