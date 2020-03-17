import React, { useState } from 'react'

export default function TodoItem(props) {
    const [text, setText] = useState(props.todo.text)

    const handleSubmit = e => {
        props.setter('update', props.todo.id, text)
    }

    return (
        <span className={`todo-item ${props.todo.done ? 'done' : ''}`}>
            <input
            type='text'
            className='todo-text'
            value={text}
            onChange={e=>setText(e.target.value)}
            onBlur={handleSubmit}
            />
            <span className='timestamp'>timestamp</span>
        </span>
    )
}