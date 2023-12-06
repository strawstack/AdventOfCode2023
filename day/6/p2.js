(() => {

    function sol(input) {
        const [time, dist] = input.trim().split("\n")
            .map(line => line.split(/ +/)
                .slice(1)
                .join("")
            ).map(n => parseInt(n));



        let count = 0;
        for (let t = 0; t <= time; t++) {
            const res = (time - t) * t;
            if (res > dist) {
                count += 1;
            }
        }
        return count;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 6;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();