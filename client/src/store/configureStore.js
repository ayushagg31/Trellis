import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { boardReducer } from '../reducers/boardReducer'
import { listsReducer } from '../reducers/listsReducer'
import { cardsReducer } from '../reducers/cardsReducer'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    boards: boardReducer,
    lists: listsReducer,
    cards: cardsReducer,
})

export default createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
