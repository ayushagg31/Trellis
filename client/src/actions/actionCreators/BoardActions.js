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