const initialState = {
    cards: []
};

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NUMBER': {
            return {
                ...state,
                number: action.payload
            };
        }
        case 'SET_CARDS': {
            return {
                ...state,
                cards: [...action.payload]
            };
        }
        case 'REMOVE_CARD': {
            const newTasksLists = state.cards.filter((task) => task.id !== action.payload);
            return {
                ...state,
                cards: newTasksLists
            };
        }
        case 'ADD_CARD': {
            return {
                ...state,
                cards: [action.payload, ...state.cards]
            };
        }
        case 'MODIFY_TASK': {
            const modifiedTasks = state.cards.map( task => task.id===action.payload.id ? action.payload : task)
            return {
                ...state,
                cards: modifiedTasks
            };
        }
        case 'CHANGE_TASK_STATUS': {
            const modifiedTasks = state.cards.map( task => task.id===action.payload.id ? action.payload : task)
            return {
                ...state,
                cards: modifiedTasks
            };
        }
        default:
            return state;
    }
};

export default cardsReducer;
