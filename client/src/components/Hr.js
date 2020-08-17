import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    hr: {
        backgroundColor: 'rgba(9,30,66,.13)',
        border: theme.spacing(0),
        height: theme.spacing(0.1),
        margin: theme.spacing(0,0,3,0),
        padding: theme.spacing(0),
        width: '100%',
    }
}))
export default function Hr() {
    const classes = useStyles()
    return (
        <hr className={classes.hr} />
    )
}
