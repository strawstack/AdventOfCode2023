(() => {

    function sol(input) {
        let data = input.trim().split("\n")
            .map(line => {
                const [module_data, out_lst] = line.split(" -> ");
                let name = module_data.slice(1, module_data.length);
                let type = module_data[0];
                if (!(type === "%" || type === "&")) {
                    name = "broadcaster";
                    type = "broadcaster";
                }
                
                const out = out_lst.split(", ");
                return { name, type, out };
            });

        const mods = {};
        for (let m of data) {
            if (m.type === "%") { // flip-flop
                m.on = false;

            } else {
                const inp = data.filter(x => x.out.includes(m.name));
                m.inputs = {};
                for (let i of inp) {
                    m.inputs[i.name] = false;
                }
            }
            mods[m.name] = m;
        }

        const calculate = (mod, pulse) => {
            if (mod.type === "broadcaster") {
                return pulse;

            } else if (mod.type === "%") { // flip-flop
                if (!pulse) {
                    mod.on = !mod.on;
                    return mod.on;
                } else {
                    return null;
                }

            } else { // mod.type === "&"
                if (Object.values(mod.inputs).every(x => x)) {
                    return false;
                } else {
                    return true;
                }
            }
        };

        let lo = 0;
        let hi = 0;

        const button = () => {
            lo += 1;
            let lst = [{ pulse: false, name: "broadcaster" }];
            let res = [];
            
            while (lst.length > 0) {
                for (let { pulse, name } of lst) {
                    if (!(name in mods)) continue;
                    const mod = mods[name];
                    const result = calculate(mod, pulse);
                    if (result !== null) {
                        for (let out of mod.out) {

                            if (result) {
                                hi += 1;
                            } else {
                                lo += 1;
                            }

                            res.push({ pulse: result, name: out });

                            if (out in mods && "inputs" in mods[out]) { // & remember most recent pulse
                                mods[out]["inputs"][mod.name] = result;
                            }
                        }
                    }
                }
                while (lst.length > 0) lst.pop();
                for (let item of res) lst.push(item);
                while (res.length > 0) res.pop();
            }
        };

        let times = 1000;
        while (times > 0) {
            button();
            times -= 1;
        }

        return lo * hi;
    }

const test1 = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`;

const test2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`;

    function main(input) {
        console.log(
            //sol(test1)
            //sol(test2)
            sol(input)
        );
    }

    const DAY = 20;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();