import React from "react";
import Todo from "./Todo";

function TodoList({ todos, toggleComplete, removeTodo }) {
    return(
        <ul style={{ listStyle: 'none' }}>
            {todos.map(todo => (
                <Todo todo={todo} toggleComplete={toggleComplete} removeTodo={removeTodo} />
            ))}
        </ul>
    );
}

export default TodoList;