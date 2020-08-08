import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
    padding: 8px;
    border: 1px solid lightgray;
    border-radius: 2px;
    margin-bottom: 8px;
    background: white;
`
export default function Card({ task, index }) {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.name}
                </ Container>
            )}
        </Draggable>
    )
}
