(() => {

    function sol(input) {
        
        const pipe_lookup = {
            "|": [{x: 0, y: 1}, {x: 0, y: -1}],
            "-": [{x: -1, y: 0}, {x: 1, y: 0}],
            "L": [{x: 0, y: -1}, {x: 1, y: 0}],
            "J": [{x: -1, y: 0}, {x: 0, y: -1}],
            "7": [{x: -1, y: 0}, {x: 0, y: 1}],
            "F": [{x: 1, y: 0}, {x: 0, y: 1}],
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

        const advance = ({x: tx, y: ty}, {x: ex, y: ey}, steps) => {
            if (grid[ty][tx] === "S") {
                return steps;
            } else {
                const other = otherEnd({x: tx, y: ty}, {x: ex, y: ey});
                return advance(other, {x: tx, y: ty}, steps + 1);
            }
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
                    const ans = advance({x: tx, y: ty}, {x: sx, y: sy}, 1);
                    return Math.ceil(ans / 2);
                }
            }
            throw new Error("should not hit");
        };

        return search();
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 10;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();