// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import locationReducer from './Components/Main/reducer'; 

const rootReducer = combineReducers({
  locationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
