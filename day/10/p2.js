(() => {

    function sol(input) {

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

        const dirs = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ];

        const hash = coord => {
            return JSON.stringify(coord);
        };

        const dfs = ({x: cx, y: cy}, visited) => {
        
            visited[hash({x: cx, y: cy})] = true;
            
            for (let {x: dx, y: dy} of dirs) {
                const {x: nx, y: ny} = add({x: cx, y: cy}, {x: dx, y: dy});
                if (!inBounds(nx, ny)) return false;

                if (grid[ny][nx] !== ".") continue;
                if (hash({x: nx, y: ny}) in visited) continue;

                if (!dfs({x: nx, y: ny}, visited)) {
                    return false;
                }
            }
            return true;
        };

        const total_visited = {};
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                if (grid[y][x] !== ".") continue;
                if (hash({x, y}) in total_visited) continue;

                const visited = {};
                if (dfs({x, y}, visited)) {
                    for (let k in visited) {
                        total_visited[k] = true;
                    }
                }
            }
        }

        for (let k in total_visited) {
            console.log(k)
        }

        return Object.keys(total_visited).length;
    }

const test_input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`;

    function main(input) {
        console.log(
            //sol(input)
            sol(test_input)
        );
    }

    const DAY = 10;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();