import * as ACTIONS from '../actions/actions'

const initialState = {
    cardLoading: true,
    cards: []
}
export const fetchCardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { ...state, cardLoading: true }
        case ACTIONS.GET_CARDS:
            return { ...state, cardLoading: false, cards: action.payload.cards }
        case ACTIONS.ERROR:
            return { ...state, cardLoading: false, cardError: action.payload.error, cards: [] }
        default:
            return state
    }
}
