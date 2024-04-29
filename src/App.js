import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Services from "./components/pages/Employees";
import Products from "./components/pages/Site";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";

// Custom Route component to handle authentication
const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Perform login logic, set loggedIn state to true
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic, set loggedIn state to false
    setLoggedIn(false);
    // Clear user data from localStorage
    localStorage.removeItem("user");
  };

  return (
    <>
      <Router>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute
            path="/services"
            component={Services}
            loggedIn={loggedIn}
          />
          <PrivateRoute
            path="/products"
            component={Products}
            loggedIn={loggedIn}
          />
          <Route path="/login">
            <Login onLogin={handleLogin} />
          </Route>
          {/* Add more routes as needed */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
