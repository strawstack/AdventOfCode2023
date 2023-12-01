const assert = (data, match) => {
    const error = new Error(`assert fails: data: ${JSON.stringify(data)} and match: ${JSON.stringify(match)}`);
    if (Object.keys(data).length !== Object.keys(match).length) {
        throw error;
    }
    for (let key in match) {
        if (!(key in data)) throw error;
    }
};
