import ActionType from './constants/ActionType';

const defaultState = {
    KEY: 'data',
    data: [],
    completeNum: localStorage.getItem('num') || 0
};

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case ActionType.DATA:
        case ActionType.COMPLETE_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default reducer;