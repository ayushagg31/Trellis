import React from 'react'
import Button from '../styled-components/Button'

export default function CreateItem({ value, changedHandler, itemAdded }) {
    return (
        <>
            <input type="text" value={value} onChange={changedHandler} placeholder="asas" />
            <Button onClick={itemAdded}>Add</Button>
        </>
    )
}


