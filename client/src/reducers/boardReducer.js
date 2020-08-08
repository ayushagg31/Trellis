import * as ACTIONS from '../actions/actions'

const initialState = {
    loading: true,
    boards: [],
    currBoard: {}
}
export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST_BOARD:
            return { ...state, loading: true }
        case ACTIONS.GET_BOARDS:
            return { ...state, loading: false, boards: action.payload.boards }
        case ACTIONS.GET_BOARD_BY_ID:
            return { ...state, loading: false, currBoard: action.payload.currBoard }
        case ACTIONS.ERROR_BOARD:
            return { ...state, loading: false, error: action.payload.error, boards: [] }
        case ACTIONS.ADD_BOARD:
            return { ...state, loading: false, boards: [...state.boards, action.payload.board] }
        default:
            return state
    }
}
