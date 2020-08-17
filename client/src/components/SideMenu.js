import React, { useState } from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import AddItem from './AddItem'
import Activities from './Activities'
import Hr from './Hr'
import MenuHeader from './MenuHeader'
import Background from './Background'
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#F4F5F7',
        width: '321px',
        float: 'right',
        height: '100vh',
        right: props => props.showMenu === false ? theme.spacing(-100) : theme.spacing(0),
        top: theme.spacing(5.63),
        borderRadius: theme.spacing(0),
        position: 'fixed',
        padding: theme.spacing(1),
        wordWrap: 'break-word',
        zIndex: '1200',
        transition: 'right 0.7s ease-out'
    },
    scroll: {
        overflow: 'auto',
        height: '95vh'
    },
    menu: {
        top: theme.spacing(5.63),
        position: 'fixed',
        right: theme.spacing(0),
        marginTop: theme.spacing(0.5)
    },
}))
export default function SideMenu({ setBackground }) {
    const [showMenu, setShowMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)
    const classes = useStyles({ showMenu })
    return (
        <>
            <div className={classes.menu}>
                <AddItem btnText='Show Menu' handleClick={() => (setShowMenu(true))} icon={<MoreHorizIcon />} type='menu' width='120px' />
            </div>
            {!showBackground &&
                <Paper className={classes.container} elevation={1} variant='outlined' >
                    <MenuHeader text='Menu' closeHandler={() => (setShowMenu(false))} type='menu' />
                    <Hr />
                    <AddItem btnText='Change Background'
                        handleClick={() => (setShowBackground(true))}
                        type='background' width='310px' />
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <AccountTreeIcon fontSize='small'
                            style={{ paddingLeft: '20px', color: '#172B4D', opacity: '0.8' }} />
                        <div style={{ paddingLeft: '10px', paddingBottom: '10px', fontWeight: 'bold', fontSize: '15px', color: '#172B4D', opacity: '0.9' }}>Activity</div>
                    </div>
                    <div className={classes.scroll}>
                        <Activities />
                    </div>
                </Paper >
            }
            <div  >
                {showBackground && <Background closeHandler={() => (setShowBackground(false))} setColorBackground={setBackground} />}
            </div>
        </>
    )
}
