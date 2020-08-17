import React from 'react'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    add: {
        textTransform: 'none',
        margin: theme.spacing(0.2, 1, 1, 1),
        justifyContent: 'left',
        opacity: 0.6,
        backgroundColor: props => props.type !== 'card' ? 'gray' : 'inherit',
        color: props => props.type !== 'card' ? 'white' : 'inherit',
        '&:hover': {
            opacity: 1,
            backgroundColor: 'gray'
        },
    },
    width: props => ({
        width: props.width
    })
}))

export default function AddItem({ btnText, handleClick, type, icon, width }) {
    const classes = useStyles({ type, width })
    return (
        <Button className={`${classes.add} ${classes.width}`}
            onClick={handleClick}>
            {icon} {btnText}
        </Button>

    )
}
