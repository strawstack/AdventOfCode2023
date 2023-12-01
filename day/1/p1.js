(() => {

    function getDigits(line) {
        const digit = "0123456789";
        
        let first = null;
        let last = null; 
        
        for (let i = 0; i < line.length; i++) {
            if (digit.indexOf(line[i]) !== -1) {
                first = parseInt(line[i]);
                break;
            }
        }
        for (let i = line.length - 1; i >= 0; i--) {
            if (digit.indexOf(line[i]) !== -1) {
                last = parseInt(line[i]);
                break;
            }
        }
        return first * 10 + last;
    }

    function sol(input) {
        const data = input.split("\n").map(line => getDigits(line));
        return data.reduce(
            (a, c) => a + c
        );
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    solutions[1][1] = main;
    
})();