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

        function get_power(pulls) {
            let min = {
                red: 0,
                green: 0,
                blue: 0
            };
            const power_data = pulls.reduce((a, pull) => {
                pull.forEach(cube => {
                    a[cube.color] = Math.max(
                        a[cube.color],
                        cube.n
                    ); 
                });
                return a;
            }, min);
            return Object.values(power_data).reduce((a, c) => a * c);
        }

        return data.reduce((a, {gid, lst}) => a + get_power(lst), 0);
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 2;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();