import { legacy_createStore, compose, applyMiddleware, combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    cardsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;