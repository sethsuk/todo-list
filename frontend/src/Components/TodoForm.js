import React, { useState } from "react";
import {v4 as uuid} from "uuid";
import { TextField, Button } from "@mui/material";

function TodoForm({ addTodo }) {
    const [todo, setTodo] = useState({
        id: "",
        task: "",
        completed: false
    });

    function handleTaskInputChange(e) {
        setTodo({
            ...todo,
            task: e.target.value
        });
    } 

    function handleSubmit(e) {
        e.preventDefault();
        if (todo.task.trim()) {
            addTodo({...todo, id: uuid()});
            setTodo({ ...todo, task: "" });
        }
    }

    return(
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <TextField 
                    name="task"
                    type="text"
                    variant="outlined"
                    value={todo.task}
                    onChange={handleTaskInputChange}
                    placeholder="Enter your task here!"
                    fullWidth
                    sx={{
                        input: { color: "text" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "white" },
                            "&:hover fieldset": { borderColor: "white" },
                        }
                    }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ textTransform: 'none' }}>Submit</Button>
            </form>
        </div>
    )
}

export default TodoForm;