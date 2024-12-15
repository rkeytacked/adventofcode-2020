#!/usr/bin/env node
const {log, readLines, map, split} = require("./common");

/* * * * * * * *
 * * DAY  04 * *
 * * * * * * * */

let lines = readLines('../inputs/04.txt', split(/[\s\n]+/g), '\n\n');
let docs = lines.map(values => map(values, split(':')));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let necessary = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let validLooking = docs.filter(doc => necessary.every(key => doc[key]));

log('solution #1:', validLooking.length);

log('\n-----------------------------------------------------------\n');

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function validate({byr, iyr, eyr, hgt, hcl, ecl, pid}) {
    return (byr.match(/^\d{4}$/) && byr >= '1920' && byr <= '2002')
        && (iyr.match(/^\d{4}$/) && iyr >= '2010' && iyr <= '2020')
        && (eyr.match(/^\d{4}$/) && eyr >= '2020' && eyr <= '2030')
        && (hgt.match(/^\d{3}cm$/) && hgt >= '150cm' && hgt <= '193cm'
            || hgt.match(/^\d{2}in$/) && hgt >= '59in' && hgt <= '76in')
        && (hcl.match(/^#[0-9a-f]{6}$/))
        && (ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/))
        && (pid.match(/^\d{9}$/));
}

let validDocs = validLooking.filter(validate);
log('solution #2:', validDocs.length);
