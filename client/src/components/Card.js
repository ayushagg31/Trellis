import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Paper, makeStyles, InputBase } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCardById } from '../actions/actionCreators/cardActions'

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        width: '230px',
        wordWrap: 'break-word',
        '&:hover': {
            backgroundColor: '#EBECF0'
        }

    },
}))

export default function Card({ task, index }) {
    const classes = useStyles()
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState(task.name)
    const dispatch = useDispatch()
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Paper className={classes.card} onClick={() => setEditable(true)}>
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
                                }}
                            />) :
                            (<div>
                                {task.name}
                            </div>)
                        }
                    </ Paper>
                </div>
            )
            }
        </Draggable >
    )
}
