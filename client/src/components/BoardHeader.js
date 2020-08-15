import React from 'react'
import { makeStyles } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import AddItem from './AddItem'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        padding: theme.spacing(0.7, 0.7, 0.7, 0.7),
        margin: theme.spacing(0.7, 0.7, 0.7, 0.7),
        fontFamily: 'sans-serif',
        fontSize: '20px'
    },
    menu: {
    }

}))
export default function BoardHeader({ title }) {
    const classes = useStyles()

    const showHandler = () => {

    }
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                {title}
            </div>
            <div className={classes.menu}>
                <AddItem btnText='Show Menu' handleClick={showHandler} icon={<MoreHorizIcon />} type='menu' />
            </div>
        </div>
    )
}