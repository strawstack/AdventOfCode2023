(() => {

    function sol(data, initial) {        
        
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

        const lst = [initial];

        while (lst.length > 0) {
            const {coord, dir} = lst.pop();
            const hh = hash(coord);
            
            if (!inBounds(coord)) continue;
            if (hh in beams && beams[hh] === dir) continue;
            beams[hh] = dir;
            
            const symb = data[coord.y][coord.x];

            if (symb === "/") {
                lst.push({
                    coord: add(coord, delta[forward_reflect[dir]]),
                    dir: forward_reflect[dir]
                });

            } else if (symb === "#") {
                lst.push({
                    coord: add(coord, delta[back_reflect[dir]]),
                    dir: back_reflect[dir]
                });

            } else if (symb === "|") {
                if (dir === "right" || dir === "left") {
                    lst.push({
                        coord: add(coord, delta["up"]),
                        dir: "up"
                    });
                    lst.push({
                        coord: add(coord, delta["down"]),
                        dir: "down"
                    });

                } else {
                    lst.push({
                        coord: add(coord, delta[dir]),
                        dir
                    });

                }

            } else if (symb === "-") {
                if (dir === "up" || dir === "down") {
                    lst.push({
                        coord: add(coord, delta["left"]),
                        dir: "left"
                    });
                    lst.push({
                        coord: add(coord, delta["right"]),
                        dir: "right"
                    });

                } else {
                    lst.push({
                        coord: add(coord, delta[dir]),
                        dir
                    });

                }

            } else {
                lst.push({
                    coord: add(coord, delta[dir]),
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
        const data = input.trim().replaceAll("\\", "#").split("\n");
        let max = 0;

        // top
        for (let x = 0; x < data[0].length; x++) {
            max = Math.max(max, sol(data, {
                coord: {x, y: 0},
                dir: "down"
            }));
        }

        // bottom
        for (let x = 0; x < data[0].length; x++) {
            max = Math.max(max, sol(data, {
                coord: {x, y: data.length - 1},
                dir: "up"
            }));
        }

        // right
        for (let y = 0; y < data.length; y++) {
            max = Math.max(max, sol(data, {
                coord: {x: data.length - 1, y},
                dir: "left"
            }));
        }

        // left
        for (let y = 0; y < data.length; y++) {
            max = Math.max(max, sol(data, {
                coord: {x: 0, y},
                dir: "right"
            }));
        }

        console.log(max);
    }

    const DAY = 16;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();