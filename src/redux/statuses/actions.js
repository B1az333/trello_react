import { StatusRequest } from "../../services";

export const SET_STATUSES = 'SET_STATUSES';
export const SET_LOADED_STATUSES = 'SET_LOADED_STATUSES';


export const setStatuses = (payload) => ({
    type: SET_STATUSES,
    payload,
});

export const setLoadedStatuses = (payload) => ({
    type: SET_LOADED_STATUSES,
    payload,
});

export const fetchStatuses = () => async (dispatch) => {
    dispatch(setLoadedStatuses(false));

    const responseStatuses = await StatusRequest.loadStatuses();
	dispatch(setStatuses(responseStatuses));
};
