import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App'
import React from 'react'
import Board from '../components/Board'
import Login from '../components/Login'
import Register from '../components/Register'
import NotFound from '../components/NotFound'

import { checkTokenValidity, fetchUserInfo } from '../actions/actionCreators/userActions'

const AppRouter = () => {
    const { isValid, token, user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isValid) {
            dispatch(fetchUserInfo(token))
        }
    }, [isValid, token, dispatch])

    useEffect(() => {
        let token = localStorage.getItem('auth-token')
        if (token === null) {
            localStorage.setItem('auth-token', '')
            token = ''
        }
        dispatch(checkTokenValidity(token))

    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' component={Register} />
                <Route path={`/${user.username}/boards`} component={App} />
                <Route path='/b/:id/:name'>
                    <Board />
                </Route>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}


export default AppRouter