(() => {

    function sol(input) {
        const LIMIT_VALUE = 3;
        let grid = input.trim().split("\n")
            .map(line => line.split("")
                .map(n => parseInt(n))
            );
        grid[0][0] = 0; // cost not applied for start cell

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

        // Given direction returns next options
        const opts = (dir, limit) => {
            const dirs = [];
            dirs.push( (dir + 1) % 4 );
            const v = (dir - 1) % 4;
            dirs.push( v < 0 ? v + 4 : v );
            if (limit > 0) {
                dirs.push(dir);
            }
            return dirs;
        };

        const hash = coord => JSON.stringify(coord);

        const ans_lookup = {};
        const path_lookup = {};
        
        const next = ({coord, dir, limit}) => {
            const hc = hash(coord);
            if (!inBounds(coord)) return Infinity;
            if (hc in ans_lookup) return ans_lookup[coord];
            
            if (coord.y === grid.length - 1 && coord.x === grid[0].length - 1) return grid[coord.y][coord.x];

            const res = [];
            for (let opt of opts(dir, limit)) {
                const nx_coord = add(coord, delta[opt]);
                const new_limit = limit === 0 || dir !== opt ? LIMIT_VALUE : limit - 1;
                if (!(hash(nx_coord) in path_lookup)) {
                    path_lookup[hc] = true;
                    res.push(
                        next({
                            coord: nx_coord,
                            dir: opt,
                            limit: new_limit
                        })
                    );
                    delete path_lookup[hc];
                }
            }
            const ans = res.reduce((a, c) => a < c ? a : c) + grid[coord.y][coord.x];
            ans_lookup[hc] = ans;
            return ans;
        };

        path_lookup[hash({x: 0, y: 0})] = true;
        return next({
            coord: {x: 0, y: 0},
            dir: 1, // 0: up, 1: right, 2: down, 3: left
            limit: LIMIT_VALUE
        });
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 17;
    const PART = 1;
    solutions[DAY][PART] = main;

})();