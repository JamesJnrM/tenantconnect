import { Routes, Route, Link } from 'react-router-dom';
import logo from "./assets/logo.png";
export default function Footer(){
    return(
        <footer className="footer-bar">
            <div className="logo">
              <div className="logo-mark">
                <img src={logo} alt="Logo" width="30" height="30" />
              </div>
              Tenant Connect
            </div>
            <div className="footer-links">
             <Link to="/">Home</Link>
              <Link to="/listings">View listings</Link>
              <Link to="/About">About Us</Link>
              <a href="#">WhatsApp</a>
            </div>
            <div className="footer-copy">© 2026 Zanoforge. All rights reserved.</div>
          </footer>
    );
}