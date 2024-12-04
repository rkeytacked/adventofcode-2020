#!/usr/bin/env node
const {log, readLines, sum, split, intersect} = require("./common");

/* * * * * * * *
 * * DAY  21 * *
 * * * * * * * */

let lines = readLines('../inputs/21.txt', split(/\s*\(contains\s*|\)/g)).map(([ingr, allerg]) => ({
    ingredients: ingr.split(/\s+/g),
    allergenes: allerg.split(/,\s*/g),
}));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const allergenesPotentiallyIn = {};
const allIngreds = [];

for (let {ingredients, allergenes} of lines) {
    allIngreds.push(...ingredients);
    for (let allerg of allergenes) {
        if (allergenesPotentiallyIn[allerg]) {
            allergenesPotentiallyIn[allerg] = intersect(allergenesPotentiallyIn[allerg], ingredients);
        } else {
            allergenesPotentiallyIn[allerg] = ingredients;
        }
    }
}

const fixedAllergenes = {};

for (let changed = true; changed;) {
    changed = false;
    for (let allerg of Object.keys(allergenesPotentiallyIn)) {
        if (allergenesPotentiallyIn[allerg].length === 1) {
            let [ingr] = allergenesPotentiallyIn[allerg];
            delete (allergenesPotentiallyIn[allerg]);
            fixedAllergenes[ingr] = allerg;
            for (let ingreds of Object.values(allergenesPotentiallyIn)) {
                let i = ingreds.indexOf(ingr);
                if (i !== -1) {
                    changed = true;
                    ingreds.splice(i, 1);
                }
            }
        }
    }
}

let excluded = sum(lines.map(({ingredients}) => ingredients.filter(ingr => !fixedAllergenes[ingr]).length));

log('solution #1:', excluded);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let dangerousList = Object.entries(fixedAllergenes).sort(([, a], [, b]) => a.localeCompare(b)).map(([v]) => v).join(',');

log('solution #2:', dangerousList);
