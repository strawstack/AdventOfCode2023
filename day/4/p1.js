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

    const points = card => {
        return Math.floor(
            Math.pow(
                2, 
                intersection(card.win, card.have).length - 1
            )
        );
    };

    function sol(input) {
        let data = input.trim().split("\n")
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
            .map(points)

        return data.reduce((a, c) => a + c);
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 4;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();