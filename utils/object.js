import {measure} from "./distance";

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

const filterData = (data, filterBy, queryValue, method = 'like') => {
    let ret = [];
    switch (method) {
        case 'like': {
            ret = data.filter(element => element[filterBy].toUpperCase().indexOf(queryValue.toUpperCase()) >= 0);
        }
            break;

        case 'distance': {
            const compare = 70000;
            ret = data.filter(element => measure(element[filterBy[0]], element[filterBy[1]], queryValue[0], queryValue[1]) <= compare);
        }
    }
    return ret;
};

export {
    isObject,
    getData,
    parse,
    filterData
}
