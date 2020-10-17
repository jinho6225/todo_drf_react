import { 
    CHANGE_INPUT_FIELD,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    REQUEST_CREATE_TODO_PENDING,
    REQUEST_CREATE_TODO_FAILED,
    REQUEST_CREATE_TODO_SUCCESS,
    REQUEST_REMOVE_TODO_PENDING,
    REQUEST_REMOVE_TODO_FAILED,
    REQUEST_REMOVE_TODO_SUCCESS
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
    isAddTodoPending: false,
    error2: '',
    isRMVTodoPending: false,
    error3: '',
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
        case REQUEST_CREATE_TODO_PENDING:
            return {
                ...state, isAddTodoPending: true
            } 
        case REQUEST_CREATE_TODO_SUCCESS:
            return {
                ...state, todos: [...state.todos, action.payload], isAddTodoPending: false
            }
        case REQUEST_CREATE_TODO_FAILED:
            return Object.assign({}, state, {
                error2: action.payload,
                isAddTodoPending: false,
            });
        case REQUEST_REMOVE_TODO_PENDING:
            return {
                ...state, isRMVTodoPending: true
            } 
        case REQUEST_REMOVE_TODO_SUCCESS:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id),
                isRMVTodoPending: false
            }
        case REQUEST_REMOVE_TODO_FAILED:
            return Object.assign({}, state, {
                error3: action.payload,
                isRMVTodoPending: false,
            });            
        default:
            return state;
    }
}
