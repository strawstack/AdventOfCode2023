(() => {

    const heap_factory = cmp => {
        const lst = [];

        const swap = (a, b) => {
            let temp = lst[a];
            lst[a] = lst[b];
            lst[b] = temp;
        };

        const upheap = index => {
            const parent = i => Math.floor((i - 1) / 2);
            let p = index;
            while (p !== 0) {
                p = parent(p);
                const left  = 2 * p + 1;
                const right = 2 * p + 2;
                if (cmp(lst[left], lst[p])) {
                    swap(left, p);
                } else if (right < lst.length && cmp(lst[right], lst[p])) {
                    swap(right, p);
                }
            }
        };

        const downheap = index => {
            let i = index;
            while (true) {
                const left  = 2 * i + 1;
                const right = 2 * i + 2;
                if (left >= lst.length) break;

                let t = left;
                if (right < lst.length && cmp(lst[right], lst[left])) {
                    t = right;
                }

                if (cmp(lst[t], lst[i])) {
                    swap(t, i);
                    i = t;

                } else {
                    break;

                }
            }  
        };

        const add = value => {
            lst.push(value);
            upheap(lst.length - 1);
        };

        const pop = () => {
            swap(0, lst.length - 1);
            const temp = lst.pop();
            downheap(0);
            return temp;
        };

        const size = () => {
            return lst.length;
        };

        return { add, pop, size };
    };

    function sol(input) {
        const heap = heap_factory((a, b) => a.cost < b.cost);
        //console.log(`test: ${heap_test()}`);
        const grid = input.trim().split("\n")
            .map(line => line.split("")
                .map(x => parseInt(x))
            );
        const LOCK_COUNT = 3;
        const MAX_COUNT  = 9;
        const directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
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
        const add2 = (a, b) => {
            return add(add(a, b), b);
        };
        const add3 = (a, b) => {
            return add(add(add(a, b), b), b);
        };
        const add_look = [
            add, add2, add3
        ];

        const hash = state => JSON.stringify(state);

        const eq = (a, b) => {
            return a.x === b.x && a.y === b.y;
        };

        const opp = (a, b) => {
            return eq(a, {
                x: -1 * b.x,
                y: -1 * b.y
            });
        };

        heap.add({
            coord: {x: 0, y: 0},
            dir: 1,
            lock: LOCK_COUNT + 1, // You can't change unless this is zero
            max: MAX_COUNT + 1, // You must change if this is zero
            cost: 0
        });

        const visited = {};
        const target = {x: grid[0].length - 1, y: grid.length - 1};
        while (heap.size() > 0) {
            const {coord, dir, lock, max, cost} = heap.pop();
            const cdir = directions[dir];
            
            // End goal
            if (eq(coord, target) && lock === 0) return cost;

            if (!inBounds(coord)) continue;
            const hh = hash({coord, dir, max});
            if (hh in visited) continue;
            visited[hh] = true;

            for (let d = 0; d < directions.length; d++) {
                const delta = directions[d];
                if (opp(cdir, delta)) continue;
                if (eq(cdir, delta)) {
                    if (max > 0) {
                        const nc  = add(coord, cdir);
                        if (!inBounds(nc)) continue;
                        heap.add({
                            coord: nc,
                            dir: d, max: max - 1,
                            lock: Math.max(0, lock - 1),
                            cost: cost + grid[nc.y][nc.x]
                        });
                    }
                } else {
                    if (lock > 0) continue;
                    const nc = add(coord, delta);
                    if (!inBounds(nc)) continue;
                    heap.add({
                        coord: nc,
                        dir: d, max: MAX_COUNT,
                        lock: LOCK_COUNT,
                        cost: cost + grid[nc.y][nc.x]
                    });
                }
            }
        }

        throw new Error("Should not hit");
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 17;
    const PART = 2;
    solutions[DAY][PART] = main;

})();