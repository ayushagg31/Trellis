import React, { useState } from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useDispatch, useSelector } from 'react-redux'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import { Link } from 'react-router-dom'
import AddItem from './AddItem'
import Activities from './Activities'
import Hr from './Hr'
import MenuHeader from './MenuHeader'
import Background from './Background'
import { deleteBoardById } from '../actions/actionCreators/boardActions'
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F4F5F7',
    width: '321px',
    float: 'right',
    height: '100vh',
    right: (props) =>
      props.showMenu === false ? theme.spacing(-100) : theme.spacing(0),
    top: theme.spacing(5.63),
    borderRadius: theme.spacing(0),
    position: 'fixed',
    padding: theme.spacing(1),
    wordWrap: 'break-word',
    zIndex: '1200',
    transition: 'right 0.7s ease-out',
  },
  scroll: {
    overflow: 'auto',
    height: '95vh',
  },
  menu: {
    top: theme.spacing(5.63),
    position: 'fixed',
    right: theme.spacing(0),
    marginTop: theme.spacing(0.5),
  },
}))
export default function SideMenu({ setBackground, board }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const classes = useStyles({ showMenu })
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.user)
  return (
    <>
      <div className={classes.menu}>
        <AddItem
          btnText="Show Menu"
          handleClick={() => setShowMenu(true)}
          icon={<MoreHorizIcon />}
          type="menu"
          width="120px"
          color="white"
        />
      </div>
      {!showBackground && (
        <Paper className={classes.container} elevation={1} variant="outlined">
          <MenuHeader
            text="Menu"
            closeHandler={() => setShowMenu(false)}
            type="menu"
          />
          <Hr />
          <AddItem
            btnText="Change Background"
            handleClick={() => setShowBackground(true)}
            type="background"
            width="310px"
            icon={
              <span
                style={{
                  marginRight: '13px',
                  backgroundColor: `${board.color}`,
                  backgroundImage: `url(${board.url})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '20px',
                  height: '20px',
                  borderRadius: '2px',
                }}
              ></span>
            }
          />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <AddItem
              btnText="Delete Board"
              handleClick={() => {
                dispatch(deleteBoardById(board.id, token))
              }}
              type="background"
              width="310px"
              icon={<DeleteSweepIcon style={{ marginRight: '10px' }} />}
            />
          </Link>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <AccountTreeIcon
              fontSize="small"
              style={{ paddingLeft: '20px', color: '#172B4D', opacity: '0.8' }}
            />
            <div
              style={{
                paddingLeft: '10px',
                paddingBottom: '10px',
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#172B4D',
                opacity: '0.9',
              }}
            >
              Activity
            </div>
          </div>
          <div className={classes.scroll}>
            <Activities board={{ id: board.id }} />
          </div>
        </Paper>
      )}
      <div>
        {showBackground && (
          <Background
            backHandler={() => setShowBackground(false)}
            closeHandler={() => {
              setShowMenu(false)
              setShowBackground(false)
            }}
            setColorBackground={setBackground}
          />
        )}
      </div>
    </>
  )
}
