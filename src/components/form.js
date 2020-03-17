import React, {useState} from 'react'

export default function TodoForm(props) {
    const [input, setInput] = useState('')

    const handleChange = e => setInput(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        let temp = input.replace(/ /g, '') !== '' ? props.setter(e, input) : '';
        console.log(temp)
        setInput('')
    }

    return (
        <form className='new-todo-form' onSubmit={handleSubmit}>
            <input 
            type='text'
            className='new-todo'
            placeholder='Enter a todo item...'
            autoComplete='off'
            required
            name='new-todo'
            value={input}
            onChange={handleChange}
            />
        </form>
    )
}