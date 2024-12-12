#!/usr/bin/env node
const {log, sum, readCharArrays} = require("./common");

/* * * * * * * *
 * * DAY  11 * *
 * * * * * * * */

let lines = readCharArrays('../inputs/11.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const directions = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

function step1(seating) {
    return seating.map((row, y) => row.map((seat, x) => {
        let adjacents = 0;
        for (let [dx, dy] of directions) {
            seating[y + dy]?.[x + dx] === '#' && adjacents++;
        }
        return seat === 'L' && adjacents === 0 ? '#' : seat === '#' && adjacents >= 4 ? 'L' : seat;
    }));
}

let seats = lines;
for (let next; (next = step1(seats)).join() !== seats.join(); seats = next) ;

let occupied = sum(seats.map(row => row.filter(seat => seat === '#').length));

log('solution #1:', occupied);

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function step2(seating) {
    return seating.map((row, y) => row.map((seat, x) => {
        let adjacents = 0;
        for (let [dx, dy] of directions) {
            let tx = x, ty = y;
            while (seating[ty += dy]?.[tx += dx] === '.') ;
            seating[ty]?.[tx] === '#' && adjacents++;
        }
        return seat === 'L' && adjacents === 0 ? '#' : seat === '#' && adjacents >= 5 ? 'L' : seat;
    }));
}

seats = lines;
for (let next; (next = step2(seats)).join() !== seats.join(); seats = next) ;

occupied = sum(seats.map(row => row.filter(seat => seat === '#').length));

log('solution #2:', occupied);
