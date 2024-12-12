#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  12 * *
 * * * * * * * */

let lines = readLines('../inputs/12.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let [dX, dY] = [1, 0];
let [pX, pY] = [0, 0];

function drive(line) {
    if (line === 'R90' || line === 'L270') {
        [dX, dY] = [-dY, dX];
    } else if (line === 'L90' || line === 'R270') {
        [dX, dY] = [dY, -dX];
    } else if (line === 'L180' || line === 'R180') {
        [dX, dY] = [-dX, -dY];
    } else {
        let value = Number(line.substring(1));
        if (line[0] === 'N') {
            pY -= value;
        } else if (line[0] === 'S') {
            pY += value;
        } else if (line[0] === 'E') {
            pX += value;
        } else if (line[0] === 'W') {
            pX -= value;
        } else if (line[0] === 'F') {
            pX += value * dX;
            pY += value * dY;
        }
    }
}

lines.forEach(drive);

log('solution #1:', Math.abs(pX) + Math.abs(pY));

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

[dX, dY] = [10, -1];
[pX, pY] = [0, 0];

function driveWaypoint(line) {
    if (line === 'R90' || line === 'L270') {
        [dX, dY] = [-dY, dX];
    } else if (line === 'L90' || line === 'R270') {
        [dX, dY] = [dY, -dX];
    } else if (line === 'L180' || line === 'R180') {
        [dX, dY] = [-dX, -dY];
    } else {
        let value = Number(line.substring(1));
        if (line[0] === 'N') {
            dY -= value;
        } else if (line[0] === 'S') {
            dY += value;
        } else if (line[0] === 'E') {
            dX += value;
        } else if (line[0] === 'W') {
            dX -= value;
        } else if (line[0] === 'F') {
            pX += value * dX;
            pY += value * dY;
        }
    }
}

lines.forEach(driveWaypoint);

log('solution #2:', Math.abs(pX) + Math.abs(pY));
