import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../actions/actionCreators/userActions'
import Auth from './Auth'
import InputIcon from '@material-ui/icons/Input'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const { requestRegister, successRegister, registerError } = useSelector(state => state.user)
    const [error, setError] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!requestRegister && successRegister) {
            localStorage.setItem('auth-token', '')
            window.location.href = '/'
        }
        else if (!requestRegister && !successRegister) {
            setError(registerError)
        }
    }, [requestRegister, successRegister, registerError])

    const submitHandler = (e) => {
        e.preventDefault()
        const newUser = { username, password, passwordCheck }
        dispatch(registerUser(newUser))
        setUsername('')
        setPassword('')
        setPasswordCheck('')
    }
    return (
        <>
            <Auth
                btnText='Login'
                path='/'
                authName='Register'
                icon={<InputIcon fontSize='small' />}
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
                passwordCheck={passwordCheck}
                passwordCheckChangeHandler={(e) => {
                    e.preventDefault()
                    setPasswordCheck(e.target.value)
                }}
                register
            />
        </>
    )
}
