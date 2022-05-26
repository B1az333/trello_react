import { SET_LOADED_STATUSES, SET_STATUSES } from "./actions";

const initialState = {
    statuses: [],
    isLoadedStatuses: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUSES: {
            return {
                ...state,
                statuses: action.payload,
                isLoadedStatuses: true,
            };
        }
        case SET_LOADED_STATUSES: {
            return {
                ...state,
                isLoadedStatuses: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
