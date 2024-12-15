#!/usr/bin/env node
const {log, readLines, sum, split, set, intersect} = require("./common");

/* * * * * * * *
 * * DAY  06 * *
 * * * * * * * */

let lines = readLines('../inputs/06.txt', split('\n', split('')), '\n\n');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let anyAnswers = lines.map(group => set(...group.flatMap(x => x)).size);
log('solution #1:', sum(anyAnswers));

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let commonAnswers = lines.map(group => group.reduce(intersect).length);
log('solution #2:', sum(commonAnswers));
