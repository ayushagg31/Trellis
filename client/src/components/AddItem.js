import React from 'react'
import { makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    add: {
        textTransform: 'none',
        margin: theme.spacing(0.2, 1, 1, 1),
        justifyContent: 'left',
        opacity: 1,
        fontWeight: props => (props.type === 'background' || props.type === 'menu' || props.type === 'list') ? 'bold' : 'inherit',
        backgroundColor: props => props.type !== 'card' ? '#091e4214' : 'inherit',
        '&:hover': {
            opacity: 0.8,
            backgroundColor: '#ffffff3d',
        },
        textShadow: props => (!props.noshadow && (props.type === 'menu' || props.type === 'list')) && '2px 2px black',
    },
    width: props => ({
        width: props.width,
        color: props.color
    }),
    

}))

export default function AddItem({
  btnText,
  handleClick,
  type,
  icon,
  width,
  color,
  noshadow,
}) {
  const classes = useStyles({ type, width, color, noshadow })
  return (
    <Button className={`${classes.add} ${classes.width}`} onClick={handleClick}>
      {icon} {btnText}
    </Button>
  )
}
