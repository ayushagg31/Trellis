import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = '/api/lists/'

export const createNewList = (params, token) => (dispatch) => {
  dispatch({ type: ACTIONS.POST_REQUEST_LIST })
  axios
    .post(BASE_URL, params, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.ADD_LIST, payload: { list: res.data } })
    })
    .catch((e) => {
      if (e.message === 'Network Error')
        dispatch({ type: ACTIONS.ERROR_LIST, payload: { error: e } })
      else if (e.response.status === 422)
        dispatch({ type: ACTIONS.VALIDATION_ERROR_LIST })
    })
}

export const updateListById = (id, params) => (dispatch) => {
  axios
    .patch(BASE_URL + id, params)
    .then((res) => {
      dispatch({ type: ACTIONS.UPDATE_LIST, payload: { list: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_LIST, payload: { error: e } })
    })
}

export const deleteListById = (id) => (dispatch) => {
  axios
    .delete(BASE_URL + id)
    .then((res) => {
      dispatch({ type: ACTIONS.DELETE_LIST, payload: { list: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_LIST, payload: { error: e.message } })
    })
}
