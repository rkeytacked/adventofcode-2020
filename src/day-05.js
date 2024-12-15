#!/usr/bin/env node
const {log, readLines, max} = require("./common");

/* * * * * * * *
 * * DAY  05 * *
 * * * * * * * */

let lines = readLines('../inputs/05.txt');
const ids = lines.map(x => Number.parseInt(x.replaceAll(/[BR]/g, '1').replaceAll(/[FL]/g, '0'), 2));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

log('solution #1:', max(ids));

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let myId = ids.find(id => !ids.includes(id + 1) && ids.includes(id + 2)) + 1;
log('solution #2:', myId);
