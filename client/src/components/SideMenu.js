import React, { useState } from 'react'
import {
  Paper,
  makeStyles,
  fade,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CancelIcon from '@material-ui/icons/Cancel'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Alert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import { useHistory } from 'react-router-dom'
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    paddingBottom: '10px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))
export default function SideMenu({
  setBackground,
  board,
  setSearch,
  search,
  isResultEmpty,
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const classes = useStyles({ showMenu })
  const dispatch = useDispatch()
  const history = useHistory()
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
            closeHandler={() => {
              setShowMenu(false)
              setSearch('')
            }}
            type="menu"
          />
          <Hr />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search by keyword"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              value={search}
            />
          </div>
          {isResultEmpty && search && (
            <Alert severity="error">No result found</Alert>
          )}
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
          <AddItem
            btnText="Delete Board"
            handleClick={() => setDeleting(true)}
            type="background"
            width="310px"
            icon={<DeleteSweepIcon style={{ marginRight: '10px' }} />}
          />
          <Dialog
            open={deleting}
            onClose={() => setDeleting(false)}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
          >
            <DialogTitle id="delete-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-dialog-description">
                This will permanently delete the board {board.title}.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus="true"
                variant="contained"
                color="default"
                onClick={() => setDeleting(false)}
                className={classes.button}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteBoardById(board.id, token))
                  history.push('/')
                }}
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
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
