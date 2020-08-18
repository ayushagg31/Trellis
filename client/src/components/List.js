import React, { useState, useRef } from 'react'
import Card from './Card'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import InputCard from './InputCard'
import { createNewCard } from '../actions/actionCreators/cardActions'
import { useDispatch } from 'react-redux'
import midString from '../ordering/ordering'
import { createNewActivity } from '../actions/actionCreators/activityActions'
import { Paper, makeStyles, InputBase, IconButton } from '@material-ui/core'
import AddItem from './AddItem'
import AddIcon from '@material-ui/icons/Add'
import { updateListById, deleteListById } from '../actions/actionCreators/listActions'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '272px',
        backgroundColor: '#EBECF0',
        marginLeft: theme.spacing(1),
        wordWrap: 'break-word',
    },
    scroll: {
        maxHeight: '500px',
        overflow: 'auto',
        overflowX: 'hidden'
    },
    title: {
        padding: theme.spacing(1, 1, 1, 1),
        minWidth: '100px',
        marginLeft: theme.spacing(1.5),
        fontWeight: 'bold',
    },
    wrapper: {
        marginTop: theme.spacing(11.5)
    },
    editable: {
        marginLeft: theme.spacing(-1),
        wordWrap: 'break-word',
        padding: theme.spacing(0, 1, 0, 1),
        boxShadow: 'inset 0 0 0 2px #0079bf',
        width: '210px',
        borderRadius: 4,
    }
}))

export default function Column({ column, tasks, index }) {
    const classes = useStyles()
    const [cardTitle, setCardTitle] = useState('')
    const [listTitle, setListTitle] = useState(column.name)
    const [addCardFlag, setAddCardFlag] = useState(false)
    const [editable, setEditable] = useState(false)
    var addFlag = useRef(true)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        setCardTitle(e.target.value)
    }

    const submitHandler = () => {
        if (cardTitle === '')
            return
        const totalTasks = tasks.length
        const postCardReq = {
            name: cardTitle,
            boardId: column.boardId,
            listId: column._id,
            order: totalTasks === 0 ? 'n' : midString(tasks[totalTasks - 1].order, '')
        }
        dispatch(createNewCard(postCardReq))
        dispatch(createNewActivity({
            text: `User added ${cardTitle} to ${column.name}`,
            boardId: column.boardId
        }))
        setCardTitle('')
        setAddCardFlag(true)
    }
    const handleAddition = () => {
        setAddCardFlag(true)
        addFlag.current = false
    }
    const closeButtonHandler = () => {
        setAddCardFlag(false)
        addFlag.current = true
        setCardTitle('')
    }
    const changedHandler = (e) => {
        e.preventDefault()
        setListTitle(e.target.value)
    }
    const updateListTitle = () => {
        dispatch(updateListById(column._id, { name: listTitle }))
        column.name = listTitle
        setEditable(false)
    }

    return (
        <div className={classes.wrapper}>
            <Draggable draggableId={column._id} index={index}>
                {(provided) => (
                    <div {...provided.draggableProps}
                        ref={provided.innerRef}>
                        <Paper elevation={0}
                            className={classes.root}
                            {...provided.dragHandleProps}>
                            <div className={classes.title} onClick={() => setEditable(true)} >
                                {!editable &&
                                    <div style={{ display: 'flex', position: 'relative' }}>
                                        <div>
                                            {column.name}
                                        </div>
                                        <IconButton
                                            style={{ right: 0, position: 'absolute', marginTop: '-10px', zIndex: '100' }}
                                            onClick={() => {
                                                dispatch(deleteListById(column._id))
                                                const text = `User deleted list ${column.name}`
                                                dispatch(createNewActivity({ text, boardId: column.boardId }))
                                            }}
                                        >
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    </div>
                                }
                                {editable &&
                                    <div className={classes.editable}>
                                        < InputBase
                                            onChange={changedHandler}
                                            multiline
                                            fullWidth
                                            value={listTitle}
                                            style={{ fontWeight: 'bold' }}
                                            autoFocus
                                            onFocus={(e) => {
                                                const val = e.target.value
                                                e.target.value = ''
                                                e.target.value = val
                                            }}
                                            onBlur={updateListTitle}
                                        />
                                    </div>
                                }
                            </div>
                            <Droppable
                                droppableId={column._id} type='card'>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                        <div className={classes.scroll}>
                                            {tasks.map((task, index) =>
                                                <Card key={task._id} task={task} index={index} />)}
                                            {addCardFlag &&
                                                <InputCard
                                                    value={cardTitle}
                                                    changedHandler={handleChange}
                                                    itemAdded={submitHandler}
                                                    closeHandler={closeButtonHandler}
                                                    type='card'
                                                    btnText='Add Card'
                                                    placeholder='Enter a title for this card...'
                                                    width='230px'
                                                />
                                            }
                                            {provided.placeholder}
                                        </div>
                                        {addFlag.current &&
                                            <AddItem handleClick={handleAddition} icon={<AddIcon />}
                                                btnText='Add another card' type='card' width='256px' />
                                        }
                                    </div>
                                )}
                            </Droppable>
                        </Paper>
                    </div>
                )}
            </Draggable>
        </div >
    )
}
