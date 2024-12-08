#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  19 * *
 * * * * * * * */

const lines = readLines('../inputs/19.txt');

let rules = {};
let i = 0;
for (; i < lines.length; i++) {
    if (!lines[i]) {
        break;
    }
    let [name, rule] = lines[i].split(/:\s*/);
    rules[name] = makeRule(rule);
}

let texts = lines.slice(i + 1);

function makeRule(rule) {
    let match;
    return ((match = /^(.*)\s+\|\s+(.*)$/.exec(rule)) && makeOptionRule(match[1], match[2]))
        ?? ((match = /^(.*)\s+(.*)$/.exec(rule)) && makeConcatenationRule(match[1], match[2]))
        ?? ((match = /^"([a-z])"$/.exec(rule)) && makeSingleLetterRule(match[1]))
        ?? makeSingleRule(rule);
}

function makeOptionRule(rulesA, rulesB) {
    const ruleA = makeRule(rulesA);
    const ruleB = makeRule(rulesB);
    return {
        leftMatch: (input, start, end) => ruleA.leftMatch(input, start, end) ?? ruleB.leftMatch(input, start, end),
        rightMatch: (input, start, end) => ruleB.rightMatch(input, start, end) ?? ruleA.rightMatch(input, start, end)
    };
}

function makeConcatenationRule(nrA, nrB) {
    return {
        leftMatch: (input, start, end) => {
            start = rules[nrA].leftMatch(input, start, end);
            return start && start < end ? rules[nrB].leftMatch(input, start, end) : undefined;
        },
        rightMatch: (input, start, end) => {
            end = rules[nrB].rightMatch(input, start, end);
            return end && end > start ? rules[nrA].rightMatch(input, start, end) : undefined;
        }
    };
}

function makeSingleLetterRule(letter) {
    return {
        leftMatch: (input, start, end) => end > start && input[start++] === letter ? start : undefined,
        rightMatch: (input, start, end) => end > start && input[--end] === letter ? end : undefined
    };
}

function makeSingleRule(ruleNr) {
    return {
        leftMatch: (input, start, end) => rules[ruleNr].leftMatch(input, start, end),
        rightMatch: (input, start, end) => rules[ruleNr].rightMatch(input, start, end)
    };
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const matchingTexts = texts.filter(t => rules[0].leftMatch(t, 0, t.length) === t.length);

log('solution #1:', matchingTexts.length);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const fixedMatchingTexts = texts.filter(t => {
    let start = 0, end = t.length;
    let count42 = 0, count31 = 0;
    for (let newStart = start; (newStart = rules[42].leftMatch(t, start, end)); start = newStart) {
        count42++;
    }
    for (let newEnd = end; (newEnd = rules[31].rightMatch(t, start, end)); end = newEnd) {
        count31++;
    }
    return start === end && count31 > 0 && count42 > count31;
});

log('solution #2:', fixedMatchingTexts.length);
