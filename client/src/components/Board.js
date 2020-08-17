import React, { useEffect, useState, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoardById, fetchListsFromBoard, fetchsCardsFromBoard, fetchActivitiesFromBoard, updateBoardById }
    from '../actions/actionCreators/boardActions'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import List from './List'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import midString from '../ordering/ordering'
import { updateCardById } from '../actions/actionCreators/cardActions'
import { createNewList, updateListById } from '../actions/actionCreators/listActions'
import InputCard from './InputCard'
import { createNewActivity, deleteActivityById } from '../actions/actionCreators/activityActions'
import moment from 'moment'
import AddItem from './AddItem'
import Header from './Header'
import BoardHeader from './BoardHeader'
import SideMenu from './SideMenu'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        overflowY: 'auto',
    },
    listContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: theme.spacing(-10.5)
    },
    wrapper: {
        marginTop: theme.spacing(11.5)
    }
}))

export default function Board() {
    const classes = useStyles()
    var { id, name } = useParams()
    const { loading, currBoard, error } = useSelector(state => state.boards)
    const { listLoading, lists, listError } = useSelector(state => state.lists)
    const { cardLoading, cards, cardError } = useSelector(state => state.cards)
    const { activities } = useSelector(state => state.activities)
    const [initialData, setInitialData] = useState({})
    const [initDone, setInitDone] = useState(false)
    var addFlag = useRef(true)
    const [addListFlag, setAddListFlag] = useState(false)
    const [listTitle, setListTitle] = useState('')
    const [color, setColor] = useState('white')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    if (!loading && name !== currBoard.name && currBoard.name !== undefined) {
        name = currBoard.name
    }

    useEffect(() => {
        if (id.length === 24) {
            dispatch(fetchBoardById(id))
            dispatch(fetchListsFromBoard(id))
            dispatch(fetchsCardsFromBoard(id))
            dispatch(fetchActivitiesFromBoard(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if (!_.isEmpty(currBoard)) {
            setColor(currBoard.image.color)
            setUrl(currBoard.image.full)
        }
    }, [currBoard])

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
        console.log(result)
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
            setInitialData(newData)
            return
        }

        // Move from one list to another
        if (endList.taskIds.length === 0)
            newOrder = 'n'
        else {
            if (destination.index === 0) {
                newOrder = midString('', initialData.tasks[endList.taskIds[0]].order)
            }
            else if (destination.index === endList.taskIds.length)
                newOrder = midString(initialData.tasks[endList.taskIds[destination.index - 1]].order, '')
            else
                newOrder = midString(initialData.tasks[endList.taskIds[destination.index - 1]].order,
                    initialData.tasks[endList.taskIds[destination.index]].order)
        }
        dispatch(updateCardById(draggableId, { order: newOrder, listId: endList._id }))
        const text = `User moved ${initialData.tasks[draggableId].name} from ${startList.name} to ${endList.name}`
        const recentActivity = activities[activities.length - 1]
        if (recentActivity.text === `User moved ${initialData.tasks[draggableId].name} from ${endList.name} to ${startList.name}` &&
            moment(recentActivity.createdAt).fromNow().includes('second')) {
            dispatch(deleteActivityById(recentActivity._id))
        }
        else
            dispatch(createNewActivity({ text, boardId: currBoard._id }))

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
        setInitialData(newData)
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
        if (listTitle === '')
            return
        const totalLists = initialData.columnOrder.length
        const postListReq = {
            name: listTitle,
            boardId: currBoard._id,
            order: totalLists === 0 ? 'n' : midString(
                initialData.columns[initialData.columnOrder[totalLists - 1]].order, '')
        }
        dispatch(createNewList(postListReq))
        dispatch(createNewActivity({
            text: `User added ${listTitle} to this board`,
            boardId: currBoard._id
        }))
        setListTitle('')
    }

    const closeButtonHandler = () => {
        setAddListFlag(false)
        addFlag.current = true
        setListTitle('')
    }

    const handleAddition = () => {
        setAddListFlag(true)
        addFlag.current = false
    }
    const setBackground = (background) => {
        if (background.thumb) {
            setUrl(background.full)
            setColor('white')
            dispatch(updateBoardById(currBoard._id,
                {
                    image: {
                        full: background.full,
                        thumb: background.thumb,
                        color: 'white'
                    }
                }))
        }
        else {
            setColor(background)
            setUrl('')
            dispatch(updateBoardById(currBoard._id,
                {
                    image: {
                        full: '',
                        thumb: '',
                        color: background
                    }
                }))
        }
    }

    return (
        <div className={classes.root}
            style={{
                backgroundColor: `${color}`,
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Redirect to={`/b/${id}/${name}`} />
            <Header />
            <BoardHeader title={currBoard.name} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='all-columns' direction='horizontal' type='list'>
                    {provided => (
                        <div className={classes.listContainer}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {initDone && initialData.columnOrder.map((columnId, index) => {
                                const column = initialData.columns[columnId]
                                const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
                                return <List key={column._id} column={column}
                                    tasks={tasks} index={index} />
                            })}
                            <div className={classes.wrapper}>
                                <div>
                                    {addFlag.current &&
                                        <AddItem handleClick={handleAddition}
                                            btnText='Add another list' type='list' icon={<AddIcon />} width='256px' />}
                                    {addListFlag &&
                                        <InputCard
                                            value={listTitle}
                                            changedHandler={handleChange}
                                            itemAdded={submitHandler}
                                            closeHandler={closeButtonHandler}
                                            type='list'
                                            btnText='Add List'
                                            placeholder='Enter list title...'
                                            width='230px'
                                            marginLeft='1'
                                        />
                                    }
                                </div>
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <SideMenu setBackground={setBackground} />
            {/* <Background /> */}
        </div >
    )
}