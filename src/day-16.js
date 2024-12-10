#!/usr/bin/env node
const {log, readLines, sum, toNumber, range, prod} = require("./common");

/* * * * * * * *
 * * DAY  16 * *
 * * * * * * * */

let lines = readLines('../inputs/16.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let goals = new Map();
let myTicket = [];
let nearbyTickets = [];

{
    let i = 0;
    for (let line; (line = lines[i]) && i < lines.length; i++) {
        let [, name, a, b, c, d] = /^(.*):\s*(\d+)-(\d+)\s+or\s+(\d+)-(\d+)$/.exec(line);
        goals.set(name, [a, b, c, d].map(toNumber));
    }
    i += 2;
    myTicket.push(...lines[i].split(/,/g).map(toNumber));
    i += 3;
    for (let line; (line = lines[i]) && i < lines.length; i++) {
        nearbyTickets.push(lines[i].split(/,/g).map(toNumber));
    }
}

function hasGoal(nr) {
    for (let [a, b, c, d] of goals.values()) {
        if (a <= nr && nr <= b || c <= nr && nr <= d) {
            return true;
        }
    }
    return false;
}

const invalidNrs = nearbyTickets.flatMap(t => t).filter(nr => !hasGoal(nr));
log('solution #1:', sum(invalidNrs));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

nearbyTickets = nearbyTickets.filter(t => invalidNrs.every(nr => !t.includes(nr)));
let possibleGoals = range(myTicket.length).map(() => new Set(goals.keys()));
let knownGoalPositions = new Map();
for (let ticket of nearbyTickets) {
    for (let position = 0; position < ticket.length; ++position) {
        for (let [goal, [a, b, c, d]] of goals) {
            let nr = ticket[position];
            if ((nr < a || nr > b) && (nr < c || nr > d)) {
                possibleGoals[position].delete(goal);
                if (possibleGoals[position].size === 1) {
                    knownGoalPositions.set(...possibleGoals[position], position);
                }
            }
        }
    }
}
for (let goal of knownGoalPositions.keys()) {
    for (let i = 0; i < possibleGoals.length; i++) {
        if (possibleGoals[i].delete(goal)) {
            if (possibleGoals[i].size === 1) {
                knownGoalPositions.set(...possibleGoals[i], i);
            }
        }
    }
}

const departPositions = [...knownGoalPositions.entries()]
    .filter(([goal]) => goal.startsWith("departure")).map(([, nr]) => nr);

log('solution #2:', prod(departPositions.map(id => myTicket[id])));
