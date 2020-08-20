import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/actionCreators/userActions'
import AddItem from './AddItem'

const useStyles = makeStyles((theme) => ({
    header: {
        padding: theme.spacing(0.3, 0.3, 0.3, 0.3),
        marginBottom: theme.spacing(1),
        backgroundColor: props => props.loggedIn ? 'hsla(0,0%,100%,.24)' : 'rgba(0,0,0,.32)',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '23px',
        textAlign: 'center',
        fontFamily: 'Pacifico',
        position: 'fixed',
        width: '100%',
        zIndex: 1,
    },
    trellis: {
        zIndex: 100,
        opacity: 0.7,
        color: 'black',
        display: 'inline-block',
        '&:hover': {
            opacity: 1,
            cursor: 'pointer',
        },
    },
}))

export default function Header({ loggedIn, btnText, path, icon }) {
    const classes = useStyles()
    const { user } = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    return (
        <>
            <div className={classes.header}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className={classes.trellis}>
                        Trellis</div>
                </Link>
            </div>
            {loggedIn ?
                (<div style={{ display: 'flex', float: 'right', margin: '10px' }}>
                    <div
                        style={{ width: '500px', height: '30px', fontFamily: 'Pacifico', overflow: 'hidden', fontWeight: 'bold', textAlign: 'right' }}>
                        Hi! {user.username}
                    </div>
                    <div style={{ marginTop: '-5px', zIndex: 200, marginLeft: '10px' }}>
                        <AddItem
                            btnText='Logout'
                            type='menu'
                            icon={<ExitToAppIcon fontSize='small' />}
                            width='85px'
                            color='black'
                            handleClick={() => {
                                dispatch(logoutUser())
                                localStorage.setItem('auth-token', '')
                                history.push('/')
                            }}
                        />
                    </div>
                </div>) : null}
            {!loggedIn ?
                (<div style={{ display: 'flex', float: 'right', margin: '10px' }}>
                    <div style={{ marginTop: '-5px', zIndex: 200, marginLeft: '10px' }}>
                        <AddItem
                            btnText={btnText}
                            type='menu'
                            icon={icon}
                            width='85px'
                            color='black'
                            handleClick={() => {
                                history.push(`${path}`)
                            }}
                        />
                    </div>
                </div>) : null}

        </>
    )
}
