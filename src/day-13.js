#!/usr/bin/env node
const {log, readLines, toNumber, split, kgV} = require("./common");

/* * * * * * * *
 * * DAY  13 * *
 * * * * * * * */

let lines = readLines('../inputs/13.txt', split(/,/g));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let [[start], stops] = lines;
let buses = stops.filter(id => id !== 'x').map(toNumber).map(bus => ({bus, delay: (bus - start % bus)}));

let [best] = buses.sort((a, b) => a.delay - b.delay);

log('solution #1:', best.bus * best.delay);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let t = 0, factor = 1;
for (let delay = 0; delay < stops.length; delay++) {
    if (stops[delay] === 'x') {
        continue;
    }
    let id = Number(stops[delay]);
    while ((t + delay) % id !== 0) {
        t += factor;
    }
    factor = kgV(id, factor);
}

log('solution #2:', t);
