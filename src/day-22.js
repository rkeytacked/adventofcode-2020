#!/usr/bin/env node
const {log, readLines, sum, toNumber} = require("./common");

/* * * * * * * *
 * * DAY  22 * *
 * * * * * * * */

let lines = readLines('../inputs/22.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let decks = [], deck;
for (let line of lines) {
    if (!deck) {
        decks.push(deck = []);
    } else if (!line) {
        deck = null;
    } else {
        deck.push(line);
    }
}

function playCrabCombat(A, B) {
    while (A.length && B.length) {
        let [a, b] = [A.shift(), B.shift()];
        if (a > b) {
            A.push(a, b);
        } else {
            B.push(b, a);
        }
    }
    return A.length ? {winner: 0, deck: A} : {winner: 1, deck: B};
}

function getScore(winner) {
    return sum(winner.map((x, i) => (winner.length - i) * x));
}

let {deck: winningDeck1} = playCrabCombat(...decks.map(d => d.slice()));
log('solution #1:', getScore(winningDeck1));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let recursiveWins = {};

function playRecursiveCrabCombat(A, B) {
    let config = "" + A + B;
    if (recursiveWins[config] !== undefined) {
        return recursiveWins[config] === 0 ? {winner: 0, deck: A} : {winner: 1, deck: B};
    }
    let configurations = new Set();
    while (A.length && B.length) {
        let config = "" + A + B;
        if (configurations.has(config)) {
            return {winner: 0, deck: A};
        }
        configurations.add(config);

        let [a, b] = [A.shift(), B.shift()];

        let winner;
        if (A.length >= a && B.length >= b) {
            winner = playRecursiveCrabCombat(A.slice(0, a), B.slice(0, b)).winner;
        } else {
            winner = a > b ? 0 : 1;
        }
        if (winner === 0) {
            A.push(a, b);
        } else {
            B.push(b, a);
        }
    }
    if (A.length) {
        recursiveWins[config] = 0;
        return {winner: 0, deck: A};
    } else {
        recursiveWins[config] = 1;
        return {winner: 1, deck: B};
    }
}

let {deck: winningDeck2} = playRecursiveCrabCombat(...decks.map(d => d.slice()));
log('solution #2:', getScore(winningDeck2));
