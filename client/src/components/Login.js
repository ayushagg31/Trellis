import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../actions/actionCreators/userActions'
import { useHistory } from 'react-router-dom'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import Auth from '../components/Auth'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { token, user, successLogin, requestLogin, loginError } = useSelector(state => state.user)
    const [error, setError] = useState()
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        if (user.username !== undefined)
            history.push(`/${user.username}/boards`)
    }, [history, user])

    useEffect(() => {
        if (!requestLogin) {
            if (token && successLogin) {
                setError('Logged In successfully ✔')
                setSuccess(true)
                localStorage.setItem('auth-token', token)
                // history.push(`/${user.username}/boards`)
            }
            else if (!successLogin && !token) {
                setError(loginError)
                setSuccess(false)
            }
        }
    }, [token, user, successLogin, requestLogin, loginError, history])

    const submitHandler = (e) => {
        e.preventDefault()
        const loginReq = { username, password }
        dispatch(loginUser(loginReq))
        setUsername('')
        setPassword('')
    }

    return (
        <>
            <Auth
                btnText='Register'
                path='/register'
                authName='Login'
                icon={<HowToRegIcon fontSize='small' />}
                error={error}
                clearError={() => setError(undefined)}
                submitHandler={submitHandler}
                username={username}
                nameChangeHandler={(e) => {
                    e.preventDefault()
                    setUsername(e.target.value)
                }}
                password={password}
                passwordChangeHandler={(e) => {
                    e.preventDefault()
                    setPassword(e.target.value)
                }}
                success={success} />
        </>
    )
}
