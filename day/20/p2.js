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

                            if (out === "rx" && !result) {
                                return true;
                            }

                            //console.log(`pulse: ${result}, name: ${out}`);
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
            return false;
        };

        let prev = 0;
        const show = (mods, btn) => {
            /*
            const flipflop = Object.values(mods).filter(m => m.type === "%");
            const conv = Object.values(mods).filter(m => m.type === "&");
            let ff = [];
            for (let {name, on} of flipflop) {
                //ff.push(`${name}: ${(on) ? "1" : "0"}`);
                ff.push(`${(on) ? "1" : "0"}`);
            }
            console.log(ff.join("")); */

            /*
            let out = [];
            for (let t of ["rz", "lf", "br", "fk"]) {
                const value = !Object.values(mods[t].inputs).every(x => x);
                out.push(`${t}: ${(value) ? "1" : "0"}`);
            }
            out.push("\n");
            console.log(out.join("\n")); */

            const bs = lst => {
                let out = [];
                for (let t of lst) {
                    const value = mods[t].on;
                    out.push(`${(value) ? "1" : "0"}`);
                }
                return out.join("");
            };

            const allOnes = value => value.indexOf("0") === -1;

            //const b1 = bs(["tx", "qn", "bt", "dn"]);
            const b1 = bs(["hn", "xn", "kb", "cr", "fl", "rq", "fn"]);
            if (allOnes(b1)) {
                console.log(btn - prev);
                prev = btn;
            }
            
        };

        let count = 100000;
        let btn = 0;
        while (count > 0) {
            btn += 1;
            const res = button();
            show(mods, btn);
            if (res) break;
            count -= 1;
        }

        return {btn, count};
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
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();