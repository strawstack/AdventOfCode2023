(() => {

    function sol(input) {        
        const data = input.trim().replaceAll("\\", "#").split("\n");

        let delta = {
            up: {x: 0, y: -1},
            right: {x: 1, y: 0},
            down: {x: 0, y: 1},
            left: {x: -1, y: 0}
        };

        let forward_reflect = {
            up: "right",
            right: "up",
            down: "left",
            left: "down"
        };

        let back_reflect = {
            up: "left",
            right: "down",
            down: "right",
            left: "up"
        };
        
        const hash = coord => JSON.stringify(coord);

        const add = (a, b) => {
            return {x: a.x + b.x, y: a.y + b.y};
        };

        const inBounds = ({x, y}) => {
            return y >= 0 && y < data.length && x >= 0 && x < data[0].length;
        }

        const beams = {};

        const lst = [
            {
                coord: {x: -1, y: 0},
                dir: "right"
            }
        ];

        while (lst.length > 0) {
            const {coord, dir} = lst.pop();
            const hh = hash(coord);
            
            if (!(coord.x === -1 && coord.y === 0)) {
                if (!inBounds(coord)) continue;
                if (hh in beams && beams[hh] === dir) continue;
                beams[hh] = dir;
            }
            
            const {x: nx, y: ny} = add(coord, delta[dir]);
            if (!inBounds({x: nx, y: ny})) continue;

            const symb = data[ny][nx];

            if (symb === "/") {
                lst.push({
                    coord: {x: nx, y: ny},
                    dir: forward_reflect[dir]
                });

            } else if (symb === "#") {
                lst.push({
                    coord: {x: nx, y: ny},
                    dir: back_reflect[dir]
                });

            } else if (symb === "|") {
                if (dir === "right" || dir === "left") {
                    lst.push({
                        coord: {x: nx, y: ny},
                        dir: "up"
                    });
                    lst.push({
                        coord: {x: nx, y: ny},
                        dir: "down"
                    });

                } else {
                    lst.push({
                        coord: {x: nx, y: ny},
                        dir
                    });

                }

            } else if (symb === "-") {
                if (dir === "up" || dir === "down") {
                    lst.push({
                        coord: {x: nx, y: ny},
                        dir: "left"
                    });
                    lst.push({
                        coord: {x: nx, y: ny},
                        dir: "right"
                    });

                } else {
                    lst.push({
                        coord: {x: nx, y: ny},
                        dir
                    });

                }

            } else {
                lst.push({
                    coord: {x: nx, y: ny},
                    dir
                });

            }
        }

        return Object.keys(beams).length;
    }

const test = `.|...#....
|.-.#.....
.....|-...
........|.
..........
.........#
..../.##..
.-.-/..|..
.|....-|.#
..//.|....
`;

    function main(input) {
        console.log(
            sol(input)
            //sol(test)
        );
    }

    const DAY = 16;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();