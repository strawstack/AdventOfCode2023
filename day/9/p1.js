(() => {

    function diffList(lst) {
        let again = false;
        const diff_list = [];
        for (let i = 0; i < lst.length - 1; i++) {
            const value = lst[i + 1] - lst[i];
            if (value != 0) again = true;
            diff_list.push(value);
        }
        let others = [];
        if (again) {
            others = diffList(diff_list);
        }
        return [
            lst,
            ...others
        ];
    }

    function getNext(diff_list) {
        const last_list = diff_list.length - 1;
        let prev = diff_list[last_list][diff_list[last_list].length - 1];
        for (let i = diff_list.length - 2; i >= 0; i--) {
            const last_index = diff_list[i].length - 1;
            const last_value = diff_list[i][last_index];
            prev = last_value + prev;
        }
        return prev;
    }

    function sol(input) {
        let data = input.trim().split("\n")
            .map(line => line.split(" ").map(n => parseInt(n, 10))
        )
        .map(lst => diffList(lst))
        .map(diff_list => getNext(diff_list));

        return data.reduce((a, c) => a + c);
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 9;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();