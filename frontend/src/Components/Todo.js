import React from "react";
import { Checkbox, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Todo({ todo, toggleComplete, removeTodo }) {
    function handleCheckboxClick() {
        toggleComplete(todo.id);
    }

    function handleRemoveClick() {
        removeTodo(todo.id)
    }

    return(
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <Checkbox checked={todo.completed} onChange={handleCheckboxClick} sx={{
                    color: "primary",
                    '&.Mui-checked': {
                        color: "secondary" 
                    }
            }}/>
            <Typography
                variant="body1"
                style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "secondary" : "primary"
                }}
            >
            {todo.task}
            </Typography>
            
            <IconButton onClick={handleRemoveClick} sx={{ color: "primary" }}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default Todo;