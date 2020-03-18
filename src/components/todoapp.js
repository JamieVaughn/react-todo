import React from 'react'
import UseIdb from './useidb'
import TodoForm from './form'
import TodoList from './list'

export default function TodoApp() {
    const [todos, setTodos] = UseIdb('todos', [])

    const getDate = () => new Date().toLocaleString()

    const appendTodo = (text) => {
        let parsed = text.split('#')
        let todoObj = {
            id: +String(Math.random()).slice(2,7),
            text: parsed[0],
            createdOn: getDate(),
            isPriority: false,
            done: false,
            doneOn: null,
            deleted: false,
            deletedOn: null,
            category: parsed.slice(1).map(c=>c.toLowerCase())
        }
        setTodos([...todos, todoObj])
    }

    const reducer = (action, id, text) => {
        switch(action) {
            case "delete":
                setTodos(todos.map(i => {
                    if(i.id === id) {
                        i.deleted = !i.deleted
                        i.deleted ? i.deletedOn = getDate() : i.deletedOn = null
                    }
                    return i
                }))
                break;
            case "update":
                setTodos(todos.map(i => {
                    if(i.id === id) i.text = text
                    return i
                }))
                break;
            case "isComplete":
                setTodos(todos.map(i => {
                    if(i.id === id) {
                        i.done = !i.done
                        i.done ? i.doneOn = getDate() : i.doneOn = null
                    }
                    return i
                }))
                break;
            case "isPriority":
                setTodos(todos.map(i => {
                    if(i.id === id) i.isPriority = !i.isPriority
                    return i
                }))
                break;
            default:
                console.log("no action found")
                break;

        }
    }
    const inspectState = () => (console.log('deleted',todos.filter(i=>i.deleted)),console.log('!deleted',todos.filter(i=>!i.deleted)))
    const restore = () => {
        let restored = todos.map(t=> {
            t.deleted = false
            return t
        })
        setTodos(restored)
    }
    const sortAZ = () => {
        let sorted = todos.sort((a,b) => {
            return (a.text<b.text) ? -1 : (a.text > b.text) ? 1 : 0;
        })
        setTodos([...sorted])
    }
    return (
        <div className='page-wrapper'>
            <h1 onClick={inspectState}>React Todo App</h1>
            <h4>with Async, In-Memory DB</h4>
            <h6>(Add category tag chips with '#' symbol)</h6>
            <TodoForm setter={(e, text)  => appendTodo(text)} />
            <TodoList list={todos} setter={reducer}/>
            <footer>
                <span>total: {todos ? todos.length : ''}</span>
                <button onClick={restore}>Restore Deleted</button>
                <button onClick={sortAZ}>Sort A-Z</button>
                <button onClick={() => setTodos([])}>Clear All Permanently</button>
            </footer>
        </div>
    )
}