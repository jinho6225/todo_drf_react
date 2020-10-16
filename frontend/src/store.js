import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { reducer, requestReducer } from './reducer'


const rootReducer = combineReducers({ reducer, requestReducer });

const store = createStore(rootReducer, applyMiddleware(thunk))
console.log(store, 'store')

export default store