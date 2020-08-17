import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = `${REACT_APP_HOME_URL}/api/activities/`


export const createNewActivity = (params) => {
    return (dispatch) => {
        axios.post(BASE_URL, params)
            .then(res => {
                dispatch({ type: ACTIONS.ADD_ACTIVITY, payload: { activity: res.data } })
            }).catch(e => {
                if (e.message === "Network Error")
                    dispatch({ type: ACTIONS.ERROR_ACTIVITY, payload: { error: e } })
                else if (e.response.status === 422)
                    dispatch({ type: ACTIONS.VALIDATION_ERROR_ACTIVITY })
            })
    }
}


export const deleteActivityById = (id) => {
    return (dispatch) => {
        axios.delete(BASE_URL + id)
            .then(res => {
                dispatch({ type: ACTIONS.DELETE_ACTIVITY, payload: { activity: res.data } })
            }).catch(e => {
                dispatch({ type: ACTIONS.ERROR_ACTIVITY, payload: { error: e } })
            })
    }
}