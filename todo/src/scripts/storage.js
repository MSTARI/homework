const get = (key) => {
    let getData = localStorage.getItem(key);
    if (!getData) {
        return [];
    }
    return JSON.parse(getData);
};

const set = (key, value, checked) => {
    let getData = get(key);
    let result = {
        data: value,
        checked: checked
    }
    if (getData) {
        getData.push(result);
        localStorage.setItem(key, JSON.stringify(getData));
    } else {
        localStorage.setItem(key, JSON.stringify([result]));
    }
};

const remove = (key, value) => {
    let getData = get(key);
    getData.forEach((item, index) => {
        if(item.data === value) {
            getData.splice(index, 1);
            localStorage.setItem(key, JSON.stringify(getData));
        }
    });
};

const clear = (key) => {
    localStorage.removeItem(key);
};

export default {
    get,
    set,
    remove,
    clear
};