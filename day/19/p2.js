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

        const split_prop = ({lo, hi}, cmd, value) => {
            const res = [null, null];
            if (cmd === ">") {
                if (lo > value) {
                    return [{lo, hi}, null];

                } else if (hi <= value) {
                    return [null, {lo, hi}];

                } else {
                    return [
                        {lo: value + 1, hi},
                        {lo, hi: value}
                    ];
                }

            } else { // cmd === "<"
                if (hi < value) {
                    return [{lo, hi}, null];

                } else if (lo >= value) {
                    return [null, {lo, hi}];

                } else {
                    return [
                        {lo, hi: value - 1},
                        {lo: value, hi}
                    ];
                }
            }
        };

        const call_instruction = (label, part) => {
            if (part === null) return 0;

            if (label === "A") {
                const value = Object.values(part).reduce((a, c) => a * (c.hi - c.lo + 1), 1);
                return value;

            } else if (label === "R") {
                return 0;
            }

            let {name, rules: rule_lst} = rules[label];
            let total = 0;

            for (let rx of rule_lst) {
                if (rx.type === ">" || rx.type === "<") {
                    const [valid, invalid] = split_prop(part[rx.prop], rx.type, rx.value);
                    const vpart = {...part};
                    vpart[rx.prop] = valid;
                    total += call_instruction(rx.out, vpart);
                    if (invalid === null) break;
                    part[rx.prop] = invalid;

                } else if (rx.type === "out") {
                    total += call_instruction(rx.out, part);

                }
            }
            return total;
        };

        // TODO: Follow the set of rules like a tree. Final all leaves that are "A"
        // Determine the bounds placed on each prop when following a path to these leaves
        const total = call_instruction("in", {
            x: {lo: 1, hi: 4000},
            m: {lo: 1, hi: 4000},
            a: {lo: 1, hi: 4000},
            s: {lo: 1, hi: 4000}
        });

        return total;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 19;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();