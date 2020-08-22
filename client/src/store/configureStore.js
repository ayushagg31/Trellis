import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { boardReducer } from '../reducers/boardReducer'
import { listsReducer } from '../reducers/listsReducer'
import { cardsReducer } from '../reducers/cardsReducer'
import { activityReducer } from '../reducers/activityReducer'
import { imageReducer } from '../reducers/imageReducer'
import { userReducer } from '../reducers/userReducer'
import * as ACTIONS from '../actions/actions'
import thunk from 'redux-thunk'


const appReducer = combineReducers({
    boards: boardReducer,
    lists: listsReducer,
    cards: cardsReducer,
    activities: activityReducer,
    images: imageReducer,
    user: userReducer
})


const rootReducer = (state, action) => {
    if (action.type === ACTIONS.LOGOUT_USER) {
        state = undefined
    }
    return appReducer(state, action)
}


export default createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
