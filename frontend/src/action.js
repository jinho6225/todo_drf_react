import { 
    CHANGE_INPUT_FIELD,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED
} from './const'

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