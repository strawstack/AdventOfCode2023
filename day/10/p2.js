(() => {

    function sol(input) {
        
        const pipe_lookup = {
            "|": [{x: 0, y: 1}, {x: 0, y: -1}],
            "-": [{x: -1, y: 0}, {x: 1, y: 0}],
            "L": [{x: 0, y: -1}, {x: 1, y: 0}],
            "J": [{x: -1, y: 0}, {x: 0, y: -1}],
            "7": [{x: -1, y: 0}, {x: 0, y: 1}],
            "F": [{x: 1, y: 0}, {x: 0, y: 1}],
            "S": true
        };

        const eq = ({x: ax, y: ay}, {x: bx, y: by}) => {
            return ax === bx && ay === by;
        };

        const add = ({x: ax, y: ay}, {x: bx, y: by}) => {
            return {
                x: ax + bx,
                y: ay + by
            };
        }

        let grid = input.trim().split("\n");

        const inBounds = (x, y) => {
            return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length; 
        };

        const otherEnd = ({x: px, y: py}, {x: ex, y: ey}) => {
            if (!inBounds(px, py) || grid[py][px] === ".") {
                return null;
            }
            const dir = {
                x: ex - px,
                y: ey - py
            };
            const symb = grid[py][px];
            const coords = pipe_lookup[symb];
            const other = eq(dir, coords[0]) ? coords[1] : coords[0];
            return add(other, {x: px, y: py});
        };

        const findStart = () => {
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    if (grid[y][x] === "S") {
                        return {x, y};
                    }
                }
            }
        };

        const hash = coord => JSON.stringify(coord);

        const collect = {};

        const advance = ({x: tx, y: ty}, {x: ex, y: ey}, steps) => {
            collect[hash({x: ex, y: ey})] = true;
            if (eq(findStart(), {x: tx, y: ty})) {
                return steps;
            } else {
                const other = otherEnd({x: tx, y: ty}, {x: ex, y: ey});
                return advance(other, {x: tx, y: ty}, steps + 1);
            }
        };

        const count = () => {
            let total = 0;
            for (let y = 0; y < grid.length; y++) {
                let inLoop = false;
                let inter = null;
                for (let x = 0; x < grid[0].length; x++) {
                    const hh = hash({x, y});
                    const ic = hh in collect;
                    let symb = grid[y][x];
                    
                    if (symb === "S") {
                        symb = "|"; // Hack: replace S with correct pipe
                    }

                    if (ic) {

                        if (inLoop) {
                            if (symb === "|") {
                                inLoop = false;

                            } else if (symb === "L") {
                                inter = "L";

                            } else if (symb === "F") {
                                inter = "F";

                            } else if (symb === "7") {
                                inLoop = inter === "F";
                                inter = null;

                            } else if (symb === "J") {
                                inLoop = inter === "L";
                                inter = null;

                            }

                        } else { // !inLoop
                            if (symb === "|") {
                                inLoop = true;

                            } else if (symb === "L") {
                                inter = "L";

                            } else if (symb === "F") {
                                inter = "F";

                            } else if (symb === "7") {
                                inLoop = inter === "L";
                                inter = null;

                            } else if (symb === "J") {
                                inLoop = inter === "F";
                                inter = null;

                            }
                        }
                    }

                    if (inLoop && !ic) {
                        total += 1;
                        //console.log({x, y})
                    }
                }
            }
            return total;
        };

        const search = () => {
            const dirs = [
                {x: 0, y: -1},
                {x: 1, y: 0},
                {x: 0, y: 1},
                {x: -1, y: 0}
            ];
            const {x: sx, y: sy} = findStart();
            for (let {x: dx, y: dy} of dirs) {
                const {x: tx, y: ty} = add({x: dx, y: dy}, {x: sx, y: sy});
                
                if (grid[ty][tx] in pipe_lookup) {
                    advance({x: tx, y: ty}, {x: sx, y: sy}, 1);
                    return count();
                }
            }
            throw new Error("should not hit");
        };

        return search();
    }

const test_input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`;

    // 394: not correct
    function main(input) {
        console.log(
            sol(input)
            //sol(test_input)
        );
    }

    const DAY = 10;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();