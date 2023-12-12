(() => {

    function sol(input) {
        let grid = input.trim().split("\n");

        const hash = coord => JSON.stringify(coord);

        const galaxies = {}; 
        grid.forEach((row, y) => {
            row.split("").forEach((symb, x) => {
                if (symb === "#") {
                    galaxies[hash({x, y})] = {x, y};
                }
            });
        });

        const gal_row = {};
        const gal_col = {};
        for (let {x, y} of Object.values(galaxies)) {
            gal_row[y] = true;
            gal_col[x] = true;
        }

        const free_row = {};
        for (let r = 0; r < grid.length; r++) {
            if (!(r in gal_row)) {
                free_row[r] = true;
            }
        }
        const free_col = {};
        for (let c = 0; c < grid[0].length; c++) {
            if (!(c in gal_col)) {
                free_col[c] = true;
            }
        }

        const eq = (a, b) => {
            return a.x === b.x && a.y === b.y;
        }

        const EXPAND = 1;

        const distance = (g1, g2) => {
            const lx = (g1.x < g2.x) ? g1.x : g2.x; 
            const ly = (g1.y < g2.y) ? g1.y : g2.y;
            const hx = (g1.x < g2.x) ? g2.x : g1.x;
            const hy = (g1.y < g2.y) ? g2.y : g1.y;
            
            let xd = hx - lx; 
            let yd = hy - ly;

            for (let y of Object.keys(free_row)) {
                if (y > ly && y < hy) {
                    yd += EXPAND;
                }
            }
            for (let x of Object.keys(free_col)) {
                if (x > lx && x < hx) {
                    xd += EXPAND;
                }
            }
            return xd + yd;
        };

        let total = 0;
        const gal = Object.values(galaxies);
        for (let i = 0; i < gal.length; i++) {
            for (let j = i + 1; j < gal.length; j++) {
                const g1 = gal[i];
                const g2 = gal[j];
                if (!eq(g1, g2)) {
                    total += distance(g1, g2);
                }
            }
        }

        return total;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 11;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();