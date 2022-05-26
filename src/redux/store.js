import { legacy_createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import cardsReducer from './cards/reducer';
import statusesReducer from './statuses/reducer';
import loginReducer from './login/reducer';

const rootReducer = combineReducers({
    cardsStorage: cardsReducer,
    statusesStorage: statusesReducer,
    loginStorage: loginReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;