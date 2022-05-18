import UserStorage from "../utils/UserStorage";
import { SET_LOGINED, SET_UNLOGINED } from "./loginActions";

const initialState = {
    isLogined: UserStorage.hasToken(),
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGINED: {
            return {
                ...state,
                isLogined: true,
            };
        }
        case SET_UNLOGINED: {
            UserStorage.removeUser();
            return {
                ...state,
                isLogined: false,
            };
        }
        default:
            return state;
    }
};

export default loginReducer;