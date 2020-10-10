import axios from 'axios'
import * as ACTIONS from '../actions'

const BASE_URL = '/api/boards/'

export const fetchAllBoards = (token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_BOARD })
  axios
    .get(BASE_URL, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.GET_BOARDS, payload: { boards: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e } })
    })
}

export const fetchBoardById = (id, token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_BOARD })
  axios
    .get(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({
        type: ACTIONS.GET_BOARD_BY_ID,
        payload: { currBoard: res.data },
      })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e } })
    })
}

export const createNewBoard = (params, token) => (dispatch) => {
  dispatch({ type: ACTIONS.POST_REQUEST_BOARD })
  axios
    .post(BASE_URL, params, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.ADD_BOARD, payload: { board: res.data } })
    })
    .catch((e) => {
      if (e.message === 'Network Error')
        dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e } })
      else if (e.response.status === 422)
        dispatch({ type: ACTIONS.VALIDATION_ERROR_BOARD })
    })
}

export const updateBoardById = (id, params, token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_BOARD })
  axios
    .patch(BASE_URL + id, params, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.UPDATE_BOARD, payload: { board: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e.message } })
    })
}

export const deleteBoardById = (id, token) => (dispatch) => {
  axios
    .delete(BASE_URL + id, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.DELETE_BOARD, payload: { board: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_BOARD, payload: { error: e.message } })
    })
}

export const fetchListsFromBoard = (id, token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_LIST })
  axios
    .get(`${BASE_URL + id}/lists`, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.GET_LISTS, payload: { lists: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_LIST, payload: { error: e } })
    })
}

export const fetchsCardsFromBoard = (id, token) => (dispatch) => {
  dispatch({ type: ACTIONS.MAKE_REQUEST_CARD })
  axios
    .get(`${BASE_URL + id}/cards`, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({ type: ACTIONS.GET_CARDS, payload: { cards: res.data } })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_CARD, payload: { error: e.message } })
    })
}

export const fetchActivitiesFromBoard = (id, token) => (dispatch) => {
  axios
    .get(`${BASE_URL + id}/activities`, {
      headers: { 'x-auth-token': token },
    })
    .then((res) => {
      dispatch({
        type: ACTIONS.GET_ACTIVITIES,
        payload: { activities: res.data },
      })
    })
    .catch((e) => {
      dispatch({ type: ACTIONS.ERROR_ACTIVITY, payload: { error: e } })
    })
}
