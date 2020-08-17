import * as ACTIONS from '../actions/actions'

const initialState = {
    listLoading: true,
    lists: []
}
export const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST_LIST:
            return { ...state, listLoading: true }
        case ACTIONS.GET_LISTS:
            return { ...state, listLoading: false, lists: action.payload.lists }
        case ACTIONS.ADD_LIST:
            return { ...state, lists: [...state.lists, action.payload.list] }
        case ACTIONS.UPDATE_LIST:
            const listsCopy = [...state.lists]
            const targetIndex = listsCopy.findIndex(list => list._id === action.payload.list._id)
            listsCopy[targetIndex] = action.payload.list
            return { ...state, lists: listsCopy, listLoading: false }
        case ACTIONS.DELETE_LIST:
            const listPrev = [...state.lists]
            const index = listPrev.findIndex(list => list._id === action.payload.list._id)
            listPrev.splice(index, 1)
            return { ...state, lists: listPrev, listLoading: false }
        case ACTIONS.ERROR_LIST:
            return { ...state, listLoading: false, listError: action.payload.error }
        default:
            return state
    }
}


