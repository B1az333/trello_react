import { ADD_CARD, CHANGE_TASK_STATUS, MODIFY_TASK, REMOVE_CARD, SET_CARDS, SET_LOADED_CARDS } from "./cardsActions";

const initialState = {
    cards: [], 
    isLoadedCards: false
};

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARDS: {
            return {
                ...state,
                cards: action.payload,
                isLoadedCards: true
            };
        }
        case REMOVE_CARD: {
            const newTasksLists = state.cards.filter((task) => task.id !== action.payload);
            return {
                ...state,
                cards: newTasksLists
            };
        }
        case ADD_CARD: {
            return {
                ...state,
                cards: [action.payload, ...state.cards]
            };
        }
        case MODIFY_TASK: {
            const modifiedTasks = state.cards.map( task => task.id === action.payload.id ? action.payload : task)
            return {
                ...state,
                cards: modifiedTasks
            };
        }
        case CHANGE_TASK_STATUS: {
            const modifiedTasks = state.cards.map( task => task.id===action.payload.id ? action.payload : task)
            return {
                ...state,
                cards: modifiedTasks
            };
        }
        case SET_LOADED_CARDS: {
            return {
                ...state,
                isLoadedCards: action.payload,
            };
        }
        default:
            return state;
    }
};

export default cardsReducer;
