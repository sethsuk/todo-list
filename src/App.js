import './App.css';
import { useState } from 'react';

import TodoForm from './Components/TodoForm.js';
import TodoList from "./Components/TodoList.js";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


function App() {
  const [todos, setTodos] = useState([]);

  const theme = createTheme({
    palette: {
        primary: {
            main: "#84714F",
        },
        secondary: {
            main: "#5296A5",
        },
        text: {
            primary: "#293241",
            secondary: "#420039"
        },
        background: {
            default: "#FCD7AD",
        },
    },
    typography: {
        fontFamily: "'DM Serif Text', serif",
    },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <p>React Todo</p>
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
