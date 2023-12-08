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
        let current = grid_info.map(([name, left_right]) => name).filter(name => name[2] === "A");
        
        let ztime = [];
        for (let i = 0; i < current.length; i++) {
            ztime.push(null);
        }

        while (true) {

            const dir = path[step % path.length];
            
            step += 1;

            for (let i = 0; i < current.length; i++) {
                current[i] = (dir === "L") ? grid[current[i]][0] : grid[current[i]][1];

                if (current[i][2] === "Z") {
                    if (ztime[i] === null) {
                        ztime[i] = step;
                    }
                }
            }
            
            if (ztime.every(value => value !== null)) break;
        }

        // Find LCM with Wolfram Alpha:
        // 20803, 17873, 23147, 15529, 17287, 19631
        // => 21003205388413
        return ztime;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 8;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();