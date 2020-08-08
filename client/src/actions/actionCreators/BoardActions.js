import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = 'http://localhost:1337/api/boards/'
export const fetchAllBoards = () => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BASE_URL).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { boards: res.data } })
        }).catch(e => {
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })
    }
}

export const fetchBoardById = (id) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BASE_URL + id).then(res => {
            dispatch({ type: ACTIONS.GET_BOARD_BY_ID, payload: { currBoard: res.data } })
        }).catch(e => {
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })
    }
}

export const createNewBoard = (params) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.POST_REQUEST })
        axios.post(BASE_URL, params)
            .then(res => {
                dispatch({ type: ACTIONS.GET_RESPONSE })
            }).catch(e => {
                if (e.message === "Network Error")
                    dispatch({ type: ACTIONS.ERROR })
                else if (e.response.status === 422)
                    dispatch({ type: ACTIONS.VALIDATION_ERROR })
            })
    }
}

export const fetchListsFromBoard = (id) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BASE_URL + id + '/lists')
            .then(res => {
                dispatch({ type: ACTIONS.GET_LISTS, payload: { lists: res.data } })
            }).catch(e => {
                dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
            })
    }
}

export const fetchsCardsFromBoard = (id) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BASE_URL + id + '/cards')
            .then(res => {
                dispatch({ type: ACTIONS.GET_CARDS, payload: { cards: res.data } })
            }).catch(e => {
                dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
            })
    }
}