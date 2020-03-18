import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoApp from './components/todoapp'
import { useFetch } from './components/usefetch';

function App() {
  const response = useFetch({url: 'https://hooks-api.wxv6.now.sh/todos'})

  return (
    <div className="App">{console.log(response)}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          response.loading ? <div>Loading...</div> 
          : response.error ? <div>There was a problem with the fetch</div>
          : <TodoApp todos={response.data}/> 
        }
      </header>
    </div> 
    )
}

export default App;
