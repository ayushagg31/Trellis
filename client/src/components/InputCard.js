import React, { useRef, useEffect } from 'react'
import {
  Paper,
  InputBase,
  makeStyles,
  Button,
  IconButton,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(0.2, 1, 0.09, 1),
    // width: props => props.type === 'board' ? '120px' : '230px',
    wordWrap: 'break-word',
    padding: (props) =>
      props.type === 'list'
        ? theme.spacing(0.5, 1.5, 0.5, 1.5)
        : theme.spacing(1, 1, 3.5, 2),
    boxShadow: (props) =>
      props.type === 'list'
        ? 'inset 0 0 0 2px #0079bf'
        : '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  },
  btn: {
    marginLeft: theme.spacing(1),
    backgroundColor: '#5aac44',
    color: 'white',
    textTransform: 'none',
    '&:hover': {
      opacity: 1.6,
      backgroundColor: '#61BD4F',
    },
  },
  icon: {
    opacity: 0.6,
    color: 'black',
    '&:hover': {
      opacity: 1,
    },
  },
  listBackground: {
    backgroundColor: '#EBECF0',
    marginLeft: (props) =>
      props.marginLeft ? theme.spacing(1) : theme.spacing(0),
    paddingTop: (props) =>
      props.type === 'list' ? theme.spacing(1) : 'inherit',
    borderRadius: theme.spacing(0.5),
  },
  width: (props) => ({
    width: props.width,
  }),
}))

export default function InputItem({
  value,
  changedHandler,
  itemAdded,
  closeHandler,
  width,
  type,
  btnText,
  placeholder,
  marginLeft,
}) {
  const classes = useStyles({ type, width, marginLeft })
  const divRef = useRef(null)

  useEffect(() => {
    if (divRef.current != null) {
      divRef.current.scrollIntoView({ behaviour: 'smooth' })
    }
  })
  const handleBlur = () => {
    closeHandler()
    itemAdded()
  }
  return (
    <div className={classes.listBackground}>
      <Paper className={`${classes.card} ${classes.width}`}>
        <InputBase
          onChange={changedHandler}
          multiline
          fullWidth
          value={value}
          autoFocus
          placeholder={placeholder}
          onBlur={handleBlur}
        />
      </Paper>
      <Button
        ref={divRef}
        className={classes.btn}
        variant="contained"
        onClick={itemAdded}
      >
        {btnText}
      </Button>
      <IconButton className={classes.icon} onClick={closeHandler}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}
