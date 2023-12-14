(() => {

    function transpose(grid) {
        const new_grid = [];
        for (let x = 0; x < grid[0].length; x++) {
            const row = [];
            for (let y = grid.length - 1; y >= 0; y--) {
                row.push(grid[y][x]);
            }
            new_grid.push(row);
        }
        return new_grid;
    }

    function print(data) {
        for (let row of data) {
            console.log(row.join(""));
        }
        console.log(" ");
    }

    function sol(input) {
        let data = input.trim().split("\n")
            .map(line => line.split(""));
        
        const totals = [];
        for (let cycle = 0; cycle < 1000; cycle++) {
            for (let d = 0; d < 4; d++) {
                let move = true;
                while (move) {
                    move = false;
                    for (let y = 0; y < data.length - 1; y++) {
                        for (let x = 0; x < data[0].length; x++) {
                            if (data[y][x] === "." && data[y + 1][x] === "O") {
                                data[y][x] = "O";
                                data[y + 1][x] = ".";
                                move = true;
                            }
                        }
                    }
                }
                //print(data)
                data = transpose(data);
            }

            let total = 0;
            for (let y = 0; y < data.length; y++) {
                for (let x = 0; x < data[0].length; x++) {
                    if (data[y][x] === "O") {
                        total += data.length - y;
                    }
                }
            }
            totals.push(total);
        }

        let fz = {};
        for (let n of totals) {
            if (!(n in fz)) fz[n] = 0;
            fz[n] += 1;
        }

        let lst = [];
        for (let k in fz) {
            lst.push([fz[k], k]);
        }
        lst.sort((a, b) => b[0] - a[0]);

        return totals.pop();
    }

const test_input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;

    function main(input) {
        console.log(
            sol(input)
            //sol(test_input)
        );
    }

    const DAY = 14;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();