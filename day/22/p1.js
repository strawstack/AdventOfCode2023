(() => {

    function sol(input) {
        let z_min = Infinity;
        let z_max = -Infinity;
        let rects = input.trim().split("\n")
            .map((line, index) => line.split("~")
                .map(ns => {
                    const [x, y, z] = ns.split(",").map(n => parseInt(n));
                    z_min = Math.min(z_min, z);
                    z_max = Math.max(z_max, z);
                    return {x, y, z, uid: index};
                })
            );
        
        // List rects in order of bottom to top for ease of sliding
        rects = rects.sort((a, b) => a[1].z - b[1].z);

        // Enforce top left and bottom right in that order
        rects = rects.map(([r1, r2]) => {
            const uid = r1.uid;
            return [{
                x: Math.min(r1.x, r2.x), 
                y: Math.min(r1.y, r2.y),
                z: Math.max(r1.z, r2.z),
                uid, 
            },{
                x: Math.max(r1.x, r2.x), 
                y: Math.max(r1.y, r2.y),
                z: Math.min(r1.z, r2.z),
                uid,
            }]
        });

        const hits = ([r1, r2]) => {
            const other = rects.filter(([t1, t2]) => r2.z === t1.z && r1.uid !== t1.uid);
            let lst = [];
            for (let [t1, t2] of other) {
                if ((r1.x >= t1.x && r1.x <= t2.x) || (r2.x >= t1.x && r2.x <= t2.x)) {
                    if ((r1.y >= t1.y && r1.y <= t2.y) || (r2.y >= t1.y && r2.y <= t2.y)) {
                        lst.push(t1.uid);
                    }
                }
            }
            return lst;
        };

        const parents  = {};
        const children = {};

        const slide = ([r1, r2]) => {
            let count = 0;
            while (true) {
                r1.z -= 1;
                r2.z -= 1;
                count += 1;
                const lst = hits([r1, r2]);
                
                if (lst.length > 0) {
                    r1.z += 1;
                    r2.z += 1;
                    count -= 1;
                    const uid = r1.uid;
                    for (let t_uid of lst) {
                        if (!(t_uid in parents)) parents[t_uid] = {};
                        parents[t_uid][uid] = true;

                        if (!(uid in children)) children[uid] = {};
                        children[uid][t_uid] = true;
                    }
                    break;
                }
            }
            return count;
        };

        for (let i = 0; i < rects.length; i++) {
            const [r1, r2] = rects[i];
            const delta = slide([r1, r2]);
            rects[i].r1.z -= delta;
            rects[i].r2.z -= delta;
        }

        const safe_removal = rects.filter(([r1, r2]) => {
            const uid = r1.uid;
            if (!(uid in parents)) return true;
            for (let t_uid in parents[uid]) {
                if (Object.keys(children[t_uid]).length < 2) return false;
            }
            return true;
        });

        return safe_removal.length;
    }

    function main(input) {
        console.log(
            sol(input)
        );
    }

    const DAY = 22;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();