import React from 'react'
import UseIdb from './useidb'
import TodoForm from './form'
import TodoList from './list'

export default function TodoApp() {
    const [todos, setTodos] = UseIdb('todos', [])
    
    

    const appendTodo = (text) => {
        let todoObj = { 
            id: +String(Math.random()).slice(2,7),
            text: text,
            done: false
        }
        setTodos([...todos, todoObj])
    }

    const reducer = (action, id, text) => {
        switch(action) {
            case "delete":
                setTodos(todos.filter(i => i.id !== id ))
            break;
            case "update":
                setTodos(todos.map(i => {
                    if(i.id === id) i.text = text
                    return i
                }))
            break;
            case "isComplete":
                setTodos(todos.map(i => {
                    if(i.id === id) i.done = !i.done
                    return i
                }))
            break;
            // case "undone":
            //     setTodos(todos.map(i => {
            //         if(i.id === id) i.done = true
            //         return i
            //     }))
            // break;
            default:
                console.log("no action found")
                break;

        }
    }

    return (
        <div className='page-wrapper'>
            <h1 onClick={() => console.log(todos)}>React Todo App</h1>
            <h2>with Async, In-Memory DB</h2>
            <TodoForm setter={(e, text)  => appendTodo(text)} />
            <TodoList list={todos} setter={reducer}/>
            <footer>
                <span>total: {todos.length}</span>
                <button onClick={() => setTodos([])}>Clear All</button>
            </footer>
        </div>
    )
}