import React from 'react'
import { makeStyles } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

const useStyles = makeStyles((theme) => ({
    errorNotice: {
        border: '1px solid #e07c7c',
        borderRadius: 8,
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8d6d6',
        width: '320px',
        padding: theme.spacing(0.5),
        marginLeft: theme.spacing(-1.75)

    },
    button: {
        all: 'unset',
        marginTop: theme.spacing(0.8)
    }
}))

export default function ErrorNotice({ message, clearError }) {
    const classes = useStyles()
    return (
        <div className={classes.errorNotice}>
            <span>{message}</span>
            <button className={classes.button} onClick={clearError}>
                <CancelIcon style={{ color: 'red' }} />
            </button>
        </div>
    )
}