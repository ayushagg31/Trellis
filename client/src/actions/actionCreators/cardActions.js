import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = '/api/cards'


export const createNewCard = (params) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.POST_REQUEST_CARD })
        axios.post(BASE_URL, params)
            .then(res => {
                dispatch({ type: ACTIONS.ADD_CARD, payload: { card: res.data } })
            }).catch(e => {
                if (e.message === "Network Error")
                    dispatch({ type: ACTIONS.ERROR_CARD, payload: { error: e.message } })
                else if (e.response.status === 422)
                    dispatch({ type: ACTIONS.VALIDATION_ERROR_CARD })
            })
    }
}

export const updateCardById = (id, params) => {
    return (dispatch) => {
        axios.patch(BASE_URL + id, params)
            .then(res => {
                dispatch({ type: ACTIONS.UPDATE_CARD, payload: { card: res.data } })
            }).catch(e => {
                dispatch({ type: ACTIONS.ERROR_CARD, payload: { error: e.message } })
            })
    }
}

export const deleteCardById = (id) => {
    return (dispatch) => {
        axios.delete(BASE_URL + id)
            .then(res => {
                dispatch({ type: ACTIONS.DELETE_CARD, payload: { card: res.data } })
            }).catch(e => {
                dispatch({ type: ACTIONS.ERROR_CARD, payload: { error: e.message } })
            })
    }
}