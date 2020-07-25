import { useReducer, useEffect } from 'react'
import axios from 'axios'


const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    GET_DATA_BY_ID: 'get-data-by-id',
    ERROR: 'error',
}


const BASE_URL = 'http://localhost:1337/api/boards/'

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { ...state, loading: true }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, boards: action.payload.boards }
        case ACTIONS.GET_DATA_BY_ID:
            return { ...state, loading: false, board: action.payload.board }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, boards: [] }
        default:
            return state
    }
}

export default function useFetchBoards(params) {
    const [state, dispatch] = useReducer(reducer, { loading: true, boards: [] })
    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BASE_URL, {
            cancelToken: cancelToken.token
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { boards: res.data } })
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })
        return () => {
            cancelToken.cancel()
        }
    }, [])

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        if (params) {
            axios.get(BASE_URL + params, {
                cancelToken: cancelToken1.token,
            }).then(res => {
                dispatch({ type: ACTIONS.GET_DATA_BY_ID, payload: { board: res.data } })
            }).catch(e => {
                if (axios.isCancel(e)) return
                dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
            })
        }
        return () => {
            cancelToken1.cancel()
        }
    }, [params])


    return state
}
