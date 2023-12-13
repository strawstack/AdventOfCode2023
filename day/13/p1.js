(() => {

    function bounds(height, number) {
        return number >= 0 && number < height;
    }

    // ay: the first row above a horizontal mirror
    function reflect(grid, ay) {
        let by = ay + 1;
        if (by === grid.length) return false;
        while (bounds(grid.length, ay) && bounds(grid.length, by)) {
            if (grid[ay] !== grid[by]) {
                return false;
            }
            ay -= 1;
            by += 1;
        }
        return true;
    }

    function transpose(grid) {
        const new_grid = [];
        for (let x = 0; x < grid[0].length; x++) {
            const row = [];
            for (let y = 0; y < grid.length; y++) {
                row.push(grid[y][x]);
            }
            new_grid.push(row.join(""));
        }
        return new_grid;
    }

    function getReflection(grid) {
        for (let y = 0; y < grid.length; y++) {
            if (reflect(grid, y)) {
                return 100 * (y + 1);
            }
        }

        const tgrid = transpose(grid);
        for (let y = 0; y < tgrid.length; y++) {
            if (reflect(tgrid, y)) {
                return y + 1;
            }
        }
    }

    function sol(input) {
        let data = input.trim().split("\n\n")
            .map(line => line.split("\n"))
            .map(getReflection)
        return data.reduce((a, c) => a + c);
    }

const test_input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`;

    function main(input) {
        console.log(
            sol(input)
            //sol(test_input)
        );
    }

    const DAY = 13;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();