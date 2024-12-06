#!/usr/bin/env node
const {log, readLines, sum, toNumber, readCharArrays} = require("./common");

/* * * * * * * *
 * * DAY  23 * *
 * * * * * * * */

let [initial] = readCharArrays('../inputs/23.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

class LinkedList {

    constructor(elem) {
        /**
         * @type {number}
         */
        this.elem = elem;
        /**
         * @type {LinkedList}
         */
        this.prevList = this;
        /**
         * @type {LinkedList}
         */
        this.nextList = this;
    }

    /**
     * @returns {number}
     */
    get() {
        return this.elem;
    }

    /**
     * @returns {LinkedList}
     */
    next() {
        return this.nextList;
    }

    /**
     * @returns {LinkedList}
     */
    prev() {
        return this.prevList;
    }

    /**
     * @param {LinkedList} list
     * @returns {LinkedList}
     */
    insertNext(list) {
        const myNext = this.nextList;
        const theirPrev = list?.prevList;

        this.nextList = list;
        if (list) list.prevList = this;
        if (myNext) myNext.prevList = theirPrev;
        if (theirPrev) theirPrev.nextList = myNext;

        return this;
    }

    /**
     * @param {LinkedList} list
     * @returns {LinkedList}
     */
    insertPrev(list) {
        const myPrev = this.prevList;
        const theirNext = list?.nextList;

        this.prevList = list;
        if (list) list.nextList = this;
        if (myPrev) myPrev.nextList = theirNext;
        if (theirNext) theirNext.prevList = myPrev;

        return this;
    }

    /**
     * @param {number} len
     * @returns {LinkedList}
     */
    slice(len) {
        let newStart = this;
        for (let i = 0; i < len; i++) {
            newStart = newStart?.nextList;
        }

        const myPrev = this.prevList;
        this.prevList = newStart?.prevList;
        if (this.prevList) this.prevList.nextList = this;
        if (newStart) newStart.prevList = myPrev;
        if (myPrev) myPrev.nextList = newStart;

        return this;
    }

    toString() {
        let s = "" + this.elem;
        for (let e = this.nextList; e !== this && e; e = e.nextList) {
            s += e?.elem;
        }
        return s;
    }
}

const cups = [];
let currentCup;

function init() {
    cups.length = 0;
    currentCup = null;
    for (let nr of initial) {
        const cup = cups[nr] = new LinkedList(nr);
        (currentCup ||= cup).insertPrev(cup);
    }
}

function move(cup) {
    const three = cup.next().slice(3);
    let destinationElem = cup.elem - 1;
    for (; ; destinationElem--) {
        if (destinationElem === three.get() || destinationElem === three.prev().get() || destinationElem === three.next().get()) {
            continue;
        }
        if (!cups[destinationElem]) {
            destinationElem = cups.length;
            continue;
        }
        break;
    }
    cups[destinationElem].insertNext(three);
    return cup.next();
}

init();
for (let i = 0; i < 100; i++) {
    currentCup = move(currentCup);
}

log('solution #1:', cups[1].toString().substring(1));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

for (let i = cups.length; i <= 1_000_000; i++) {
    initial.push(i);
}
init();
for (let i = 0; i < 10_000_000; i++) {
    currentCup = move(currentCup);
}

let nextCup = cups[1].next();
let nextNextCup = nextCup.next();
let nextElem = nextCup.get();
let nextNextElem = nextNextCup.get();
log('solution #2:', nextElem, '*', nextNextElem, '=', nextElem * nextNextElem);
