#!/usr/bin/env node
const {log, readLines, min, prod} = require("./common");

/* * * * * * * *
 * * DAY  20 * *
 * * * * * * * */

let lines = readLines('../inputs/20.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

class Tile {
    constructor(id) {
        this.id = id;
        this.img = [];
        this.size = 0;
        this.borders = {};
    }

    addLine(line) {
        this.img.push(line);
        this.size++;
    }

    get(dir, x, y) {
        let [[a, b], [c, d]] = dir;
        let i = (a < 0 ? this.size - 1 : 0) + x * a + (c < 0 ? this.size - 1 : 0) + y * c;
        let j = (b < 0 ? this.size - 1 : 0) + x * b + (d < 0 ? this.size - 1 : 0) + y * d;
        return this.img[j][i];
    }

    innerIterate(dir, callback, visited = {}) {
        if (visited[this.id]) {
            return;
        }
        visited[this.id] = true;

        let innerSize = this.size - 2;
        let [dx, dy] = dir;
        let nextX = this.borders["" + [dy, dx]].opposite;
        let nextY = this.borders["" + dir].opposite;

        for (let y = 0; y < innerSize; y++) {
            for (let x = 0; x < innerSize; x++) {
                callback(x, y, this.get(dir, x + 1, y + 1));
            }
        }
        if (nextY) {
            nextY.tile.innerIterate(nextY.dir, (x, y, val) => callback(x, y + innerSize, val), visited);
        }
        if (nextX) {
            nextX.tile.innerIterate(nextX.dir, (y, x, val) => callback(x + innerSize, y, val), visited);
        }
    }

}

let tiles = [];
{
    let tile;
    for (let line of lines) {
        if (!line) {
            tile = null;
        } else if (!tile) {
            tiles.push(tile = new Tile(line.split(/[\s:]/g)[1]));
        } else {
            tile.addLine(line.split(''));
        }
    }
}

const left = [-1, 0], right = [1, 0], up = [0, -1], down = [0, 1];
const directions = [[right, down], [right, up], [left, down], [left, up], [down, left], [down, right], [up, left], [up, right]];

let byBorder = {};
for (let tile of tiles) {
    for (let dir of directions) {
        let border = '';
        for (let i = 0; i < tile.size; i++) {
            border += tile.get(dir, i, 0);
        }
        tile.borders["" + dir] = {border};
        (byBorder[border] ||= []).push({dir, tile});
    }
}
let matchCounts = {};
let singleBordersDir = [];
for (let border in byBorder) {
    if (byBorder[border].length === 1) {
        let {dir, tile} = byBorder[border][0];
        singleBordersDir.push({dir, tile});
        matchCounts[tile.id] = (matchCounts[tile.id] || 0) + 1;
    } else {
        let [A, B] = byBorder[border];
        let [[a, b], [c, d]] = A.dir;
        let [[e, f], [g, h]] = B.dir;
        A.tile.borders[[[a, b], [-c, -d]].join()].opposite = B;
        B.tile.borders[[[e, f], [-g, -h]].join()].opposite = A;
    }
}
let corners = Object.keys(matchCounts).filter(id => matchCounts[id] === 4);

log('solution #1: ', prod(corners));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const monster = [[0, 18], [1, 0], [1, 5], [1, 6], [1, 11], [1, 12], [1, 17], [1, 18], [1, 19], [2, 1], [2, 4], [2, 7], [2, 10], [2, 13], [2, 16]];

let roughnesses = [];
for (let {dir, tile} of singleBordersDir) {
    let [dx, dy] = dir;
    if (corners.includes(tile.id) && tile.borders["" + dir].opposite && tile.borders["" + [dy, dx]].opposite) {
        let map = [], roughness = 0;
        tile.innerIterate(dir, (x, y, val) => {
            (map[y] ||= [])[x] = val;
            if (val !== '.') {
                roughness++;
            }
        });
        let height = map.length, width = map[0].length;
        let foundMonsters = 0;
        for (let y = 0; y < height - 3; y++) {
            loop: for (let x = 0; x < width - 20; x++) {
                for (let [my, mx] of monster) {
                    if (map[y + my][x + mx] === '.') continue loop;
                }
                foundMonsters++;
                roughness -= monster.length;
            }
        }
        roughnesses.push(roughness)
    }
}

log('solution #2', min(roughnesses));
