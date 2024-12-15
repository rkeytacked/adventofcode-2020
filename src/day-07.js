#!/usr/bin/env node
const {log, readLines, split, set} = require("./common");

/* * * * * * * *
 * * DAY  07 * *
 * * * * * * * */

let lines = readLines('../inputs/07.txt', split(/\s+bags contain\s+|\s+bags?[,.]\s*|\s+/g));

let rules = {};
for (let [attr, color, ...content] of lines) {
    let map = rules[attr + ' ' + color] ||= {};
    while (content.length > 3) {
        let nr = Number(content.shift());
        map[content.shift() + ' ' + content.shift()] = nr;
    }
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */


let colorsAroundShinyGold = set(...Object.keys(rules).filter(color => rules[color]['shiny gold']));

for (let changed = true; changed;) {
    changed = false;
    for (let color in rules) {
        for (let key in rules[color]) {
            if (colorsAroundShinyGold.has(key) && colorsAroundShinyGold.add(color)) {
                changed = true;
            }
        }
    }
}

log('solution #1:', colorsAroundShinyGold.size);

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let contents = {};

function getContents(color) {
    if (contents[color] !== undefined) {
        return contents[color];
    }
    let count = 0;
    for (let key in rules[color]) {
        count += rules[color][key] * (1 + getContents(key));
    }
    return contents[color] = count;
}

log('solution #2:', rules['shiny gold'], getContents('shiny gold'));
