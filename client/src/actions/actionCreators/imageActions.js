import axios from 'axios'
import * as ACTIONS from '../actions'

const page = Math.floor(Math.random() * 100) + 1
const query = 'landscape'
const BASE_URL = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${process.env.REACT_APP_CLIENT_KEY}`

export const fetchImages = () => {
    return (dispatch) => {
        axios.get(BASE_URL)
            .then(res => {
                dispatch({ type: ACTIONS.GET_URLS, payload: { images: res.data.results } })
            })
    }
}