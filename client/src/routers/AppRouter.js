import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App';
import React from 'react'
import Board from '../components/Board'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={App} />
            <Route path='/b/:id/:name?'>
                <Board />
            </Route>
            {/* <Route component={NotFound} /> */}
        </Switch>
    </BrowserRouter>

)


export default AppRouter