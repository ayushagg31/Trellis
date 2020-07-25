import { useReducer, useCallback } from 'react'
import axios from 'axios'


const ACTIONS = {
    POST_REQUEST: 'post-request',
    GET_RESP: 'get-response',
    ERROR: 'error',
    VALIDATION_ERROR: 'validation-error'
}


const BASE_URL = 'http://localhost:1337/api/boards'

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.POST_REQUEST:
            return state
        case ACTIONS.GET_RESP:
            return { success: true, validationError: false }
        case ACTIONS.ERROR:
            return { success: false, validationError: false }
        case ACTIONS.VALIDATION_ERROR:
            return { success: false, validationError: true }
        default:
            return state
    }
}

export default function useCreateBoard(payload) {
    const [state, dispatch] = useReducer(reducer, { success: false, validationError: false })
    const executePostReq = useCallback(
        () => {
            console.log(payload)
            dispatch({ type: ACTIONS.POST_REQUEST })
            axios.post(BASE_URL, payload)
                .then(res => {
                    console.log(res.status)
                    dispatch({ type: ACTIONS.GET_RESP })
                }).catch(e => {
                    if (e.message === "Network Error")
                        dispatch({ type: ACTIONS.ERROR })
                    else if (e.response.status === 422)
                        dispatch({ type: ACTIONS.VALIDATION_ERROR })
                })
        },
        [payload])
    return {
        executePostReq,
        success: state.success,
        validationError: state.validationError
    }
}
