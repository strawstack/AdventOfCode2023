(() => {

    // ranges: [{source, length}, ...]
    // map: {dest, source, ranges: [{dest, source, length}, ...]}
    // Convert each range using information in map
    // Returns: ranges converted to destination space
    function applyMap(ranges, map) {

        const map_ranges = map.ranges.sort((a, b) => a.source - b.source);

        if (map.source === "temperature") {
            debugger
        } 
        
        const dest_ranges = [];
        for (let {source: a, length: range_length} of ranges) {

            for (let {dest, source: c, length: map_length} of map_ranges) {

                const b = a + range_length - 1;
                const d = c + map_length - 1;

                // a---b
                //       c---d
                if (b < c) {
                    dest_ranges.push({source: a, length: range_length});
                    break;

                // a---b
                //    c---d
                } else if (a < c && b >= c && b < d) {
                    dest_ranges.push({source: a, length: c - a - 1});
                    dest_ranges.push({source: dest, length: b - c});
                    break;

                // a-------b
                //   c---d
                } else if (a < c && b > d) {
                    dest_ranges.push({source: a, length: c - a - 1});
                    dest_ranges.push({source: dest, length: map_length});
                    for (let res of applyMap([{source: d + 1, length: b - d}], map)) {
                        dest_ranges.push(res);
                    }
                    break;

                //   a---b
                // c-------d
                } else if (a >= c && b <= d) {
                    dest_ranges.push({source: dest + a - c, length: range_length});
                    break;

                //   a---b
                // c---d
                } else if (a >= c && a <= d && b > d) {
                    dest_ranges.push({source: dest + a - c, length: map_length - (a - c)});
                    for (let res of applyMap([{source: d + 1, length: b - d}], map)) {
                        dest_ranges.push(res);
                    }
                    break;
                }
            }
            
            // range is fully outside last map interval
            const last_map = map_ranges[map_ranges.length - 1];
            if (a > last_map.source) {
                dest_ranges.push({source: a, length: range_length});
            }
        }

        return dest_ranges;
    }

    function getLocations({seed_data, maps}) {
        let ranges = seed_data;
        for (let map of maps) {
            ranges = applyMap(ranges, map);
        }
        return ranges;
    }

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
        
        const seeds = data[0];
        const seed_data = [];
        for (let i = 0; i < data[0].length; i += 2) {
            seed_data.push({
                source: seeds[i],
                length: seeds[i + 1]
            });
        }

        const maps = data.slice(1, data.length).map(item_map => {
            const {source, dest} = item_map[0];
            return {
                source,
                dest,
                ranges: item_map.slice(1, item_map.length)
            }
        });

        const locations = getLocations({seed_data, maps});

        return locations.map(e => e.source)
            .reduce((a, c) => a < c ? a : c);
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
            //sol(input)
            sol(test_input)
        );
    }

    const DAY = 5;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();