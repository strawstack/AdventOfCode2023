(() => {

    function sol(input) {
        let data = input.trim().split("\n");
        return data;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = DAY_NUMBER;
    const PART = PART_NUMBER;
    solutions[DAY][PART] = main;
    
})();