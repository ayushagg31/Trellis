import React from 'react'
import { Paper, InputBase, makeStyles, Button, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(0.2, 1, 0.09, 1),
        width: '230px',
        wordWrap: 'break-word',
        padding: props => props.type === 'list' ? theme.spacing(0.5, 1.5, 0.5, 1.5) : theme.spacing(1, 1, 3.5, 2),
        boxShadow: props => props.type === 'list' ? 'inset 0 0 0 2px #0079bf' :
            '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    },
    btn: {
        marginLeft: theme.spacing(1),
        backgroundColor: '#5aac44',
        color: 'white',
        textTransform: 'none',
        '&:hover': {
            opacity: 1.6,
            backgroundColor: '#61BD4F',
        }
    },
    icon: {
        opacity: 0.6,
        color: 'black',
        '&:hover': {
            opacity: 1,
        }
    },
    listBackground: {
        backgroundColor: '#EBECF0',
        marginLeft: props => props.type === 'list' ? theme.spacing(1) : 'inherit',
        paddingTop: theme.spacing(1),
        borderRadius: theme.spacing(0.5)
    }
}))

export default function InputItem({ value, changedHandler, itemAdded, closeHandler, type, btnText }) {
    const classes = useStyles({ type })
    return (
        <div className={classes.listBackground}>
            <Paper className={classes.card}>
                <InputBase
                    onChange={changedHandler}
                    multiline
                    fullWidth
                    value={value}
                    autoFocus
                    placeholder={
                        type === 'card'
                            ? 'Enter a title for this card...'
                            : 'Enter list title...'
                    }
                />
            </Paper>
            <Button
                className={classes.btn}
                variant='contained'
                onClick={itemAdded}>{btnText}</Button>
            <IconButton className={classes.icon} onClick={closeHandler}>
                <CloseIcon />
            </IconButton>
        </div>
    )
}


