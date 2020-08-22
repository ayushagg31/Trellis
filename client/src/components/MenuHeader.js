import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 'bold',
        marginLeft: props => props.type === 'menu' ? theme.spacing(17) : theme.spacing(10),
        paddingRight: props => props.type === 'menu' ? theme.spacing(13) : theme.spacing(8.2),
    },
    close: {
        marginTop: theme.spacing(-1.3)
    }
}))

export default function MenuHeader({ text, closeHandler, type, backHandler }) {
    const classes = useStyles({ type })
    return (
        <div style={{ display: 'flex' }}>
            {(type === 'background') && (
                <IconButton
                    onClick={backHandler}
                    className={classes.close}>
                    <ArrowBackIosIcon fontSize='small' />
                </IconButton>
            )}
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
