import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoardById, fetchListsFromBoard, fetchsCardsFromBoard }
    from '../actions/actionCreators/boardActions'
import { DragDropContext } from 'react-beautiful-dnd'
import List from './List'
import _ from 'lodash'
import styled from 'styled-components'
import midString from '../ordering/ordering'
import { updateCardById } from '../actions/actionCreators/cardActions'

const Container = styled.div`
    display: flex;
`
export default function BoardView() {
    var { id, name } = useParams()
    const { loading, currBoard, error } = useSelector(state => state.boards)
    const { listLoading, lists, listError } = useSelector(state => state.lists)
    const { cardLoading, cards, cardError } = useSelector(state => state.cards)
    const [initialData, setInitialData] = useState({})
    const [initDone, setInitDone] = useState(false)
    const dispatch = useDispatch()

    if (!loading && name !== currBoard.name && currBoard.name !== undefined) {
        console.log(name)
        name = currBoard.name
    }

    useEffect(() => {
        dispatch(fetchBoardById(id))
        dispatch(fetchListsFromBoard(id))
        dispatch(fetchsCardsFromBoard(id))
    }, [dispatch, id])


    useEffect(() => {
        if (!listLoading && !cardLoading) {
            const prevState = { tasks: {}, columns: {}, columnOrder: [] }
            const getTaskIds = (id) => {
                const val = _.filter(cards, { listId: id })
                const ans = []
                val.forEach(v => ans.push(v._id))
                return _.orderBy(ans, ['order'], ['asc'])
            }
            const setContent = () => {
                cards.forEach(card => (
                    prevState.tasks[card._id] = card
                ))
                lists.forEach(list => {
                    prevState.columns[list._id] = { ...list, taskIds: getTaskIds(list._id) }
                    prevState.columnOrder.push(list._id)
                })
            }
            setContent()
            setInitialData({ ...prevState })
            setInitDone(true)
        }
    }, [setInitDone, listLoading, cardLoading, setInitialData, cards, lists])

    const onDragEnd = (result) => {
        var newOrder
        const { destination, source, draggableId } = result
        if (!destination)
            return
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return
        const column = initialData.columns[source.droppableId]
        if (destination.index === 0)
            newOrder = midString('', initialData.tasks[column.taskIds[0]].order)
        else if (destination.index === column.taskIds.length - 1)
            newOrder = midString(initialData.tasks[column.taskIds[destination.index]].order, '')
        else
            newOrder = midString(initialData.tasks[column.taskIds[destination.index]].order,
                initialData.tasks[column.taskIds[destination.index + 1]].order)
        dispatch(updateCardById(draggableId, { order: newOrder }))
        const newTaskIds = Array.from(column.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)
        const newColumn = {
            ...column,
            taskIds: newTaskIds
        }
        const newData = {
            ...initialData,
            columns: {
                ...initialData.columns,
                [newColumn._id]: newColumn
            }
        }
        setInitialData(newData)
    }

    return (
        <div>
            <Redirect to={`/b/${id}/${name}`} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    {initDone && initialData.columnOrder.map(columnId => {
                        const column = initialData.columns[columnId]
                        const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
                        return <List key={column._id} column={column}
                            tasks={tasks} />
                    })}
                </Container>
            </DragDropContext>
        </div >
    )
}
