// src/components/LoginPage.js

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Link,
  Grid,
} from "@mui/material";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      history.push("/"); // Redirect to home page if user is already logged in
    }
  }, [history]);

  const handleLogin = async () => {
    try {
      // Simulate API call
      // Replace the following lines with an actual API call
      if (username === "Mashu" && password === "12345") {
        // Save user info to localStorage
        localStorage.setItem("user", JSON.stringify({ username }));
        // Call onLogin to set the loggedIn state in the parent component
        onLogin();
        history.push("/"); // Redirect to home page after successful login
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={10} sm={6} md={4} lg={3}>
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: "10px" }}
            >
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginTop: "10px" }}
          >
            Don't have an account?{" "}
            <Link href="#" onClick={() => alert("Redirect to Register")}>
              Register
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
