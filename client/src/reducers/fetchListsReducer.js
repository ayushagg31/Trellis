import * as ACTIONS from '../actions/actions'

const initialState = {
    listLoading: true,
    lists: []
}
export const fetchListsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { ...state, listLoading: true }
        case ACTIONS.GET_LISTS:
            return { ...state, listLoading: false, lists: action.payload.lists }
        case ACTIONS.ERROR:
            return { ...state, listLoading: false, listError: action.payload.error, lists: [] }
        default:
            return state
    }
}
