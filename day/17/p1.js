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
        const grid = input.trim().split("\n");
        const MAX_COUNT = 2;
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
            count: MAX_COUNT + 1 // If count === 0 then you have to turn
        });

        const visited = {};
        while (heap.size() > 0) {
            const {coord, dir, count} = heap.pop();
            
            const hh = hash({coord, dir, count});
            if (hh in visited) continue;
            visited[hh] = true;

            for (let d = 0; d < directions.length; d++) {
                const delta = directions[d];
                if (opp(dir, delta)) continue;
                if (eq(dir, delta)) {
                    if (count === 2) {
                        heap.add({
                            coord: add(coord, dir),
                            dir, count: 1
                        });
                        heap.add({
                            coord: add(add(coord, dir), dir),
                            dir, count: 0
                        });
                    } else if (count === 1) {
                        heap.add({
                            coord: add(coord, dir),
                            dir, count: 0
                        });
                    }
                } else {

                    // TODO: advance in the two other directions
                    // TODO: Calculate the cost of getting to a node

                }
            }
        }

        return grid;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 17;
    const PART = 1;
    solutions[DAY][PART] = main;

/*
function heap_test() {
    const eq = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i].cost !== b[i].cost) {
                return false;
            }
        }
        return true;
    };

    const cmp = (a, b) => {
        return a.cost < b.cost;
    };

    //
    // Test one
    //
    let test_one = [
        [4,2,7,4,7].map(x => { return {cost: x}}),
        [2,4,4,7,7].map(x => { return {cost: x}})
    ];
    const heap_one = heap_factory(cmp);
    for (let value of test_one[0]) { heap_one.add(value); }
    let ans_one = [];
    while (heap_one.size() > 0) {
        ans_one.push(heap_one.pop());
    }
    if (!eq(test_one[1], ans_one)) {
        throw new Error(`Test one fails`);
    }

    //
    // Test two
    //
    const heap_two = heap_factory(cmp);
    heap_two.add({cost: 5});
    heap_two.add({cost: 2});
    heap_two.add({cost: 3});
    const res = heap_two.pop();
    if (res.cost !== 2) {
        throw new Error(`Test two fails`);
    }
    heap_two.add({cost: 7});
    heap_two.add({cost: 1});
    heap_two.add({cost: 9});
    heap_two.pop(); // 1
    heap_two.pop(); // 3
    const ans_two = [];
    while (heap_two.size() > 0) {
        ans_two.push(heap_two.pop());
    }
    const correct_ans = [5,7,9].map(x => {return {cost: x}});
    if (!eq(ans_two, correct_ans)) {
        throw new Error(`Test two fails`);
    }
    return true;
}; */

})();