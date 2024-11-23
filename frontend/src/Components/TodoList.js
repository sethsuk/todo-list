import React from "react";
import Todo from "./Todo";

function TodoList({ todos, toggleComplete, removeTodo }) {
    return(
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <ul style={{ listStyle: 'none' }}>
                {todos.map(todo => (
                    <Todo todo={todo} toggleComplete={toggleComplete} removeTodo={removeTodo} />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;