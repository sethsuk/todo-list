import './App.css';
import { useState, useEffect } from 'react';

import TodoForm from './Components/TodoForm.js';
import TodoList from "./Components/TodoList.js";
import Login from './Components/Login.js';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


function App() {
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState('');
  const [logged_in, setLogged_in] = useState(false);

  const rootURL = "http://localhost:5000";

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

  function getTodo() {
    fetch(`${rootURL}/getTodo`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Todos fetched successfully:', data);

      setTodos(data);
    });
  }

  useEffect(() => {
    getTodo();
  }, []);

  function addTodo(todo) {
    var call_body = todo

    fetch(`${rootURL}/addTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(call_body)
    })
    .then(() => {
      getTodo()
    })
  }

  function toggleComplete(id) {
    var call_body = {
      "id": id
    }

    fetch(`${rootURL}/toggleTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(call_body)
    })
    .then(() => {
      getTodo()
    })
  }

  function removeTodo(id) {
    var call_body = {
      "id": id
    }

    fetch(`${rootURL}/removeTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(call_body)
    })
    .then(() => {
      getTodo()
    })
  }

  function handleLogin(user) {
    setUsername(user);
    setLogged_in(true);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <h1>React Todo</h1>
        </header>
  
        <main>
          {logged_in ? (
            <>
              <TodoForm addTodo={addTodo} />
              <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </main>
      </div>
    </ThemeProvider>
  );  
}

export default App;
