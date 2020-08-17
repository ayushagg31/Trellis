import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'fixed',
        width: '1405px',
        overflow: 'hidden',
        opacity: 0.8,
    },
    title: {
        fontWeight: 'bold',
        padding: theme.spacing(0.7, 0.7, 0.7, 0.7),
        margin: theme.spacing(0.7, 0.7, 0.7, 0.7),
        fontFamily: 'sans-serif',
        fontSize: '20px',
        marginTop: theme.spacing(6.5),
        '&:hover': {
            opacity: 1,
            backgroundColor: 'hsla(0,0%,100%,.24)',
            borderRadius: 4
            // opacity: 0.5
        }
    }
}))
export default function BoardHeader({ title, showEditable }) {
    const classes = useStyles()
    return (
        <div className={classes.container} >
            <div className={classes.title} onClick={showEditable}>
                {title}
            </div>
        </div>
    )
}