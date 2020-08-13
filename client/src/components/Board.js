import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoardById, fetchListsFromBoard, fetchsCardsFromBoard }
    from '../actions/actionCreators/boardActions'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import List from './List'
import _ from 'lodash'
import styled from 'styled-components'
import midString from '../ordering/ordering'
import { updateCardById } from '../actions/actionCreators/cardActions'
import { createNewList, updateListById } from '../actions/actionCreators/listActions'
import CreateItem from './CreateItem'

const Container = styled.div`
    display: flex;
`

export default function Board() {
    var { id, name } = useParams()
    const { loading, currBoard, error } = useSelector(state => state.boards)
    const { listLoading, lists, listError } = useSelector(state => state.lists)
    const { cardLoading, cards, cardError } = useSelector(state => state.cards)
    const [initialData, setInitialData] = useState({})
    const [initDone, setInitDone] = useState(false)
    const [listTitle, setListTitle] = useState('')
    const dispatch = useDispatch()

    if (!loading && name !== currBoard.name && currBoard.name !== undefined) {
        name = currBoard.name
    }

    useEffect(() => {
        if (id.length === 24) {
            dispatch(fetchBoardById(id))
            dispatch(fetchListsFromBoard(id))
            dispatch(fetchsCardsFromBoard(id))
        }
    }, [dispatch, id])


    useEffect(() => {
        if (!listLoading && !cardLoading) {
            const prevState = { tasks: {}, columns: {}, columnOrder: [] }

            const getTaskIds = (id) => {
                const filteredTasks = _.filter(cards, { listId: id })
                const sortedTasks = _.orderBy(filteredTasks, ['order'], ['asc'])
                const taskIds = []
                sortedTasks.forEach(task => taskIds.push(task._id))
                return taskIds
            }

            const setContent = () => {
                cards.forEach(card => (
                    prevState.tasks[card._id] = card
                ))
                const sortedLists = _.orderBy(lists, ['order'], ['asc'])
                sortedLists.forEach(list => {
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
        const { destination, source, draggableId, type } = result
        if (!destination)
            return
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return

        if (type === 'list') {
            const listOrder = initialData.columnOrder
            if (destination.index === 0) {
                newOrder = midString('', initialData.columns[listOrder[0]].order)
            }
            else if (destination.index === listOrder.length - 1) {
                newOrder = midString(initialData.columns[listOrder[destination.index]].order, '')
            }
            else {
                if (destination.index < source.index) {
                    newOrder = midString(initialData.columns[listOrder[destination.index - 1]].order,
                        initialData.columns[listOrder[destination.index]].order)
                }
                else {
                    newOrder = midString(initialData.columns[listOrder[destination.index]].order,
                        initialData.columns[listOrder[destination.index + 1]].order)
                }
            }
            dispatch(updateListById(draggableId, { order: newOrder }))
            const newListOrder = Array.from(initialData.columnOrder)
            const destinationColumn = initialData.columns[draggableId]
            destinationColumn.order = newOrder
            newListOrder.splice(source.index, 1)
            newListOrder.splice(destination.index, 0, draggableId)
            const newData = {
                ...initialData,
                columnOrder: newListOrder,
                columns: {
                    ...initialData.columns,
                    draggableId: destinationColumn
                }
            }
            setInitialData(newData)
            return
        }
        const startList = initialData.columns[source.droppableId]
        const endList = initialData.columns[destination.droppableId]

        if (startList === endList) {
            const column = startList
            if (destination.index === 0)
                newOrder = midString('', initialData.tasks[column.taskIds[0]].order)
            else if (destination.index === column.taskIds.length - 1)
                newOrder = midString(initialData.tasks[column.taskIds[destination.index]].order, '')
            else {
                if (destination.index < source.index)
                    newOrder = midString(initialData.tasks[column.taskIds[destination.index - 1]].order,
                        initialData.tasks[column.taskIds[destination.index]].order)
                else
                    newOrder = midString(initialData.tasks[column.taskIds[destination.index]].order,
                        initialData.tasks[column.taskIds[destination.index + 1]].order)
            }

            dispatch(updateCardById(draggableId, { order: newOrder }))
            const newTaskIds = Array.from(column.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)
            const destinationTask = initialData.tasks[draggableId]
            destinationTask.order = newOrder
            const newColumn = {
                ...column,
                taskIds: newTaskIds
            }
            const newData = {
                ...initialData,
                columns: {
                    ...initialData.columns,
                    [newColumn._id]: newColumn
                },
                tasks: {
                    ...initialData.tasks,
                    draggableId: destinationTask
                }
            }
            if (!cardError) {
                setInitialData(newData)
            }

            return
        }

        // Move from one list to another
        if (endList.taskIds.length === 0)
            newOrder = 'n'
        else {
            if (destination.index === 0) {
                console.log('hi')
                newOrder = midString('', initialData.tasks[endList.taskIds[0]].order)
            }
            else if (destination.index === endList.taskIds.length)
                newOrder = midString(initialData.tasks[endList.taskIds[destination.index - 1]].order, '')
            else
                newOrder = midString(initialData.tasks[endList.taskIds[destination.index - 1]].order,
                    initialData.tasks[endList.taskIds[destination.index]].order)
        }
        dispatch(updateCardById(draggableId, { order: newOrder, listId: endList._id }))

        const startTaskIds = Array.from(startList.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStartList = {
            ...startList,
            taskIds: startTaskIds
        }
        const destinationTask = initialData.tasks[draggableId]
        destinationTask.order = newOrder
        const endTaskIds = Array.from(endList.taskIds)
        endTaskIds.splice(destination.index, 0, draggableId)
        const newEndList = {
            ...endList,
            taskIds: endTaskIds
        }
        const newData = {
            ...initialData,
            columns: {
                ...initialData.columns,
                [newStartList._id]: newStartList,
                [newEndList._id]: newEndList
            },
            tasks: {
                ...initialData.tasks,
                draggableId: destinationTask
            }
        }
        if (!cardError) {
            setInitialData(newData)
            console.log(`User moved ${initialData.tasks[draggableId].name} from ${startList.name} to ${endList.name}`)
        }
    }

    if (id.length < 24)
        return (
            <h1>Invalid URL</h1>
        )
    const handleChange = (e) => {
        e.preventDefault()
        setListTitle(e.target.value)
    }

    const submitHandler = () => {
        const totalLists = initialData.columnOrder.length
        const postListReq = {
            name: listTitle,
            boardId: currBoard._id,
            order: totalLists === 0 ? 'n' : midString(
                initialData.columns[initialData.columnOrder[totalLists - 1]].order, '')
        }
        dispatch(createNewList(postListReq))
        console.log(`User added ${listTitle} to this board`)
        setListTitle('')
    }


    return (
        <div>
            <Redirect to={`/b/${id}/${name}`} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='all-columns' direction='horizontal' type='list'>
                    {provided => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {initDone && initialData.columnOrder.map((columnId, index) => {
                                const column = initialData.columns[columnId]
                                const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
                                return <List key={column._id} column={column}
                                    tasks={tasks} index={index} />
                            })}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
                <CreateItem value={listTitle} changedHandler={handleChange} itemAdded={submitHandler} />
            </DragDropContext>
        </div >
    )
}