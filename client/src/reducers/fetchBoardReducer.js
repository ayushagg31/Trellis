import * as ACTIONS from '../actions/actions'

const initialState = {
    loading: true,
    boards: [],
    currBoard: {}
}
export const fetchBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { ...state, loading: true }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, boards: action.payload.boards }
        case ACTIONS.GET_BOARD_BY_ID:
            return { ...state, loading: false, currBoard: action.payload.currBoard }
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, boards: [] }
        default:
            return state
    }
}
