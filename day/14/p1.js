(() => {

    function sol(input) {
        let data = input.trim().split("\n")
            .map(line => line.split(""));
        
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

        let total = 0;
        for (let y = 0; y < data.length; y++) {
            for (let x = 0; x < data[0].length; x++) {
                if (data[y][x] === "O") {
                    total += data.length - y;
                }
            }
        }

        return total;
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