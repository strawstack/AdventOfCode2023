(() => {

    const queue = () => {
        let size = 0;
        let head = null;
        let tail = null;

        const queue_add = elem => {
            if (size == 0) {
                head = {
                    elem,
                    next: null
                };
                tail = head;
            } else {
                tail.next = {
                    elem,
                    next: null
                };
                tail = tail.next;
            }
            size += 1;
        };

        const queue_pop = () => {
            let temp = head;
            head = head.next;
            size -= 1;
            return temp.elem;
        };

        const queue_size = () => {
            return size;
        };

        return { queue_add, queue_pop, queue_size };
    };

    function sol(input) {
        const { queue_add, queue_pop, queue_size } = queue();
        const grid = input.trim().split("\n");
        const getSingle = y => {
            for (let x = 0; x < grid[0].length; x++) {
                if (grid[y][x] === ".") {
                    return {x, y};
                }
            }
        };
        const start  = getSingle(0);
        const target = getSingle(grid.length - 1); 

        const add = (a, b) => {
            return {
                x: a.x + b.x,
                y: a.y + b.y
            };
        };

        const eq = (a, b) => {
            return a.x === b.x && a.y === b.y;
        };

        const hash = coord => JSON.stringify(coord);
        const dhash = (coord, dir) => `${JSON.stringify(coord)}:${dir}`;

        const inBounds = ({x, y}) => {
            return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && grid[y][x] !== "#";
        };

        const d = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ];

        const node_lookup = {};
        const get_nodes = () => {
            for (let y = 0; y < grid.length; y++) {
                for (let x = 0; x < grid[0].length; x++) {
                    let count = 0;
                    for (let delta of d) {
                        const {x: ox, y: oy} = add({x, y}, delta);
                        if (inBounds({x: ox, y: oy}) && ".^>v<".indexOf(grid[oy][ox]) !== -1) {
                            count += 1;
                        }
                    }
                    if (count > 2) {
                        node_lookup[hash({x, y})] = true;
                    }
                }
            }
        };
        get_nodes();

        const symb_lookup = {
            "^": {x: 0, y: -1},
            ">": {x: 1, y: 0},
            "v": {x: 0, y: 1},
            "<": {x: -1, y: 0}
        };

        const flip = ({x, y}) => {
            return {
                x: -1 * x,
                y:  -1 * y
            };
        };
    
        const adj_lookup = {};

        const bfs = () => {
            queue_add({...start, direction: null, steps: 0, prev: hash(start)});
            const visited = {};
            const node_visited = {};

            while (queue_size() > 0) {
                const {x, y, direction, steps, prev} = queue_pop();
                const hh = hash({x, y});
                const dh = dhash({x, y}, direction);
                let new_steps = steps;
                let new_prev = prev;

                if (eq({x, y}, target)) {
                    if (!(prev in adj_lookup)) adj_lookup[prev] = {};
                    adj_lookup[prev][hh] = steps;
                    continue;
                }

                if (hh in node_lookup) {
                    if (!(prev in adj_lookup)) adj_lookup[prev] = {};
                    adj_lookup[prev][hh] = steps;
                    new_steps = 0;
                    new_prev = hh;
                }
                if (hh in visited) continue;
                visited[hash(start)] = true;
                if (hh in node_lookup) visited[hh] = true;

                if (!(hh in node_lookup)) {
                    if (dh in node_visited) continue;
                    node_visited[dh] = true;
                }

                if ("^>v<".indexOf(grid[y][x]) !== -1) {
                    const symb_dir = symb_lookup[grid[y][x]];
                    const {x: nx, y: ny} = add({x, y}, symb_dir);
                    queue_add({x: nx, y: ny, direction: symb_dir, steps: new_steps + 1, prev: new_prev});

                } else {
                    for (let delta of d) {
                        const {x: nx, y: ny} = add({x, y}, delta);
                        if (!inBounds({x: nx, y: ny})) continue;
                        if (grid[ny][nx] === ".") {
                            queue_add({x: nx, y: ny, direction: delta, steps: new_steps + 1, prev: new_prev});
                        
                        } else { // ^, >, v, or <
                            const symb = grid[ny][nx];
                            const symb_dir = symb_lookup[symb];
                            if (!eq(symb_dir, delta) && !eq(symb_dir, flip(delta))) throw new Error(`Should not hit side of slope: ${JSON.stringify(symb_dir)} and ${JSON.stringify(delta)}`);
                            if (!eq(symb_dir, delta)) continue;
                            queue_add({x: nx, y: ny, direction: delta, steps: new_steps + 1, prev: new_prev});
    
                        }
                    }
                }
            }
        };
        bfs();

        console.log(adj_lookup);
        
        return null;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 23;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();