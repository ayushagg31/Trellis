import React, { useState } from 'react'
import Card from './Card'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import CreateItem from './CreateItem'
import { createNewCard } from '../actions/actionCreators/cardActions'
import { useDispatch } from 'react-redux'
import midString from '../ordering/ordering'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 2px;
    background-color: white;
`
const Title = styled.h3`
    padding:8px;
    min-width: 100px;
`
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.isDraggingOver ? 'skyblue' : 'white'};
`

export default function Column({ column, tasks, index }) {
    const [cardTitle, setCardTitle] = useState('')
    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault()
        setCardTitle(e.target.value)
    }

    const submitHandler = () => {
        const totalTasks = tasks.length
        const postCardReq = {
            name: cardTitle,
            boardId: column.boardId,
            listId: column._id,
            order: totalTasks === 0 ? 'n' : midString(tasks[totalTasks - 1].order, '')
        }
        dispatch(createNewCard(postCardReq))
        setCardTitle('')
    }

    return (
        <Draggable draggableId={column._id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Title {...provided.dragHandleProps}>
                        {column.name}
                    </Title>
                    <Droppable droppableId={column._id} type='card'>
                        {(provided, snapshot) => (
                            <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {tasks.map((task, index) => <Card key={task._id} task={task} index={index} />)}
                                {provided.placeholder}
                            </TaskList>
                        )}
                    </Droppable>
                    <CreateItem value={cardTitle} changedHandler={handleChange} itemAdded={submitHandler} />
                </Container>
            )}
        </Draggable>
    )
}
