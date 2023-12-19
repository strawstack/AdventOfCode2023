(() => {

    function sol(input) {
        const [rule_data, part_data] = input.trim().split("\n\n");

        // pdx{m>2383:A,s>3758:A,m>1180:R,A}
        const rules_lst = rule_data.split("\n")
            .map(line => {
                line = line.slice(0, line.length - 1);
                const [name, data] = line.split("{");
                const rules = data.split(",")
                    .map(rule => {
                        if (rule.indexOf(">") !== -1) {
                            const [prop, second] = rule.split(">");
                            const [value, out] = second.split(":");
                            return {
                                type: ">",
                                prop,
                                value: parseInt(value, 10),
                                out
                            };
                        } else if (rule.indexOf("<") !== -1) {
                            const [prop, second] = rule.split("<");
                            const [value, out] = second.split(":");
                            return {
                                type: "<",
                                prop,
                                value: parseInt(value, 10),
                                out
                            };
                        } else {
                            return {
                                type: "out",
                                out: rule
                            };
                        }
                    });
                return {
                    name,
                    rules
                };
            });
        
        const rules = {};
        for (let rule of rules_lst) {
            rules[rule.name] = rule;
        }
        
        // {x=1158,m=2173,a=516,s=1837}
        const part_lst = part_data.split("\n")
            .map(line => {
                line = line.slice(1, line.length - 1);
                const part = {};
                line.split(",")
                    .map(prop_data => {
                        const [prop, value] = prop_data.split("=");
                        part[prop] = parseInt(value, 10);
                    });
                return part;
            });

        const call_instruction = (instruction, part) => {
            let {name, rules} = instruction;
            for (let rx of rules) {
                if (rx.type === ">") {
                    if (part[rx.prop] > rx.value) {
                        return rx.out;
                    }

                } else if (rx.type === "<") {
                    if (part[rx.prop] < rx.value) {
                        return rx.out;
                    }

                } else if (rx.type === "out") {
                    return rx.out;

                }
            }
        };

        const process_part = part => {
            let instruction = rules.in;
            while (true) {
                const res = call_instruction(instruction, part);
                if (res === "A") {
                    return true;

                } else if (res === "R") {
                    return false;

                } else {
                    instruction = rules[res];

                }
            }
        };

        let total = 0;
        for (let part of part_lst) {
            if (process_part(part)) {
                total += Object.values(part).reduce((a, c) => a + c);
            }
        }

        return total;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 19;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();