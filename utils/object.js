const isObject = (value) => value && typeof value === 'object' && value.constructor === Object;

const getData = (data, param) => {
    const elements = param.split('.');
    let output = data;
    elements.map((elem) => {
        output = output[elem];
    });

    return output;
};

const parse = (data) => {
    return data.reduce((acc, currentValue) => {
        if (currentValue.value) {
            const val = {label: currentValue.date, value: Number((currentValue.value).toFixed(2))};
            acc.push(val);
        }
        return acc;
    }, []);
};

export {
    isObject,
    getData,
    parse
}
