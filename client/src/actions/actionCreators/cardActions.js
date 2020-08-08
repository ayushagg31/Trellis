import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = 'http://localhost:1337/api/cards/'


export const createNewCard = (params) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.POST_REQUEST })
        axios.post(BASE_URL, params)
            .then(res => {
                dispatch({ type: ACTIONS.CARD_ADDED })
            }).catch(e => {
                if (e.message === "Network Error")
                    dispatch({ type: ACTIONS.ERROR })
                else if (e.response.status === 422)
                    dispatch({ type: ACTIONS.VALIDATION_ERROR })
            })
    }
}