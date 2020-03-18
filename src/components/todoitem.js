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
            value={props.todo.text}
            onChange={e=>setText(e.target.value)}
            onBlur={handleSubmit}
            />
            <div className="footnotes">
                {props.todo.category ? props.todo.category.map(c => <span key={c} className="category">{c}</span>) : ''}
                <span className='timestamp'>{props.todo.done ? props.todo.doneOn : props.todo.createdOn}</span>
            </div>
        </span>
    )
}