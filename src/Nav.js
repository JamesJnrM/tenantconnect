
import { Link } from 'react-router-dom';
import { useState } from "react";
import logo from "./assets/logo.png";

export default function Nav({ toggleLogin, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <div>
      <nav className="nav">
        <div className="logo">
          <div className="logo-mark">
            <img src={logo} alt="Logo" width="30" height="30" />
          </div>
          Tenant Connect
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/listings">View listings</Link>
          <Link to="/About">About Us</Link>
          <a href="#">WhatsApp</a>
        </div>

        {!user ? (
          <div className="nav-right">
            <button className="btn-ghost" onClick={toggleLogin}>
              Log in
            </button>
          </div>
        ) : (
          <div style={{ marginLeft: 'auto' }}>
            <button
              className="btn-ghost"
              style={{
                borderRadius: '50%',
                padding: '0.5em',
                height: '2em',
                width: '2em'
              }}
              onClick={() => setProfile(!profile)}
            >
              {(user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U").toUpperCase()}
            </button>
          </div>
        )}

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <Link to="/">Home</Link>
            <Link to="/listings">View listings</Link>
            <Link to="/About">About Us</Link>
            <a href="#">WhatsApp</a>
          </div>
        )}

        {profile && user && (
          <div className="mobile-menu">
            <Link to="/profile">My Profile</Link>
            <Link to="/liked">Liked Properties</Link>
            <Link to="/bookings">Viewings Booked</Link>
            <a href="" style={{color: 'red'}} >Log out</a>
          </div>
        )}
      </nav>
    </div>
  );
}

