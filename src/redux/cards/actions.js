import { CardsRequests } from "../../services";

export const SET_CARDS = 'SET_CARDS';
export const REMOVE_CARD = 'REMOVE_CARD';
export const ADD_CARD = 'ADD_CARD';
export const MODIFY_TASK = 'MODIFY_TASK';
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
export const SET_LOADED_CARDS = 'SET_LOADED_CARDS';

export const setCards = (cards) => ({
    type: SET_CARDS,
    payload: cards,
});

export const removeCard = (id) => ({
    type: REMOVE_CARD,
    payload: id,
});

export const addCard = (newTask) => ({
    type: ADD_CARD,
    payload: newTask,
});

export const modifyTask = (modifiedTask) => ({
    type: MODIFY_TASK,
    payload: modifiedTask,
});

export const changeTaskStatus = (taskWithNewStatus) => ({
    type: CHANGE_TASK_STATUS,
    payload: taskWithNewStatus,
});

export const fetchCards = () => async (dispatch) => {
    dispatch({
        type: SET_LOADED_CARDS,
        payload: false,
    });

    const responseCards = await CardsRequests.loadAllCards();
	dispatch(setCards(responseCards.reverse()));
};

export const fetchRemoveCard = (id) => async (dispatch) => {
    await CardsRequests.deleteCard(id);
    dispatch(removeCard(id));
};

export const fetchModifyTask = (id, title, description) => async (dispatch) => {
    const modifiedCard = await CardsRequests.updateCard(id, title, description);
	dispatch(modifyTask(modifiedCard));
};

export const fetchAddCard = (title, description, status) => async (dispatch) => {
    const newCard = await CardsRequests.addCard(title, description, status);
	dispatch(addCard(newCard));
};

export const fetchMoveCardLeft = ({id, status}, statusTypes) => async (dispatch) => {
    const idStatus = statusTypes.findIndex((statusType) => statusType === status);
    const newStatus = idStatus !== 0 ? statusTypes[idStatus - 1] : statusTypes[0];
    const result = await CardsRequests.updateStatusCard(id, newStatus);
    dispatch(changeTaskStatus(result));
};

export const fetchMoveCardRight = ({id, status}, statusTypes) => async (dispatch) => {
    const idStatus = statusTypes.findIndex((statusType) => statusType === status);
    const newStatus = idStatus !== statusTypes.length - 1 ? statusTypes[idStatus + 1] : statusTypes[statusTypes.length - 1];
    const result = await CardsRequests.updateStatusCard(id, newStatus);
    dispatch(changeTaskStatus(result));
};

