import { createStore } from 'redux'

const CHANGE_INPUT_FIELD = 'CHANGE_INPUT_FIELD'

export const setInputField = (text) => ({
    type: CHANGE_INPUT_FIELD,
    payload: text,
});


const reducer = (state = '', action) => {
    console.log(state, 'state', action)
    switch (action.type) {
        case CHANGE_INPUT_FIELD:
            return action.payload
        default:
            return state
    }
}


const store = createStore(reducer)
console.log(store)

export default store