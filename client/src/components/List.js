import React, { useState } from 'react'
import Card from './Card'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import CreateItem from './CreateItem'
import { createNewCard } from '../actions/actionCreators/cardActions'
import { useDispatch } from 'react-redux'
import midString from '../ordering/ordering'

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 2px;
`
const Title = styled.h3`
    padding:8px;
    min-width: 100px;
`
const TaskList = styled.div`
    padding: 8px;
`

export default function Column({ column, tasks }) {
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
        <Container>
            <Title>{column.name}</Title>
            <Droppable droppableId={column._id}>
                {(provided) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => <Card key={task._id} task={task} index={index} />)}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
            <CreateItem value={cardTitle} changedHandler={handleChange} itemAdded={submitHandler} />
        </Container>
    )
}
