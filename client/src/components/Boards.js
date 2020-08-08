import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllBoards, createNewBoard } from '../actions/actionCreators/boardActions'
import { Link } from 'react-router-dom'
import CreateItem from './CreateItem'

export default function Boards() {
    const [boardTitle, setBoardTitle] = useState('')
    const { boards, loading, error } = useSelector(state => state.boards)
    // var { success, validationError } = useSelector(state => state.postBoard)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllBoards())
    }, [dispatch])

    const handleChange = (e) => {
        e.preventDefault()
        setBoardTitle(e.target.value)
    }

    const submitHandler = () => {
        const postBoardReq = {
            name: boardTitle
        }
        dispatch(createNewBoard(postBoardReq))
        setBoardTitle('')
    }

    return (
        <div>
            <CreateItem value={boardTitle} changedHandler={handleChange} itemAdded={submitHandler} />
            {loading && <h1>Loading ....</h1>}
            {error && <h1>Error occured...Try Refreshing!!</h1>}
            {boards.map(board => {
                return (
                    <Link key={board._id} to={`/b/${board._id}/${board.name}`} >
                        <div key={board._id}>{board.name}</div>
                    </Link>
                )
            })}
        </div >
    )
}

