(() => {

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

        if (record_value === ".") {
            return search(record_index + 1, record, chunk_index, chunks);

        } else if (record_value === "#") {

            if (
                chunk_index < chunks.length &&
                verify_record(record, record_index, record_index + chunks[chunk_index] - 1)
            ) {
                return search(
                    record_index + chunks[chunk_index] + 1,
                    record,
                    chunk_index + 1,
                    chunks
                );
            } else {
                return 0;

            }

        } else { // record_value === "?"
            const search_one = search(record_index + 1, record, chunk_index, chunks);
            
            let search_two = 0;
            if (
                chunk_index < chunks.length &&
                verify_record(record, record_index, record_index + chunks[chunk_index] - 1)
            ) {
                search_two = search(
                    record_index + chunks[chunk_index] + 1,
                    record,
                    chunk_index + 1,
                    chunks
                );
            }

            return search_one + search_two;
        }
    }

    function calculate([record, chunks]) {
        const record_index = 0;
        const chunk_index = 0;
        //debugger
        const value = search(record_index, record, chunk_index, chunks);
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
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();