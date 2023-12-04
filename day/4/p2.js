(() => {

    Array.prototype.target = function (index, func) {
        this[index] = func(this[index]);
        return this;
    }

    function intersection(a, b) {
        let inter = [];
        for (let k of b) {
            if (a.indexOf(k) !== -1) {
                inter.push(k);
            }
        }
        return inter;
    }

    function sol(input) {

        const tracker = [];
        for (let i = 0; i < input.trim().split("\n").length + 1; i++) {
            tracker.push(1);
        }
        tracker[0] = 0;

        const points = ({cid, win, have}) => {
            const value = Math.floor(intersection(win, have).length);

            for (let i = cid + 1; i < cid + 1 + value; i++) {
                tracker[i] += tracker[cid];
            }

            return value;
        };

        input.trim().split("\n")
            .map(line => line
                .split(": ")
                .target(0, card_number => parseInt(card_number.split(/\s+/)[1]))
                .target(1, number_sets => number_sets
                    .split(" | ")
                    .map(numbers => numbers.split(/\s+/).map(n => parseInt(n))) 
                )
            )
            .map(card => {
                return {
                    cid: card[0],
                    win: card[1][0],
                    have: card[1][1]
                }
            })
            .map(points);

        return tracker.reduce((a, c) => a + c);
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 4;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();