(() => {

    function sol(input) {

        Array.prototype.target = function(index, func) {
            this[index] = func(this[index]);
            return this;
        };

        const boxes = [];
        for (let i = 0; i < 256; i++) {
            boxes.push([]);
        }

        function removeIfPresent(label, boxes, box) {
            let rem = null;
            for (let i = 0; i < boxes[box].length; i++) {
                if (boxes[box][i].label === label) {
                    rem = i;
                    break;
                }
            }

            if (rem !== null) {
                boxes[box].splice(rem, 1);
            }
        }

        function replaceOrAdd({label, op, focal, box}, boxes) {
            let swap = false;
            for (let i = 0; i < boxes[box].length; i++) {
                if (boxes[box][i].label === label) {
                    swap = true;
                    boxes[box][i] = {label, op, focal, box};
                    break;
                }
            }

            if (!swap) {
                boxes[box].push({label, op, focal, box});
            }
        }

        let answer = input.trim().split(",")
            .map(seq => {

                let op = null;
                let label = null;
                let focal = null;

                if (seq.indexOf("=") !== -1) {
                    op = "=";
                    [label, focal] = seq.split("=").target(1, n => parseInt(n));

                } else {
                    op = "-";
                    label = seq.slice(0, seq.length - 1);

                }

                let box = 0;
                for (let c of label) {
                    box += c.charCodeAt(0);
                    box *= 17;
                    box = box % 256;
                }

                return {
                    label,
                    op,
                    focal,
                    seq,
                    box
                };
            })
            .map(({label, op, focal, box}) => {

                if (op === "-") {
                    removeIfPresent(label, boxes, box);

                } else { // op === "="
                    replaceOrAdd({label, op, focal, box}, boxes, box);

                }

            });

        return boxes.map((lenses, box) => {
            return lenses.map(({focal}, slot) => {
                return (1 + box) * (1 + slot) * focal;
            });
        }).flat().reduce((a, c) => a + c);
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 15;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();