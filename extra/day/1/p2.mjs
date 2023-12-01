import fs from 'fs';

function sol(input) {

    const symb = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
    ];

    console.log(
        input
            .map(line => symb
                .map((s, i) => [
                    {d: (i % 9) + 1, p: line.indexOf(s)},
                    {d: (i % 9) + 1, p: line.lastIndexOf(s)}
                ])
                .flat()
                .filter(e => e.p !== -1)
                .sort((a, b) => a.p - b.p)
            )
            .map(plist => plist[0].d * 10 + plist[plist.length - 1].d)
            .reduce((a, c) => a + c)
    );
}

const input = fs.readFileSync('input.txt').toString('utf-8').trim().split('\n');
sol(input);


