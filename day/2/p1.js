(() => {

    function sol(input) {
        let data = input.trim().split("\n")
            .map(line => {
                const [game_id, game_string] = line.split(": ");
                const gid = parseInt(game_id.split(" ")[1]);
                const game_list = game_string.split("; ")
                    .map(game => game
                        .split(", ")
                        .map(value_cube => {
                            const [value, color] = value_cube.split(" ");
                            const n = parseInt(value);
                            return {n, color};
                        })
                    )
                return {gid, lst: game_list};
            });

        const limit = {
            red: 12,
            green: 13,
            blue: 14
        };

        const is_game_valid = game => {
            for (let cube of game) {
                if (limit[cube.color] < cube.n) {
                    return false;
                }
            }
            return true;
        };

        let total = 0;
        for (let {gid, lst} of data) {
            if(lst.every(is_game_valid)) {
                total += gid;
            }
        }

        return total;
    }

    // "Game 1: 4 green, 7 blue; 2 blue, 4 red; 5 blue, 2 green, 2 red; 1 green, 3 red, 9 blue; 3 green, 9 blue; 7 green, 2 blue, 2 red"

    Array.prototype.target = function (index, func) {
        this[index] = func(this[index]);
        return this;
    };

    const target = function (index, func) {
        return lst => {
            lst[index] = func(lst[index]);
            return lst;
        };
    };

    const pick = function (index, func) {
        return lst => {
            return func(lst[index]);
        };
    };

    const cut = function (sep) {
        return line => line.split(sep);
    };

    const int = n => parseInt(n);

    function sol3(input) {
        /*
        let data = input.trim().split("\n")
            .split(": ", 
                l => l.split(" ")
                    ,
                r => r.split()
            )

        return data; */
    }

    function sol2(input) {
        let data = input.trim().split("\n")
            .map(line => line.split(": ")
                .target(0, e => e.split(" ")
                    .target(1, e => parseInt(e))[1]
                )
                .target(1, pulls => pulls.split("; ")
                    .map(pull => pull.split(", ")
                        .map(cube => {
                            const [v, name] = cube.split(" ");
                            return {
                                n: parseInt(v),
                                name
                            };
                        })
                    )
                )
            );

        return data;
    }

    function main(input) {
        console.log(
            sol(input)
        );
        /*
        console.log(
            sol2(input)
        );
        console.log(
            sol3(input)
        );*/
    }

    const DAY = 2;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();