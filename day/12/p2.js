(() => {

    const hash = (record_index, chunk_index) => {
        return JSON.stringify({
            r: record_index, 
            c: chunk_index
        });
    };

    let cache = {};

    function shouldCull(record_index, record, chunk_index, chunks) {
        let total_broken = 0;
        for (let i = record_index; i < record.length; i++) {
            if(record[i] === "#" || record[i] === "?") {
                total_broken += 1;
            }
        }
        let total_chunk = 0;
        for (let i = chunk_index; i < chunks.length; i++) {
            total_chunk += chunks[i];
        }
        return total_broken < total_chunk;
    }

    function verify_record(record, from_index, to_index) {

        if (to_index >= record.length) return false;
        
        for (let i = from_index; i <= to_index; i++) {
            if (record[i] === ".") {
                return false;
            }
        }

        if (to_index + 1 === record.length) return true;
        if (record[to_index + 1] === "#") return false;
        
        return true;
    }

    function search(record_index, record, chunk_index, chunks) {
        const record_value = record[record_index];
        const c_done = chunk_index === chunks.length;
        const r_done = record_index >= record.length;

        if (r_done) {
            return c_done ? 1 : 0;
        }

        /*
        if (shouldCull(record_index, record, chunk_index, chunks)) {
            return 0;
        } */

        if (record_value === ".") {
            const hh = hash(record_index + 1, chunk_index);
            if (hh in cache) return cache[hh];
            const value = search(record_index + 1, record, chunk_index, chunks);
            cache[hh] = value;
            return value;

        } else if (record_value === "#") {

            if (
                chunk_index < chunks.length &&
                verify_record(record, record_index, record_index + chunks[chunk_index] - 1)
            ) {
                const hh = hash(record_index + chunks[chunk_index] + 1, chunk_index + 1);
                if (hh in cache) return cache[hh];
                const value = search(
                    record_index + chunks[chunk_index] + 1,
                    record,
                    chunk_index + 1,
                    chunks
                );
                cache[hh] = value;
                return value;
            } else {
                return 0;

            }

        } else { // record_value === "?"
            let search_one = 0;
            const hh = hash(record_index + 1, chunk_index);
            if (hh in cache) {
                search_one = cache[hh];

            } else {
                search_one = search(record_index + 1, record, chunk_index, chunks);
                cache[hh] = search_one;
            }
            
            let search_two = 0;
            if (
                chunk_index < chunks.length &&
                verify_record(record, record_index, record_index + chunks[chunk_index] - 1)
            ) {
                const hh = hash(record_index + chunks[chunk_index] + 1, chunk_index + 1);
                if (hh in cache) {
                    search_two = cache[hh];

                } else {
                    search_two = search(
                        record_index + chunks[chunk_index] + 1,
                        record,
                        chunk_index + 1,
                        chunks
                    );
                    cache[hh] = search_two;
                }
            }
            
            return search_one + search_two;
        }
    }

    function calculate([record, chunks]) {

        const new_record = `${record}?${record}?${record}?${record}?${record}`;
        const new_chunks = [chunks, chunks, chunks, chunks, chunks].flat(1); 
        
        const record_index = 0;
        const chunk_index = 0;
        cache = {};
        const value = search(record_index, new_record, chunk_index, new_chunks);
        return value;
    }

    function sol(input) {
        
        Array.prototype.target = function (index, func) {
            this[index] = func(this[index]);
            return this;
        };
        
        let data = input.trim().split("\n")
            .map(line => line.split(" ")
                .target(1, lst => lst.split(",")
                    .map(n => parseInt(n)))
        )
        .map(calculate)

        return data.reduce((a, c) => a + c);
    }

const test_input = `?###???????? 3,2,1
`;

    function main(input) {
        console.log(
            sol(input)
            //sol(test_input)
        );
    }

    const DAY = 12;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();