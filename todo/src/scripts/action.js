import ActionType from './constants/ActionType';
import createAction from './constants/createAction';
import storage from './storage';

const saveData = (input, checked) => (dispatch, getState) => {
    storage.set(getState().KEY, input, checked)
    window.location.reload();
};

const getData = () => (dispatch, getState) => {
    let data = storage.get(getState().KEY);
    dispatch(createAction(ActionType.DATA, {
        data: data || []
    }));
};

const complete = bool => (dispatch, getState) => {
    const {completeNum} = getState();
    let result = completeNum;
    dispatch(createAction(ActionType.COMPLETE_DATA, {
        completeNum: bool ? ++result : --result
    }));
    localStorage.setItem('num', result);
};

const changeData = (value, checked) => (dispatch, getState) => {
    let data = storage.get(getState().KEY);
    data.forEach((item, index) => {
        if(item.data === value) {
            data.splice(index, 1, {data: value, checked: checked});
            localStorage.setItem(getState().KEY, JSON.stringify(data));
        }
    });
};

const deleteData = value => (dispatch, getState) => {
    storage.remove(getState().KEY, value);
    window.location.reload();
};

export {
    saveData,
    getData,
    complete,
    changeData,
    deleteData
}