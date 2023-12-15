(() => {

    function sol(input) {
        let data = input.trim().split(",")
            .map(seq => {
                let total = 0;
                for (let c of seq) {
                    total += c.charCodeAt(0);
                    total *= 17;
                    total = total % 256;
                }
                return total;
            });

        return data.reduce((a, c) => a + c);
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 15;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();