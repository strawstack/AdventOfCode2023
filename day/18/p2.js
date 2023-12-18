(() => {

    function sol(input) {
        const data = input.trim().split("\n")
            .map(line => {
                const [dir, n, rgb] = line.split(" ");
                return [dir, parseInt(n), rgb];
            });

        const hash = coord => JSON.stringify(coord);

        const add = (a, b) => {
            return {
                x: a.x + b.x,
                y: a.y + b.y
            };
        };

        const delta = {
            U: {x: 0, y: -1},
            R: {x: 1, y: 0},
            D: {x: 0, y: 1},
            L: {x: -1, y: 0}
        };

        const SCALE = 100;

        const grid = {};
        let coord = {x: 0, y: 0};
        grid[hash(coord)] = true;

        for (let [dir, n, rgb] of data) {

            const hex_number = parseInt(rgb.slice(2, 7), 16);
            const real_dir = ["R", "D", "L", "U"][parseInt(rgb[rgb.length - 2], 10)];

            /*
            for (let i = 0; i < hex_number; i++) {
                coord = add(coord, delta[real_dir]);
                grid[hash(coord)] = coord;
            }*/  
        }

        return null;

        const dfs = () => {
            const visited = {};
            const lst = [{x: 0, y: -1}];
            while (lst.length > 0) {
                const coord = lst.pop();

                if (hash(coord) in visited) continue;
                visited[hash(coord)] = true;

                for (let d of "URDL") {
                    const new_coord = add(coord, delta[d]);                    
                    if (hash(new_coord) in grid) continue;

                    lst.push(new_coord);
                }
            }
            return Object.keys(visited).length;
        };

        return SCALE * (dfs() + Object.keys(grid).length);
    }

const test_input = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)
`;

    function main(input) {
        console.log(
            //sol(test_input)
            sol(input)
        );
    }

    const DAY = 18;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();