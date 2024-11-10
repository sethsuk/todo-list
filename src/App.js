import './App.css';
import { useState } from 'react';

import TodoForm from './Components/TodoForm.js';
import TodoList from "./Components/TodoList.js";


function App() {
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return todo;
        }
      })
    );
  }

  function removeTodo(id) {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>React Todo</p>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
      </header>
    </div>
  );
}

export default App;
