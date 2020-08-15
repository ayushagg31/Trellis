import React, { useState, useRef } from 'react'
import Card from './Card'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import InputCard from './InputCard'
import { createNewCard } from '../actions/actionCreators/cardActions'
import { useDispatch } from 'react-redux'
import midString from '../ordering/ordering'
import { createNewActivity } from '../actions/actionCreators/activityActions'
import { Paper, makeStyles } from '@material-ui/core'
import AddItem from './AddItem'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '272px',
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
        padding: theme.spacing(1),
        minWidth: '100px',
        marginLeft: theme.spacing(1.5),
        fontWeight: 'bold',
    }
}))

export default function Column({ column, tasks, index }) {
    const classes = useStyles()
    const [cardTitle, setCardTitle] = useState('')
    const [addCardFlag, setAddCardFlag] = useState(false)
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

    return (
        <Draggable draggableId={column._id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps}
                    ref={provided.innerRef}>
                    <Paper elevation={0}
                        className={classes.root}
                        {...provided.dragHandleProps}>
                        <div className={classes.title} >
                            {column.name}
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
                                        {provided.placeholder}
                                    </div>
                                    {addFlag.current &&
                                        <AddItem handleClick={handleAddition} icon={<AddIcon />}
                                            btnText='Add another card' type='card' />
                                    }
                                    {addCardFlag &&
                                        <InputCard
                                            value={cardTitle}
                                            changedHandler={handleChange}
                                            itemAdded={submitHandler}
                                            closeHandler={closeButtonHandler}
                                            type='card'
                                            btnText='Add Card'
                                        />
                                    }
                                </div>
                            )}
                        </Droppable>
                    </Paper>
                </div>
            )}
        </Draggable>
    )
}
