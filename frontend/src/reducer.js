import { 
    CHANGE_INPUT_FIELD,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    REQUEST_CREATE_TODO_PENDING,
    REQUEST_CREATE_TODO_FAILED,
    REQUEST_CREATE_TODO_SUCCESS
} from './const'

const initialStateInput = {
    title: '',
};
export const reducer = (state = initialStateInput, action) => {
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
export const requestReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REQUEST_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_SUCCESS:
            return {
                ...state, todos: action.payload, isPending: false
            }     
        case REQUEST_FAILED:
            return Object.assign({}, state, {
                error: action.payload,
                isPending: false,
            });
        default:
            return state;
    }
}
const initialAddTodoState = {
    isAddTodoPending: false,
    todos: [],
    error2: '',
};
export const requestAddTodoReducer = (state = initialAddTodoState, action = {}) => {
    switch (action.type) {
        case REQUEST_CREATE_TODO_PENDING:
            return {
                ...state, isAddTodoPending: true
            } 
            // Object.assign({}, state, { isPending: true });
        case REQUEST_CREATE_TODO_SUCCESS:
            return {
                ...state, todos: action.payload, isAddTodoPending: false
            }
            // Object.assign({}, state, {
            //     todos: action.payload,
            //     isPending: false,
            // });
        case REQUEST_CREATE_TODO_FAILED:
            return Object.assign({}, state, {
                error2: action.payload,
                isAddTodoPending: false,
            });
        default:
            return state;
    }
}
