import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllBoards, createNewBoard } from '../actions/actionCreators/boardActions'
import { Link } from 'react-router-dom'

export default function Boards() {
    const [title, setTitle] = useState('')
    const { boards, loading, error } = useSelector(state => state.boards)
    // var { success, validationError } = useSelector(state => state.postBoard)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllBoards())
    }, [dispatch])

    const handleSubmit = () => {
        const postReq = {
            name: title
        }
        dispatch(createNewBoard(postReq))
        setTitle('')
    }
    return (
        <div>
            <input type="text" value={title} onChange={(e) => {
                e.preventDefault()
                setTitle(e.target.value)
            }} />
            <button onClick={handleSubmit}>Add</button>
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

