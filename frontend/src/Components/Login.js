import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function Login({ onLogin }) {
    const [inputUsername, setInputUsername] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (inputUsername.trim()) {
        onLogin(inputUsername.trim());
      } else {
        alert("Invalid username");
      }
    };
  
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField
            label="Username"
            variant="outlined"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="Username"
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    );
  }
  
  export default Login;