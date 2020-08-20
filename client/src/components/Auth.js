import React from 'react'
import ErrorNotice from './ErrorNotice'
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
        backgroundColor: '#F9FAFC',

    },
    input: {
        marginBottom: theme.spacing(2),
        borderRadius: 5,
        padding: theme.spacing(0.6),
        marginRight: '90px',
        marginLeft: '55px',
        backgroundColor: '#F9FAFC',
    },
    submit: {

    }
}))

export default function Auth({ btnText, path, authName, icon, error, clearError, passwordCheckChangeHandler, passwordCheck, submitHandler, username, nameChangeHandler, password, passwordChangeHandler, register }) {
    const classes = useStyles()

    return (
        <div>
            <Header btnText={btnText} path={path} icon={icon} />
            <div className={classes.wrapper}>
                {error && (
                    <ErrorNotice message={error} clearError={clearError} />
                )}
                <Paper elevation={1} className={classes.form}>
                    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '18px', fontWeight: 'bold', paddingBottom: '30px' }}>
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
