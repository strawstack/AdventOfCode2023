(() => {

    function sol(input) {
        let data = input.split("\n");
        data.pop();
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