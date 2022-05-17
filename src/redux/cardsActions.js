export const setCards = (cards) => ({
    type: 'SET_CARDS',
    payload: cards,
});

export const removeCard = (id) => ({
    type: 'REMOVE_CARD',
    payload: id,
});

export const addCard = (newTask) => ({
    type: 'ADD_CARD',
    payload: newTask,
});

export const modifyTask = (modifiedTask) => ({
    type: 'MODIFY_TASK',
    payload: modifiedTask,
});

export const changeTaskStatus = (taskWithNewStatus) => ({
    type: 'CHANGE_TASK_STATUS',
    payload: taskWithNewStatus,
});
