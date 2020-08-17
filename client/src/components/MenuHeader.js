import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 'bold',
        marginLeft: props => props.type ? theme.spacing(17) : theme.spacing(8),
        paddingRight: props => props.type ? theme.spacing(13) : theme.spacing(7),
    },
    close: {
        marginTop: theme.spacing(-1.3)
    }
}))

export default function MenuHeader({ text, closeHandler, type }) {
    const classes = useStyles({ type })
    return (
        <div style={{ display: 'flex' }}>
            <div className={classes.title}>
                {text}
            </div>
            <IconButton onClick={closeHandler}
                className={classes.close}>
                <CloseIcon />
            </IconButton>
        </div>
    )
}
