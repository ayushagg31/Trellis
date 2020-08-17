import React from 'react'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    add: {
        textTransform: 'none',
        margin: theme.spacing(0.2, 1, 1, 1),
        justifyContent: 'left',
        opacity: 0.8,
        fontWeight: props => props.type === 'background' ? 'bold' : 'inherit',
        backgroundColor: props => props.type !== 'card' ? 'hsla(0,0%,100%,.24)' : 'inherit',
        // color: props => props.type !== 'card' ? 'white' : 'inherit',
        '&:hover': {
            opacity: 1,
            backgroundColor: 'rgba(9,30,66,.08)',
        },
    },
    width: props => ({
        width: props.width,
        color: props.color
    }),
}))

export default function AddItem({ btnText, handleClick, type, icon, width, color }) {
    const classes = useStyles({ type, width, color })
    return (
        <Button className={`${classes.add} ${classes.width}`}
            onClick={handleClick}>
            {icon} {btnText}
        </Button>

    )
}
