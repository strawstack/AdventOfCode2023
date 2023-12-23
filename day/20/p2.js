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

            }
            const inp = data.filter(x => x.out.includes(m.name));
            m.inputs = {};
            for (let i of inp) {
                m.inputs[i.name] = false;
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

        /*
        const show_in_out = () => {
            let res = [];
            res.push(
                `broadcaster => _ => ${mods["broadcaster"].out.join(", ")}`
            );
            for (let m of Object.values(mods).filter(x => x.type === "%")) {
                res.push(
                    `% ${m.name} <= ${Object.keys(m.inputs).join(", ")} => ${m.out.join(", ")}`
                );
            }
            res.push("\n");
            for (let m of Object.values(mods).filter(x => x.type === "&")) {
                res.push(
                    `& ${m.name} <= ${Object.keys(m.inputs).join(", ")} => ${m.out.join(", ")}`
                );
            }
            console.log(
                res.join("\n")
            );
        };
        show_in_out(); */

        // Create button and input field
        const btn = document.createElement("button");
        btn.innerHTML = "Step";
        btn.style.marginRight = "20px";

        const inf = document.createElement("input");
        inf.value = "1";

        const show = lst => {
            let rtn = [];
            for (let name of lst) {
                rtn.push(
                    (mods[name].on) ? "1" : "0" 
                );
            }
            console.log(`${lst.join(" ")}\n${rtn.join("  ")}\n`);
        };

        const update = () => {
            const fz = ["tx", "qn", "bt", "dn", "nm", "hn", "xn", "kb", "cr", "fl", "rq", "fn"];
            show(fz);

            const vd = ["nn", "zc", "ms", "tp", "hf", "qk", "zb", "gz", "vf", "nc", "sf", "xv"];
            show(vd);

            const pn = ["lz", "vq", "qz", "bh", "hq", "mh", "xp", "mq", "jd", "vx", "ds", "kz"];
            show(pn);

            const th = ["mj", "np", "fq", "xd", "gp", "cm", "fm", "hh", "dq", "dj", "sx", "xb"];
            show(th);

            console.log("=================================================")
        };

        btn.addEventListener("click", e => {
            const times = parseInt(inf.value, 10);
            for (let i = 0; i < times; i++) {
                button();
                update();
            }
        });

        document.body.appendChild(btn);
        document.body.appendChild(inf);
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
        sol(input)
    }

    const DAY = 20;
    const PART = 2;
    solutions[DAY][PART] = main;
    
})();