import React from 'react'
import Notice from './Notice'
import Header from './Header'
import { makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'fixed',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    form: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width: '280px',
        backgroundColor: 'black',

    },
    input: {
        outline: 'none',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        marginRight: '90px',
        marginLeft: '55px',
        backgroundColor: '#FDFCFA',
        border: '2px solid #DFE1E6',
        borderRadius: 3,
        boxSizing: 'border-box',
        '&:focus': {
            border: '2px solid #4C9AFF',
            backgroundColor: '#FFFFFF',
        }
    },
    submit: {
        backgroundColor: '#61BD4F',
        color: 'white',
        fontWeight: 'bold',
        opacity: 0.9,
        all: 'unset',
        borderRadius: 5,
        width: '150px',
        padding: theme.spacing(0.8),
        margin: theme.spacing(2, 2, 7, 2),
        '&:hover': {
            opacity: 1.6
        }
    }
}))

export default function Auth({ btnText, path, authName, icon, error, clearError, passwordCheckChangeHandler, passwordCheck, submitHandler, username, nameChangeHandler, password, passwordChangeHandler, register, success }) {
    const classes = useStyles()

    return (
        <div>
            <Header btnText={btnText} path={path} icon={icon} />
            <div className={classes.wrapper}>
                {error && (
                    <Notice message={error} success={success} clearError={clearError} />
                )}
                <Paper elevation={1} className={classes.form}>
                    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', marginTop: '35px', color: '#5E6C84', fontSize: '18px', fontWeight: 'bold', paddingBottom: '30px' }}>
                        {authName} to Trellis
                    </div>
                    <form onSubmit={submitHandler} >
                        <label
                            htmlFor={`${authName}-username`}></label>
                        <input
                            className={classes.input}
                            type='text'
                            value={username}
                            onChange={nameChangeHandler}
                            placeholder='Enter Username'
                        />

                        <label
                            htmlFor={`${authName}-password`}></label>
                        <input
                            className={classes.input}
                            type='password'
                            value={password}
                            onChange={passwordChangeHandler}
                            placeholder='Enter Password'
                        />
                        {register ?
                            (<>
                                <label
                                    htmlFor={`${authName}-verify-password`}></label>
                                <input
                                    className={classes.input}
                                    type='password'
                                    value={passwordCheck}
                                    placeholder='Enter Password Again'
                                    onChange={passwordCheckChangeHandler}
                                />
                            </>) : null
                        }
                        <input
                            className={classes.submit}
                            type='submit' value={authName} />
                    </form>
                </Paper >
            </div >
        </div >
    )
}
