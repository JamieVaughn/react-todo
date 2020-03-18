import React, { useState, useEffect } from 'react'
import TodoItem from './todoitem'

export default function TodoList(props) {
    const handlePrioritize = (e, id) => {
        e.target.nextElementSibling.nextElementSibling.classList.toggle('priority')
        props.setter('isPriority', id)
    }
    
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
                props.list ? props.list.map(i => (
                    !i.deleted ?
                    <li key={i.id}>
                        <button
                        title='Set this item as a priority item'
                        className='prioritize'
                        onClick={e => handlePrioritize(e, i.id)}
                        >❗</button>
                        <input
                        title='Mark Todo completed'
                        onClick={(e) => handleComplete(e, i.id)}
                        defaultChecked={i.done}
                        type='checkbox'
                        />
                        <TodoItem 
                        todo={i}
                        setter={props.setter}
                        />
                        <span
                        title='Delete this todo'
                        onClick={() => handleDelete(i.id)}
                        className='delete'>
                            ╳
                        </span>
                    </li>
                : '' )) : ''
            }
            <li className='empty-state'>No Todos Left!</li>
        </ul>
    )
}