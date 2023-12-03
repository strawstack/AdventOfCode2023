(() => {

    function sol(input) {
        let grid = input.trim().split("\n");

        // Unique ID tracker
        const uid = (() => {
            let count = -1;
            return () => {
                count += 1;
                return count;
            };
        })();
        
        const digit = c => {
            const digits = "0123456789";
            return digits.indexOf(c) !== -1;
        };
        
        const symb = c => {
            const other = "0123456789.";
            return other.indexOf(c) === -1;
        };

        const clear = digits => {
            digits.active = false;
            digits.id = null;
            digits.lst = [];
        };

        const copy = digits => {
            return JSON.parse(JSON.stringify(digits));
        };

        const hash = coord => {
            return JSON.stringify(coord);
        };

        const inBounds = ({x, y}) => {
            const HEIGHT = grid.length;
            const WIDTH  = grid[0].length;
            return y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH;
        };

        const symb_lst = [];
        const digit_lst = [];

        // Step over grid
        // Enter number state, if so collect number and positions
        // Assign each cell of number to same ID, ID points to number
        for (let y = 0; y < grid.length; y++) {
            
            const digits = {
                active: false,
                id: null,
                lst: []
            };

            for (let x = 0; x < grid[y].length; x++) {
                
                const cell = grid[y][x];
                
                if (cell === ".") {
                    if (digits.active) {
                        digit_lst.push(copy(digits));
                        clear(digits);
                    }

                } else if (digit(cell)) {
                    
                    if (!digits.active) {
                        digits.active = true;
                        digits.id = uid();
                    } 

                    digits.lst.push({x, y});

                // Find location of each symbol (symbol is not number and not ".")
                } else if (symb(cell)) {
                    if (digits.active) {
                        digit_lst.push(copy(digits));
                        clear(digits);
                    }
                    symb_lst.push({x, y});

                }
            }
            if (digits.active) {
                digit_lst.push(copy(digits));
                clear(digits);
            }
        }

        const lookup_coord_to_uid = {};
        const lookup_uid_to_number = {};

        for (let {id, lst} of digit_lst) {

            for (let coord of lst) {
                const coord_hash = hash(coord);
                lookup_coord_to_uid[coord_hash] = id;
            }

            const number = parseInt(lst.map(({x, y}) => grid[y][x]).join(""));
            lookup_uid_to_number[id] = number;
        }

        const searchAround = ({x: xx, y: yy}) => {
            let ids = {};
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    const t = {x: xx + x, y: yy + y};
                    if (inBounds(t)) {
                        const cell = grid[t.y][t.x];
                        if (digit(cell)) {
                            const coord_hash = hash(t);
                            const id = lookup_coord_to_uid[coord_hash];
                            ids[id] = true;
                        }
                    }
                }
            }
            return Object.keys(ids);
        };        

        const part_numbers = [];
        for (let coord of symb_lst) {
            const ids = searchAround(coord);
            for (let id of ids) {
                const number = lookup_uid_to_number[id];
                part_numbers.push(number);
            }
        }

        return part_numbers.reduce((a, c) => a + c);
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 3;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();