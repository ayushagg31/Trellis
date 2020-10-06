import React from 'react'
import Notice from './Notice'
import Header from './Header'
import { makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        // padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width: '400px',
        backgroundColor: '#fff',
        border: '1px solid #e8e8e8',
        padding: '32px',
        '& > form': {
            display: 'flex',
            flexWrap: 'wrap',
        }
    },
    input: {
        outline: 'none',
        marginBottom: theme.spacing(2) / 2,
        padding: theme.spacing(1),
        backgroundColor: 'hsla(0,0%,100%,.24)',
        border: '1px solid #DFE1E6',
        borderRadius: 4,
        width: '100%',
        height: '48px',
        boxSizing: 'border-box',
        '&::placeholder': {
            color: '#a8a8a8',
        },
        '&:focus': {
            border: '2px solid #4C9AFF',
            backgroundColor: '#FFFFFF',
        }
    },
    submit: {
        width: '100%',
        height: '48px',
        backgroundColor: '#61BD4F',
        color: '#fff',
        fontWeight: 'bold',
        opacity: .84,
        all: 'unset',
        borderRadius: 4,
        alignItems: 'center',
        cursor: 'pointer',
        // margin: theme.spacing(2, 2, 7, 2),
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
                    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#5E6C84', fontSize: '18px', fontWeight: 'bold', paddingBottom: '30px' }}>
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
