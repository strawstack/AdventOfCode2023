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

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 2;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();