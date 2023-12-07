(() => {

    function sol(input) {

        const card_value_lookup = {
            A: 12,
            K: 11,
            Q: 10,
            J: 9,
            T: 8,
            9: 7,
            8: 6,
            7: 5,
            6: 4,
            5: 3,
            4: 2,
            3: 1,
            2: 0
        };

        const parseHand = hand_info => {
            const card_fz = {};
            for (let c of hand_info) {
                if (!(c in card_fz)) {
                    card_fz[c] = 0;
                }
                card_fz[c] += 1;
            }
            const fz_card = {};
            for (let c in card_fz) {
                fz_card[card_fz[c]] = true;
            }
            return {
                data: hand_info, //.split("").sort((a, b) => card_value_lookup[b] - card_value_lookup[a]),
                card_fz,
                fz_card
            }
        };

        const getType = ({hand, bid}) => {
            const hand_types = [
                h => { // Five of a kind
                    return 5 in h.fz_card;
                },
                h => { // Four of a kind
                    return 4 in h.fz_card;
                },
                h => { // Full house
                    return 3 in h.fz_card && 2 in h.fz_card;
                },
                h => { // Three of a kind
                    return 3 in h.fz_card;
                },
                h => { // Two pair
                    return Object.values(h.card_fz).filter(v => v === 2).length === 2;
                },
                h => { // One Pair
                    return 2 in h.fz_card;
                }
            ];
            let value = 6;
            for (let hand_type of hand_types) {
                if (hand_type(hand)) {
                    return value;
                }
                value -= 1;
            }
            return value; // High card
        };

        const compare = (h1, h2) => {
            const t1 = getType(h1);
            const t2 = getType(h2);
            if (t1 < t2) {
                return -1;

            } else if (t1 > t2) {
                return 1;

            }

            for (let i = 0; i < 5; i++) {
                if (card_value_lookup[h1.hand.data[i]] < card_value_lookup[h2.hand.data[i]]) {
                    return -1;

                } else if (card_value_lookup[h1.hand.data[i]] > card_value_lookup[h2.hand.data[i]]) {
                    return 1;

                }
            }

            throw Error("should not get here");
        };

        let data = input.trim().split("\n")
            .map(line => line.split(" "))
            .map(info => {
                const [hand_info, bid_info] = info;
                return {
                    hand: parseHand(hand_info),
                    bid: parseInt(bid_info)
                }
            })
            .sort((a, b) => compare(a, b));

        return data.map(({hand, bid}, i) => bid * (i + 1)).reduce((a, c) => a + c);
    }

    const test_input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

    function main(input) {
        console.log(
            sol(input)
            //sol(test_input)
        );
    }

    const DAY = 7;
    const PART = 1;
    solutions[DAY][PART] = main;
    
})();