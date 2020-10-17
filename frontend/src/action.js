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


//action creator function

export const setInputField = (text) => ({
    type: CHANGE_INPUT_FIELD,
    payload: text,
});

export const requestTodos = () => (dispatch) => {
    dispatch({ type: REQUEST_PENDING });
    fetch('http://127.0.0.1:8000/api/task-list/')
        .then((res) => res.json())
        .then((data) => {
            
            dispatch({ type: REQUEST_SUCCESS, payload: data })
            console.log('a')
        })
        .catch((err) => dispatch({ type: REQUEST_FAILED, payload: err }));
};

export const requestAddTodo = (title, csrftoken) => (dispatch) => {
    dispatch({ type: REQUEST_CREATE_TODO_PENDING });
    fetch('http://127.0.0.1:8000/api/task-create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ title }),
    })
    .then((res) => res.json())
    .then((data) => {
        
        dispatch({ type: REQUEST_CREATE_TODO_SUCCESS, payload: data })
        console.log('b')
    })
    .catch((err) => dispatch({ type: REQUEST_CREATE_TODO_FAILED, payload: err }));
};


// export const requestAddTodo = (title, csrftoken) => (dispatch) => {
//     dispatch({ type: REQUEST_CREATE_TODO_PENDING });
//     fetch('http://127.0.0.1:8000/api/task-create/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrftoken
//         },
//         body: JSON.stringify({ title }),
//     })
//     .then((res) => res.json())
//     .then((data) => dispatch({ type: REQUEST_CREATE_TODO_SUCCESS, payload: data }))
//     .catch((err) => dispatch({ type: REQUEST_CREATE_TODO_FAILED, payload: err }));
// };
