(() => {

    function sol(input) {
        const LIMIT_VALUE = 3;
        let grid = input.trim().split("\n")
            .map(line => line.split("")
                .map(n => parseInt(n))
            );

        const delta = [
            {x: 0, y: -1}, // up
            {x: 1, y: 0},  // right
            {x: 0, y: 1},  // down
            {x: -1, y: 0}  // left
        ];

        const inBounds = ({x, y}) => {
            return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;  
        };

        const add = (a, b) => {
            return {
                x: a.x + b.x,
                y: a.y + b.y
            };
        };

        const eq = (a, b) => {
            return a.x === b.x && a.y === b.y;
        };

        // Given direction returns next options
        const opts = dir => {
            const right = (dir + 1) % 4;
            const v = (dir - 1) % 4;
            const left = v < 0 ? v + 4 : v;
            return [dir, right, left];
        };

        const inPath = (new_coord, lst) => {
            for (let { coord } of lst) {
                if (eq(coord, new_coord)) return true;
            }
            return false;
        };

        const hash = coord => JSON.stringify(coord);

        const done = {};

        const lookup = {};

        let best = Infinity;

        const lst = [{
            coord: {x: 0, y: 0},
            dir: null
        }];

        while (lst.length > 0) {
            const { coord, dir } = lst[lst.length - 1];
            const ph = lst.length > 1 ? hash(lst[lst.length - 2].coord) : "null_hash";
            const hh = hash(coord);

            // Target cell found
            if (coord.y === grid.length - 1 && coord.x === grid[0].length - 1) {
                const value = lst.reduce((a, c) => a + grid[c.coord.y][c.coord.x], 0);
                best = Math.min(best, value);
                
                // Return to parent
                if (!(ph in done)) done[ph] = {};
                done[ph][dir] = true; 
                lst.pop(); break;
            }

            // Visit adj cells
            let child_call = false;
            for (let i = 0; i < 4; i++) {
                const new_coord = add(coord, delta[i]);

                if (!inBounds(new_coord)) continue;
                if (!(hh in done)) done[hh] = {};
                if (i in done[hh]) continue;
                if (inPath(new_coord, lst)) continue;

                if (hash(new_coord) in lookup) {
                    const value = lst.reduce((a, c) => a + grid[c.coord.y][c.coord.x], 0) + lookup[hash(new_coord)];
                    best = Math.min(best, value);

                    // Return to parent
                    if (!(ph in done)) done[ph] = {};
                    done[ph][dir] = true; 
                    lst.pop(); break;
                }

                child_call = true;
                lst.push({
                    coord: new_coord,
                    dir: i
                });
                break;
            }

            if (child_call) continue;
        }

        return null;
    }

const test_input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533
`;

    function main(input) {
        console.log(
            //sol(input)
            sol(test_input)
        );
    }

    const DAY = 17;
    const PART = 1;
    solutions[DAY][PART] = main;

})();