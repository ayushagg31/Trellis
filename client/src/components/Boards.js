import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllBoards, createNewBoard } from '../actions/actionCreators/boardActions'
import { createNewActivity } from '../actions/actionCreators/activityActions'
import InputCard from './InputCard'
import { makeStyles } from '@material-ui/core'
import Header from './Header'

const imageUrls = {
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE1NzgwNn0',
    full: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE1NzgwNn0'
}
const useStyles = makeStyles((theme) => ({
    card: {
        height: '90px',
        width: '12.8%',
        margin: theme.spacing(1),
        borderRadius: theme.spacing(0.7),
        '&:hover': {
            opacity: 0.7,
            cursor: 'pointer'
        },
        position: 'relative'
    },
    menuContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing(30)
    },
    title: {
        position: 'absolute',
        top: theme.spacing(0),
        left: theme.spacing(0),
        width: '100%',
        wordWrap: 'break-word',
        overflow: 'hidden',
        lineHeight: '1.5em',
        height: '3em',
        color: 'white',
        fontWeight: 'bold',
        padding: theme.spacing(0.7),
    }
}))

export default function Boards() {
    const classes = useStyles()
    const [boardTitle, setBoardTitle] = useState('')
    const { boards, newBoard } = useSelector(state => state.boards)
    const [showInput, setShowInput] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllBoards())
    }, [dispatch])

    const handleChange = (e) => {
        e.preventDefault()
        setBoardTitle(e.target.value)
    }

    useEffect(() => {
        if (newBoard) {
            dispatch(createNewActivity({
                text: 'User created this board',
                boardId: (newBoard._id)
            }))
        }
    }, [newBoard, dispatch])


    const submitHandler = () => {
        if (boardTitle === '')
            return

        const postBoardReq = {
            name: boardTitle,
            image: {
                color: 'white',
                thumb: imageUrls.thumb,
                full: imageUrls.full
            }
        }
        dispatch(createNewBoard(postBoardReq))
        setBoardTitle('')
        setShowInput(false)
    }

    return (
        <div style={{ backgroundColor: '#FAFBFC' }}>
            <Header />
            <div style={{ paddingTop: '80px' }}>
                <div className={classes.menuContainer}>
                    { boards.map(board => {
                        return (
                            < div className={classes.card}
                                key={board._id}
                                style={{
                                    backgroundColor: `${board.image.color}`,
                                    backgroundImage: `url(${board.image.thumb})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    window.location.href = `/b/${board._id}/${board.name}`
                                }}
                            >
                                <div className={classes.title} >
                                    {board.name}
                                </div>
                            </div>
                        )
                    })}
                    {!showInput && <div className={classes.card}
                        style={{ backgroundColor: '#E7E9ED' }}
                        onClick={() => setShowInput(true)}
                    >
                        <div style={{ fontSize: '14px', opacity: 0.8, textAlign: 'center', marginTop: '35px' }}>
                            Create new board
                        </div>
                    </div>}

                    {showInput &&
                        <div className={classes.card}
                            style={{
                                opacity: '1',
                            }}
                        >
                            <InputCard
                                value={boardTitle}
                                changedHandler={handleChange}
                                itemAdded={submitHandler}
                                closeHandler={() => {
                                    setShowInput(false)
                                    setBoardTitle('')
                                }}
                                placeholder='Add board title'
                                btnText='Create'
                                type='list'
                                width='120px'
                            />
                        </div>
                    }
                </div >
            </div >
        </div >
    )
}

