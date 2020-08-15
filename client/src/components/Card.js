import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(1),
        width: '230px',
        wordWrap: 'break-word'
    },
}))

// const Container = styled.div`
//     padding: 8px;
//     border: 1px solid lightgray;
//     border-radius: 2px;
//     margin-bottom: 8px;
//     background: ${props => (props.isDragging ? 'lightgreen' : 'white')};
// `

export default function Card({ task, index }) {
    const classes = useStyles()
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Paper className={classes.card} >
                        {task.name}
                    </ Paper>
                </div>
            )}
        </Draggable>
    )
}
