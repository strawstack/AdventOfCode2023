(() => {

    function useMap(number, map) {
        for (let { dest, source, length } of map.ranges) {
            if (number >= source && number < source + length) {
                let offset = number - source;
                return dest + offset; 
            }
        }
        return number;
    }

    function findLocations(seed_data, maps) {
        let locations = [];
        seed_data.map(seed_id => {
            let number = seed_id;
            for (let map of maps) {
                number = useMap(number, map);
            }
            locations.push(number);
        });
        return locations;
    }

    function sol(input) {

        Array.prototype.target = function (index, func) {
            this[index] = func(this[index]);
            return this;
        };

        const grabNames = data => {
            return [data[0], data[2]];
        };

        let data = input.trim().split("\n\n");
        let seed_data = data[0].split(" ");
        seed_data = seed_data.slice(1, seed_data.length).map(n => parseInt(n));
        
        data = data.slice(1, data.length)
            .map(itemMap => itemMap.split("\n")
                .target(0, name_data => grabNames(name_data.split(/[- ]/)))
            )

        const maps = [];
        for (let map of data) {
            const [source, dest] = map[0];
            const ranges = map.slice(1, map.length).map(line => {
                const [dest, source, length] = line.split(" ").map(n => parseInt(n));
                return { dest, source, length };
            });
            maps.push({
                source,
                dest,
                ranges
            });
        }

        const locations = findLocations(seed_data, maps);

        return locations.reduce((a, c) => a < c ? a : c);
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
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();