(() => {

    function sol(input) {

        Array.prototype.first = function (func) {
            this[0] = func(this[0]);
            return this;
        };

        Array.prototype.rest = function (func) {
            for (let i = 1; i < this.length; i++) {
                this[i] = func(this[i]);
            }
            return this;
        };

        let data = input.trim().split("\n\n")
            .first(seed_line => seed_line.split(": ")[1]
                .split(" ").map(seed_id => parseInt(seed_id))
            )
            .rest(item_map => item_map.split("\n")
                .first(name_line => {
                    const [source, a, dest, b] = name_line.split(/[- ]/);
                    return {source, dest};
                })
                .rest(item_map => {
                    const [dest, source, length] = item_map.split(" ").map(n => parseInt(n));
                    return {dest, source, length};
                })
            );
        
        const seed_data = data[0];

        const maps = data.slice(1, data.length).map(item_map => {
            const {source, dest} = item_map[0];
            return {
                source,
                dest,
                ranges: item_map.slice(1, item_map.length)
            }
        });

        return {seed_data, maps};
    }

    const test_input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

    function main(input) {
        console.log(
            sol(input)
            //sol(test_input)
        );
    }

    const DAY = 5;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();