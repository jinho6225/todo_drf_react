import { 
    CHANGE_INPUT_FIELD,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED
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
