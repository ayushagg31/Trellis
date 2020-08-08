import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { fetchBoardReducer } from '../reducers/fetchBoardReducer'
import { createBoardReducer } from '../reducers/postBoardReducer'
import { fetchListsReducer } from '../reducers/fetchListsReducer'
import { fetchCardsReducer } from '../reducers/fetchCardsReducer'
import { createCardReducer } from '../reducers/postCardReducer'
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    boards: fetchBoardReducer,
    postBoard: createBoardReducer,
    lists: fetchListsReducer,
    cards: fetchCardsReducer,
    postCard: createCardReducer
})

export default createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
