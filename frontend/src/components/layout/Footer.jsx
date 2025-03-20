import React from "react";
import "../../styles/Layout/Footer.css";
import Link from "../../data/Link";

const Footer = () => {
  return (
    <React.Fragment>
      <footer class="footer">    
        <div class="container">
          <div class="row">
            <div class="footer-col">
              <h4>DEVNEST</h4>
              <ul>
                <li>
                  <a href={Link}>about us</a>
                </li>
                <li>
                  <a href={Link}>our services</a>
                </li>
                <li>
                  <a href={Link}>privacy policy</a>
                </li>
                <li>
                  <a href={Link}>affiliate program</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>get help</h4>
              <ul>
                <li>
                  <a href={Link}>Q&A</a>
                </li>
                <li>
                  <a href={Link}>returns</a>
                </li>
                <li>
                  <a href={Link}>order status</a>
                </li>
                <li>
                  <a href={Link}>payment options</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Courses</h4>
              <ul>
                <li>
                  <a href={Link}>Pro courses</a>
                </li>
                <li>
                  <a href={Link}>Free courses</a>
                </li>
                <li>
                  <a href={Link}>Documents</a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>follow us</h4>
              <div class="social-links">
                <a href={Link}>
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href={Link}>
                  <i class="fab fa-twitter"></i>
                </a>
                <a href={Link}>
                  <i class="fab fa-instagram"></i>
                </a>
                <a href={Link}>
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
