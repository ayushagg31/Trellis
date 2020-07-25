import React, { useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoardById } from '../actions/actionCreators/BoardActions'
import _ from 'lodash'

export default function ListView() {
    var { id, name } = useParams()
    const { loading, currBoard, error } = useSelector(state => state.boards)
    const dispatch = useDispatch()

    if (_.isEmpty(currBoard)===false) {
        name = currBoard.name
    }
    useEffect(() => {
        dispatch(fetchBoardById(id))
    }, [dispatch, id])

    return (
        <div>
            <Redirect to={`/b/${id}/${name}`} />
            {loading && <h1>Loading</h1>}
            {currBoard._id}
            <br />
            {currBoard.name}
            {error && <h1>error occured</h1>}

        </div>
    )
}
