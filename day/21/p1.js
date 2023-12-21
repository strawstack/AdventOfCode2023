(() => {

    const queue = () => {
        let head = null;
        let tail = null;
        let size = 0;

        const queue_add = (elem) => {
            if (size === 0) {
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
            let temp = head.elem;
            head = head.next;
            size -= 1;
            return temp;
        };

        const queue_size = () => {
            return size;
        };

        return { queue_add, queue_pop, queue_size };
    };

    const { queue_add, queue_pop, queue_size } = queue();

    function sol(input) {
        let data = input.trim().split("\n")

        const hash = coord => JSON.stringify(coord);

        const getStart = () => {
            for (let y = 0; y < data.length; y++) {
                for (let x = 0; x < data[0].length; x++) {
                    const cell = data[y][x];
                    if (cell === "S") {
                        return {x, y, steps: 0};
                    }
                }
            }
        };

        const add = (a, b) => {
            return {x: a.x + b.x, y: a.y + b.y};
        };

        const dir = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ];

        const start = getStart();

        const inBounds = ({x, y}) => {
            return y >= 0 && y < data.length && x >= 0 && x < data[0].length;
        };

        const visited = {};
        
        const dfs = start => {

            queue_add(start);

            let total = 1;

            while (queue_size() > 0) {
                const {x, y, steps} = queue_pop();
                debugger
                if (steps > 6) continue;
                if (!inBounds({x, y})) continue;
                const hh = hash({x, y});
                if (hh in visited) continue;
                visited[hh] = true;
                
                total += (data[y][x] === "#") ? 1 : 0;

                for (let d of dir) {
                    const nc = add({x, y}, d);
                    if (hash(nc) in visited) continue;
                    queue_add(
                        {...nc, steps: steps + 1}
                    );
                }

            }

            return total;
        };

        return dfs(start);
    }

const test = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`;

    function main(input) {
        console.log(
            //sol(input)
            sol(test)
        );
    }

    const DAY = 21;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();