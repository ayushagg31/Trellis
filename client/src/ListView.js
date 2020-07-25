import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import useFetchBoards from './useFetchBoards'

export default function ListView() {
    var { id, name } = useParams()
    const { board, loading, error } = useFetchBoards(id)
    // Get the name of board based on Id
    if (!name)
        name = ""
    var urlName = name
    if (board && board.name)
        urlName = board.name
    return (
        <div>
            <Redirect to={`/b/${id}/${urlName}`} />
            {id}
            <br />
            {board && board.name}
            {loading && <h1>Loading....</h1>}
            {error && <h1>Some error occured</h1>}
            <br />
        </div>
    )
}