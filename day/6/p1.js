(() => {

    function sol(input) {
        let data = input.trim().split("\n")
            .map(line => line.split(/ +/)
                .slice(1)
                .map(n => parseInt(n))
            );
        
        const races = [];
        for (let i = 0; i < data[0].length; i++) {
            races.push({
                time: data[0][i],
                dist: data[1][i]
            });
        }

        const ans = races.map(({time, dist}) => {
            let count = 0;
            for (let t = 0; t <= time; t++) {
                const res = (time - t) * t;
                if (res > dist) {
                    count += 1;
                }
            }
            return count;
        });
    
        return ans.reduce((a, c) => a * c);

    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 6;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();