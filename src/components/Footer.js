import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import logoImage from "../../src/components/pages/kmg3.png";

function Footer() {
  return (
    <div className="footer-container">
      {/* <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Adventure newsletter to receive our best vacation deals
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section> */}
      <div class="footer-links">
        <div className="footer-link-wrapper">
          {/* <div class="footer-link-items">
            <h2>About Us</h2>
            <Link to="/login">How it works</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Terms of Service</Link>
          </div> */}
          <div class="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/">Mob: 8660165814 , 9902330043</Link>
            <Link to="/">Email: Kmenterprises0897@gmail.com </Link>
            <Link to="/">Office Address : Kulur junction, Mangalore</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          {/* <div class="footer-link-items">
            <h2>Videos</h2>
            <Link to="/">Submit Video</Link>
            <Link to="/">Ambassadors</Link>
            <Link to="/">Agency</Link>
            <Link to="/">Influencer</Link>
          </div> */}
          <div class="footer-link-items">
            <h2>Social Media</h2>
            <a
              href="https://www.instagram.com/k.m_enterprises/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <Link to="https://www.instagram.com/k.m_enterprises/">
              Facebook
            </Link>
            {/* <Link to="/">Youtube</Link>
            <Link to="/">Twitter</Link> */}
          </div>
        </div>
      </div>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <img src={logoImage} alt="Logo" className="logo" />
          </div>
          <small class="website-rights">KM © 2022</small>
          <div class="social-icons">
            <Link
              class="social-icon-link facebook"
              to="k.m_enterprises/"
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f" />
            </Link>
            <a
              className="social-icon-link instagram"
              href="https://www.instagram.com/k.m_enterprises/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
            <Link
              class="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i class="fab fa-youtube" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter" />
            </Link>
            <Link
              class="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
