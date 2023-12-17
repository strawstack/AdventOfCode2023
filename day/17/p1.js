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
        
        const rule_safe = lst => {
            let count = 0;
            let prev = null;
            for (let item of lst) {
                if (item === prev) {
                    count += 1;
                } else {
                    count = 0;
                }
                prev = item;
                if (count === 3) {
                    return false;
                }
            }
            return true;
        };

        // Given cell and direction provides cached answer
        // {hash(coord) -> {dir -> answer}}
        const ans_lookup = {};
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                ans_lookup[hash({x, y})] = {};
            }
        }
        
        const path_lookup = {};
        const final_lookup = {};

        const lst = [{
            coord: {x: 0, y: 0},
            dir: 1, // 0: up, 1: right, 2: down, 3: left
            limit: LIMIT_VALUE
        }];

        let best_value = Infinity;
        let best_lst = null;

        while (lst.length > 0) {
            const { coord, dir, limit } = lst[lst.length - 1];
            const hc = hash(coord);

            if (lst.length === 1) {
                
                let child_call = false;
                for (let opt of opts(dir, limit)) {
                    if (opt in ans_lookup[hc]) continue;
                    const nx_coord = add(coord, delta[opt]);
                    lst.push({
                        coord: nx_coord,
                        dir: opt,
                        limit: limit - 1
                    });
                    child_call = true;
                    break;
                }

                if (child_call) continue;
                lst.pop(); // final return
                
            } else {
                const ph = hash(lst[lst.length - 2].coord);

                if (!inBounds(coord)) {
                    ans_lookup[ph][dir] = Infinity;
                    lst.pop();
                    delete path_lookup[hc];
                    delete path_lookup[ph];
                    continue;
                }

                // Bottom right is reached
                if (coord.y === grid.length - 1 && coord.x === grid[0].length - 1) {
                    ans_lookup[ph][dir] = grid[coord.y][coord.x];
                    
                    const lst_path = lst.map(x => x.dir);
                    if (rule_safe(lst_path) && lst_path.length >= grid.length + grid[0].length - 1) {
                        const value = lst.reduce((a, c) => a + grid[c.coord.y][c.coord.x], 0)
                        if (value < best_value) {
                            best_value = value;
                            best_lst = lst_path;
                        }
                    }                    
                    
                    lst.pop();
                    delete path_lookup[hc];
                    delete path_lookup[ph];
                    continue;
                }
    
                if (hc in final_lookup) {
                    ans_lookup[ph][dir] = final_lookup[hc].ans;
                    lst.pop();

                    const lst_path = [lst.map(x => x.dir), final_lookup[hc].lst.map(x => x.dir)].flat();
                    if (rule_safe(lst_path) && lst_path.length >= grid.length + grid[0].length - 1) {
                        const value = lst.reduce((a, c) => a + grid[c.coord.y][c.coord.x], 0) + final_lookup[hc].ans;
                        if (value < best_value) {
                            best_value = value;
                            best_lst = lst_path;
                        }
                    }

                    delete path_lookup[hc];
                    delete path_lookup[ph];
                    continue;
                }

                // Never visit a node in the current path
                if (hc in path_lookup) {
                    ans_lookup[ph][dir] = Infinity;
                    lst.pop();
                    delete path_lookup[ph];
                    continue;
                }
                path_lookup[hc] = true;

                let child_call = false;
                for (let opt of opts(dir, limit)) {
                    if (opt in ans_lookup[hc]) continue;
                    const nx_coord = add(coord, delta[opt]);
                    const new_limit = limit === 0 || dir !== opt ? LIMIT_VALUE : limit - 1;
                    lst.push({
                        coord: nx_coord,
                        dir: opt,
                        limit: new_limit
                    });
                    child_call = true;
                    break;
                }

                if (child_call) continue;

                const ans = Object.values(ans_lookup[hc]).reduce((a, c) => a < c ? a : c) + grid[coord.y][coord.x];
                ans_lookup[ph][dir] = ans;
                if (ans !== Infinity) {
                    final_lookup[hc] = {
                        ans,
                        lst: lst.slice()
                    };
                }
                lst.pop();
                delete path_lookup[hc];
                delete path_lookup[ph];
            }
        }

        console.log(best_value - grid[0][0]);
        console.log(best_lst);
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
            sol(input)
            //sol(test_input)
        );
    }

    const DAY = 17;
    const PART = 1;
    solutions[DAY][PART] = main;

})();