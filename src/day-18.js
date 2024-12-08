#!/usr/bin/env node
const {log, readLines, sum} = require("./common");

/* * * * * * * *
 * * DAY  18 * *
 * * * * * * * */

let lines = readLines('../inputs/18.txt', line => line.replaceAll(/\s/g, ''));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let plusHasPrecedence = false;

function evalExpr(line, ctx = {pos: 0}) {
    let value = evalTerm(line, ctx);
    while (ctx.pos < line.length) {
        if (line[ctx.pos] === ')') {
            return value;
        }
        const op = line[ctx.pos++];
        let nextVal = evalTerm(line, ctx);
        value = op === '*' ? value * nextVal : value + nextVal;
    }
    return value;
}

function evalTerm(line, ctx = {pos: 0}) {
    let value = 0;
    if (line[ctx.pos] === '(') {
        ctx.pos++;
        value = evalExpr(line, ctx);
        if (line[ctx.pos++] !== ')') {
            throw "bad syntax, missing )";
        }
    } else {
        for (let num; (num = line[ctx.pos]) >= '0'; ctx.pos++) {
            value = value * 10 + Number(num);
        }
    }
    if (plusHasPrecedence && line[ctx.pos] === '+') {
        ctx.pos++;
        value += evalTerm(line, ctx);
    }
    return value;
}

let values = lines.map(line => evalExpr(line));

log('solution #1:', sum(values));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

plusHasPrecedence = true;
values = lines.map(line => evalExpr(line));

log('solution #2:', sum(values));
