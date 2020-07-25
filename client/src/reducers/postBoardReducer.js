import * as ACTIONS from '../actions/actions'

const initialState = {
    success: false,
    validationError: false
}

export const createBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.POST_REQUEST:
            return state
        case ACTIONS.GET_RESPONSE:
            return { success: true, validationError: false }
        case ACTIONS.ERROR:
            return { success: false, validationError: false }
        case ACTIONS.VALIDATION_ERROR:
            return { success: false, validationError: true }
        default:
            return state
    }
}