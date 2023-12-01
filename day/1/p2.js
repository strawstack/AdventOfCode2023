(() => {

    const p = (msg) => console.log(msg);

    function getDigits(line) {
        const digit = "0123456789".split("");
        const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        
        const first_digit = digit
            .map(d => { 
                return {digit: parseInt(d), pos: line.indexOf(d)} 
            })
            .filter(v => v.pos !== -1)
            .reduce(
                (a, c) => {
                    return (a.pos < c.pos) ? a : c;
                }
            );
        let first_word = {digit: null, pos: line.length};
        try {
            first_word = words
                .map((word, i) => { 
                    return {digit: i + 1, pos: line.indexOf(word)} 
                })
                .filter(v => v.pos !== -1)
                .reduce(
                    (a, c) => {
                        return (a.pos < c.pos) ? a : c;
                    }
                );
        } catch(e) {}

        const last_digit = digit
            .map(d => { 
                return {digit: parseInt(d), pos: line.lastIndexOf(d)} 
            })
            .filter(v => v.pos !== -1)
            .reduce(
                (a, c) => {
                    return (a.pos > c.pos) ? a : c;
                }
            );
        let last_word = {digit: null, pos: -1}; 
        try {
            last_word = words
                .map((word, i) => { 
                    return {digit: i + 1, pos: line.lastIndexOf(word)} 
                })
                .filter(v => v.pos !== -1)
                .reduce(
                    (a, c) => {
                        return (a.pos > c.pos) ? a : c;
                    }
                );
        } catch (e) {}

        const { digit: first } = (first_digit.pos < first_word.pos) ? first_digit : first_word;
        const { digit: last }  = (last_digit.pos > last_word.pos) ? last_digit : last_word;

        return first * 10 + last;
    }

    function sol(input) {
        let data = input.split("\n");
        data.pop();
        data = data.map(line => getDigits(line));
        return data.reduce(
            (a, c) => a + c
        );
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    solutions[1][2] = main;

})();