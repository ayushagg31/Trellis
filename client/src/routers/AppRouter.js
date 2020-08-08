import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App';
import React from 'react'
import BoardView from '../components/BoardView'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={App} />
            <Route path='/b/:id/:name?'>
                <BoardView />
            </Route>
            {/* <Route component={NotFound} /> */}
        </Switch>
    </BrowserRouter>

)


export default AppRouter