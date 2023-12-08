(() => {

    function sol(input) {

        Array.prototype.target = function (index, func) {
            this[index] = func(this[index]);
            return this;
        }

        const [path, grid_info] = input.trim().split("\n\n")
            .target(1, lines => lines.split("\n")
                .map(line => line.split(" = ")
                    .target(1, paths => paths.slice(1, paths.length - 1)
                        .split(", ")
                    )
                )
            );
        
        const grid = {};
        for (let [name, left_right] of grid_info) {
            grid[name] = left_right;
        }

        let step = 0;
        let current = "AAA";
        while (true) {
            
            const dir = path[step % path.length];
            
            step += 1;

            current = (dir === "L") ? grid[current][0] : grid[current][1];

            if (current === "ZZZ") break;
        }

        return step;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 8;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();