import * as ACTIONS from '../actions/actions'

const initialState = {
    cardLoading: true,
    cards: []
}
export const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST_CARD:
            return { ...state, cardLoading: true }
        case ACTIONS.GET_CARDS:
            return { ...state, cardLoading: false, cards: action.payload.cards }
        case ACTIONS.ADD_CARD:
            return { ...state, cards: [...state.cards, action.payload.card] }
        case ACTIONS.UPDATE_CARD:
            const cardsCopy = [...state.cards]
            const targetIndex = cardsCopy.findIndex(card => card._id === action.payload.card._id)
            cardsCopy[targetIndex] = action.payload.card
            return { ...state, cards: cardsCopy, cardLoading: false }
        case ACTIONS.DELETE_CARD:
            const cardPrev = [...state.cards]
            const index = cardPrev.findIndex(card => card._id === action.payload.card._id)
            cardPrev.splice(index, 1)
            return { ...state, cards: cardPrev, cardLoading: false }
        case ACTIONS.ERROR_CARD:
            return { ...state, cardLoading: false, cardError: action.payload.error }
        default:
            return state
    }
}
