import axios from 'axios'
import * as ACTIONS from '../actions'


const page = Math.floor(Math.random() * 100) + 1
const query = 'landscape'
const BASE_URL = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=SZJuHTFL-JO31E435i4CZOuyZLlbnX1SZyiPkF3kE2Q`

export const fetchImages = () => {
    return (dispatch) => {
        axios.get(BASE_URL)
            .then(res => {
                dispatch({ type: ACTIONS.GET_URLS, payload: { images: res.data.results } })
            })
    }
}