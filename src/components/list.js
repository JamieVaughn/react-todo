import React from 'react'
import TodoItem from './todoitem'
import { useState } from 'react'

export default function TodoList(props) {
    const handleDelete = id => {
        props.setter('delete', id)
    }

    const handleComplete = (e, id) => {
        e.target.nextElementSibling.classList.toggle('done')
        props.setter('isComplete', id)
    }

    return (
        <ul className='todo-items'>
            {
                props.list.map(i => (
                    <li key={i.id}>
                        <input
                        title='Mark Title'
                        onClick={(e) => handleComplete(e, i.id)}
                        defaultChecked={i.done}
                        type='checkbox'
                        />
                        <TodoItem 
                        todo={i}
                        text={i.text}
                        setter={props.setter}
                        />
                        <span
                        onClick={() => handleDelete(i.id)}
                        className='delete'>
                            X
                        </span>
                    </li>
                ))
            }
            <li className='empty-state'>No Todos Left!</li>
        </ul>
    )
}