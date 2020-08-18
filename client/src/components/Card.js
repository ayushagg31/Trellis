import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Paper, makeStyles, InputBase, IconButton } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCardById, deleteCardById } from '../actions/actionCreators/cardActions'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { createNewActivity } from '../actions/actionCreators/activityActions'

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        width: '230px',
        wordWrap: 'break-word',
        zIndex: '-100',
        '&:hover': {
            backgroundColor: '#EBECF0'
        }
    }
}))

export default function Card({ task, index }) {
    const classes = useStyles()
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState(task.name)
    const [card, setCard] = useState(true)
    const dispatch = useDispatch()
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {card && <Paper className={classes.card} onClick={() => {
                        setEditable(true)
                    }}>
                        {editable ?
                            (< InputBase
                                onChange={(e) => {
                                    e.preventDefault()
                                    setTitle(e.target.value)
                                }}
                                multiline
                                fullWidth
                                value={title}
                                style={{ minHeight: '7px' }}
                                autoFocus
                                onFocus={(e) => {
                                    const val = e.target.value
                                    e.target.value = ''
                                    e.target.value = val
                                }}
                                onBlur={() => {
                                    setEditable(false)
                                    dispatch(updateCardById(task._id, { name: title }))
                                    task.name = title
                                }}
                            />) :
                            (<div style={{ position: 'relative' }}>
                                <div>
                                    {task.name}
                                </div>
                                <IconButton
                                    style={{ right: -10, position: 'absolute', marginTop: '-33px', zIndex: '200' }}
                                    onClick={() => {
                                        setCard(false)
                                        dispatch(deleteCardById(task._id))
                                        const text = `User deleted card ${task.name}`
                                        dispatch(createNewActivity({ text, boardId: task.boardId }))
                                    }}
                                >
                                    <DeleteForeverIcon fontSize='small' />
                                </IconButton>
                            </div>
                            )
                        }
                    </ Paper>
                    }
                </div>
            )}
        </Draggable >
    )
}
