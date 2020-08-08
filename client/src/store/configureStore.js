import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { boardReducer } from '../reducers/boardReducer'
import { fetchListsReducer } from '../reducers/fetchListsReducer'
import { cardsReducer } from '../reducers/cardsReducer'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    boards: boardReducer,
    lists: fetchListsReducer,
    cards: cardsReducer,
})

export default createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
