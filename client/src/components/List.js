import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, makeStyles, InputBase, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from './Card'
import InputCard from './InputCard'
import { createNewCard } from '../actions/actionCreators/cardActions'
import midString from '../ordering/ordering'
import { createNewActivity } from '../actions/actionCreators/activityActions'
import AddItem from './AddItem'
import {
  updateListById,
  deleteListById,
} from '../actions/actionCreators/listActions'

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
    overflowX: 'hidden',
    // overflowY: 'auto',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    height: '100%',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid green',
    },
  },
  title: {
    padding: theme.spacing(1, 1, 1, 1),
    minWidth: '100px',
    marginLeft: theme.spacing(1.5),
    fontWeight: 'bold',
  },
  wrapper: {
    marginTop: theme.spacing(10.3),
  },
  editable: {
    marginLeft: theme.spacing(-1),
    wordWrap: 'break-word',
    padding: theme.spacing(0, 1, 0, 1),
    boxShadow: 'inset 0 0 0 2px #0079bf',
    width: '210px',
    borderRadius: 4,
  },
}))

export default function Column({ column, tasks, filteredTasks, index}) {
  const classes = useStyles()
  const [cardTitle, setCardTitle] = useState('')
  const [listTitle, setListTitle] = useState(column.name)
  const [addCardFlag, setAddCardFlag] = useState(false)
  const [editable, setEditable] = useState(false)
  const [list, setList] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const { token, user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    e.preventDefault()
    setCardTitle(e.target.value)
  }

  const submitHandler = () => {
    if (cardTitle === '') return
    const text = cardTitle.trim().replace(/\s+/g, ' ')
    setCardTitle(text)
    const totalTasks = tasks.length
    const postCardReq = {
      name: text,
      boardId: column.boardId,
      listId: column._id,
      order:
        totalTasks === 0 ? 'n' : midString(tasks[totalTasks - 1].order, ''),
    }
    dispatch(createNewCard(postCardReq, token))
    dispatch(
      createNewActivity(
        {
          text: `${user.username} added ${text} to ${column.name}`,
          boardId: column.boardId,
        },
        token,
      ),
    )
    setCardTitle('')
  }
  const handleAddition = () => {
    setAddCardFlag(true)
  }
  const closeButtonHandler = () => {
    setAddCardFlag(false)
    setCardTitle('')
  }
  const changedHandler = (e) => {
    e.preventDefault()
    setListTitle(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitHandler()
    }
  }
  const updateListTitle = () => {
    const text = listTitle.trim().replace(/\s+/g, ' ')
    if (text === '') {
      setListTitle(column.name)
      setEditable(false)
      return
    }
    setListTitle(text)
    dispatch(updateListById(column._id, { name: listTitle }))
    // eslint-disable-next-line no-param-reassign
    column.name = text
    setEditable(false)
  }

  return (
    <div className={classes.wrapper}>
      {list && (
        <Draggable draggableId={column._id} index={index}>
          {(provided) => (
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <Paper
                elevation={0}
                onMouseEnter={() => setShowDelete(true)}
                onMouseLeave={() => setShowDelete(false)}
                className={classes.root}
                {...provided.dragHandleProps}
              >
                <div
                  className={classes.title}
                  onClick={() => setEditable(true)}
                >
                  {!editable && (
                    <div style={{ position: 'relative' }}>
                      <div>{column.name}</div>
                      {showDelete && (
                        <IconButton
                          size="small"
                          style={{
                            right: 0,
                            top: 0,
                            position: 'absolute',
                            backgroundColor: '#EBECF0',
                            zIndex: 100,
                          }}
                          onClick={() => {
                            setList(false)
                            dispatch(deleteListById(column._id))
                            const text = `${user.username} deleted list ${column.name}`
                            dispatch(
                              createNewActivity(
                                { text, boardId: column.boardId },
                                token,
                              ),
                            )
                          }}
                        >
                          <DeleteIcon
                            fontSize="small"
                            style={{ backgroundColor: '#EBECF0' }}
                          />
                        </IconButton>
                      )}
                    </div>
                  )}
                  {editable && (
                    <div className={classes.editable}>
                      <InputBase
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
                  )}
                </div>
                <Droppable droppableId={column._id} type="card">
                  {
                    // eslint-disable-next-line no-shadow
                    (provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div className={classes.scroll}>
                          {/* eslint-disable-next-line no-shadow */}
                          {filteredTasks.map((task, index) => (
                            <Card key={task._id} task={task} index={index} />
                          ))}
                          {addCardFlag && (
                            <InputCard
                              value={cardTitle}
                              changedHandler={handleChange}
                              itemAdded={submitHandler}
                              closeHandler={closeButtonHandler}
                              keyDownHandler={handleKeyDown}
                              type="card"
                              btnText="Add Card"
                              placeholder="Enter a title for this card..."
                              width="230px"
                            />
                          )}
                          {provided.placeholder}
                        </div>
                        {!addCardFlag && (
                          <AddItem
                            handleClick={handleAddition}
                            icon={<AddIcon />}
                            btnText="Add another card"
                            type="card"
                            width="256px"
                          />
                        )}
                      </div>
                    )
                  }
                </Droppable>
              </Paper>
            </div>
          )}
        </Draggable>
      )}
    </div>
  )
}
