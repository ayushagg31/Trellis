import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = '/api/user/'

export const fetchUserInfo = (token) => {
    return (dispatch) => {
        axios.get(BASE_URL, {
            headers: { 'x-auth-token': token }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_USER, payload: { user: res.data, token: token } })
        }).catch(e => {
            dispatch({ type: ACTIONS.ERROR_USER, payload: { error: e.message } })
        })
    }
}

export const checkTokenValidity = (token) => {
    return (dispatch) => {
        axios.post(BASE_URL + 'tokenIsValid', null, {
            headers: { 'x-auth-token': token }
        }).then(res => {
            dispatch({ type: ACTIONS.TOKEN_RESPONSE, payload: { isTokenValid: res.data, token } })
        }).catch(e => {
            dispatch({ type: ACTIONS.TOKEN_RESPONSE_ERROR, payload: { error: e.message } })
        })
    }
}

export const loginUser = (params) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOGIN_REQUEST })
        axios.post(BASE_URL + 'login', params)
            .then(res => {
                dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: { user: res.data } })
            }).catch(e => {
                dispatch({ type: ACTIONS.LOGIN_FAILED, payload: { error: e.response.data.msg } })
            })
    }
}

export const registerUser = (params) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.REGISTER_REQUEST })
        axios.post(BASE_URL + 'register', params)
            .then(res => {
                dispatch({ type: ACTIONS.REGISTER_SUCCESS, payload: { user: res.data } })
            }).catch(e => {
                dispatch({ type: ACTIONS.REGISTER_FAILED, payload: { error: e.response.data.msg } })
            })
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOGOUT_USER })
    }
}