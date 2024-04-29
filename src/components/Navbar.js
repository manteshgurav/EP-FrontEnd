// src/components/Navbar.js

import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import logoImage from "../../src/components/pages/kmg3.png";

function Navbar({ loggedIn, onLogout }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const history = useHistory();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    // Perform logout logic, for example, clear localStorage
    localStorage.removeItem("user");
    // Redirect to login page
    history.push("/login");
    // Call parent component's logout handler
    onLogout();
  };

  useEffect(() => {
    showButton();
  }, []);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src={logoImage} alt="Logo" className="logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {loggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    to="/services"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Site
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/products"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Employees
                  </Link>
                </li>
              </>
            )}
            {loggedIn ? (
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          {button && !loggedIn && (
            <Button buttonStyle="btn--outline">Login</Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
