import * as ACTIONS from '../actions/actions'

const initialState = {
  activities: [],
}
export const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ACTIVITIES:
      return {
        ...state,
        activities: [...state.activities, ...action.payload.activities],
        activityCount: action.payload.activityCount,
      }
    case ACTIONS.ADD_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload.activity],
        activityCount: state.activityCount + 1,
      }
    case ACTIONS.DELETE_ACTIVITY: {
      const activitiesLog = state.activities
      const index = activitiesLog.findIndex(
        (activity) => activity._id === action.payload.activity._id,
      )
      activitiesLog.splice(index, 1)
      return {
        ...state,
        activities: [...state.activitiesLog],
        activityCount: state.activitiesLog.length,
      }
    }
    case ACTIONS.ERROR_ACTIVITY:
      return { ...state, activityError: action.payload.error }
    default:
      return state
  }
}
