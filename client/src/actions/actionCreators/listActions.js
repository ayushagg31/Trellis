import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = 'http://localhost:1337/api/lists/'

export const createNewList = (params) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.POST_REQUEST_LIST })
        axios.post(BASE_URL, params)
            .then(res => {
                dispatch({ type: ACTIONS.ADD_LIST, payload: { list: res.data } })
            }).catch(e => {
                if (e.message === "Network Error")
                    dispatch({ type: ACTIONS.ERROR_LIST, payload: { error: e } })
                else if (e.response.status === 422)
                    dispatch({ type: ACTIONS.VALIDATION_ERROR_LIST })
            })
    }
}

export const updateListById = (id, params) => {
    return (dispatch) => {
        axios.patch(BASE_URL + id, params)
            .then(res => {
                dispatch({ type: ACTIONS.UPDATE_LIST, payload: { list: res.data } })
            }).catch(e => {
                dispatch({ type: ACTIONS.ERROR_LIST, payload: { error: e } })
            })
    }
}