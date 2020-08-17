import React from 'react'
import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        // position: 'fixed',
        width: '1405px',
        overflow: 'hidden'
    },
    title: {
        fontWeight: 'bold',
        padding: theme.spacing(0.7, 0.7, 0.7, 0.7),
        margin: theme.spacing(0.7, 0.7, 0.7, 0.7),
        fontFamily: 'sans-serif',
        fontSize: '20px',
        marginTop: theme.spacing(-0.5),
    }
}))
export default function BoardHeader({ title, showHandler }) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                {title}
            </div>
        </div>
    )
}