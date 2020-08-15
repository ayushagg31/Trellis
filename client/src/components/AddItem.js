import React from 'react'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    add: {
        textTransform: 'none',
        margin: theme.spacing(0.2, 1, 1, 1),
        // width: '256px',
        justifyContent: 'left',
        opacity: 0.6,
        backgroundColor: props => props.type !== 'card' ? 'gray' : 'inherit',
        color: props => props.type !== 'card' ? 'white' : 'inherit',
        '&:hover': {
            opacity: 1,
            backgroundColor: props => props.type !== 'card' ? 'gray' : 'inherit',
        },
        width: props => props.type === 'menu' ? '120px' : '256px'
    }
}))

export default function AddItem({ btnText, handleClick, type, icon }) {
    const classes = useStyles({ type })
    return (
        <Button className={classes.add}
            onClick={handleClick}>
            {icon} {btnText}
        </Button>

    )
}
