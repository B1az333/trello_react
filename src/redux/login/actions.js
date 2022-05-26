import { UserRequests } from "../../services";
import UserStorage from "../../utils/UserStorage";

export const SET_LOGINED = 'SET_LOGINED';
export const SET_UNLOGINED = 'SET_UNLOGINED';

export const setLogined = () => ({
    type: SET_LOGINED,
});

export const setUnlogined = () => ({
    type: SET_UNLOGINED,
});

export const fetchLogin = (identifier, password) => async (dispatch) => {
    try {
        const { jwt, user } = await UserRequests.login(identifier, password);
        UserStorage.setUser(jwt, user.userName);
        dispatch(setLogined());

    } catch (error) {
        console.error('No such user!');
        alert('Invalid login or password');
    }
};

export const fetchRegister = (username, email, password) => async (dispatch) => {
    try {
        const { jwt, user } = await UserRequests.registration(username, email, password);
        UserStorage.setUser(jwt, user.userName);
        dispatch(setLogined());
    } catch (error) {
        console.error('Something went wrong. Try again');
        alert('Something went wrong. Try again');
    }
};