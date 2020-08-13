import * as ACTIONS from '../actions/actions'

const initialState = {
    activities: []
}
export const activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_ACTIVITIES:
            return { ...state, activities: action.payload.activities }
        case ACTIONS.ADD_ACTIVITY:
            return { ...state, activities: [...state.activities, action.payload.activity] }
        case ACTIONS.ERROR_ACTIVITY:
            return { ...state, activityError: action.payload.error }
        default:
            return state
    }
}
