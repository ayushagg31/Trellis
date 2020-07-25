import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App';
import React from 'react'
import ListView from '../components/ListView'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={App} />
            <Route path='/b/:id/:name?'>
                <ListView />
            </Route>
            {/* <Route component={NotFound} /> */}
        </Switch>
    </BrowserRouter>

)


export default AppRouter