import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import "./HeroSection.css";
import logoImage from "../../src/components/pages/kmg3.png";

function HeroSection() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />

      <h1>
        <img src={logoImage} alt="Logo" className="logo" /> ENTERPRISES
      </h1>
      <p>RUST 2 RUSTLESS</p>
      {loggedIn === true ? (
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default HeroSection;
