import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

export const CHANGE_INPUT_FIELD = 'CHANGE_INPUT_FIELD'
export const REQUEST_PENDING = 'REQUEST_PENDING';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const setInputField = (text) => ({
    type: CHANGE_INPUT_FIELD,
    payload: text,
});

export const requestTodos = () => (dispatch) => {
    dispatch({ type: REQUEST_PENDING });
    fetch('http://127.0.0.1:8000/api/task-list/')
      .then((res) => res.json())
      .then((data) => dispatch({ type: REQUEST_SUCCESS, payload: data }))
      .catch((err) => dispatch({ type: REQUEST_FAILED, payload: err }));
};

const initialStateInput = {
    title: '',
};
const reducer = (state = initialStateInput, action) => {
    switch (action.type) {
        case CHANGE_INPUT_FIELD:
            return { title: action.payload }
        default:
            return state
    }
}

const initialState = {
    isPending: false,
    todos: [],
    error: '',
};

const requestReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_SUCCESS:
            return Object.assign({}, state, {
                todos: action.payload,
                isPending: false,
            });
        case REQUEST_FAILED:
            return Object.assign({}, state, {
                error: action.payload,
                isPending: false,
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({ reducer, requestReducer });

const store = createStore(rootReducer, applyMiddleware(thunk))
console.log(store, 'store')

export default store