import Nav from "./Nav";
import Footer from './Footer';
import './About.css';
import Login from './Login';
import Error from './Error';
import React, { useState } from 'react';
import Listing from "./listings";
import { Routes, Route, Link } from 'react-router-dom';

export default function About({ user, setMessage, setUser, message }) {
    const [back, setBack] = useState('visible');
    const [log, setLog] = useState(false);
      const toggleLogin = () => {
        setLog(prev => !prev);
    };
    
  
  return (
    <div className="about-page">
    <Nav toggleLogin={toggleLogin} user={user} />
    {log && <Login toggleLogin={toggleLogin} setUser={setUser} />}
    {message && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Error message={message} setMessage={setMessage} />
      </div>
    )}
     
    <div style={{visibility: back, borderRadius: '1em'}}>
       <div className="about-hero">
        <h1>About <em>Tenant</em> Connect</h1>
        <p>
          Connecting tenants and landlords in a smarter, simpler, and more secure way.
        </p>
      </div>

      
      <div className="about-container">

        <div className="about-section">
          <h2>What We Do</h2>
          <p>
            Tenant Connect is a modern rental marketplace designed to simplify how
            tenants and landlords connect. Our platform allows property owners to
            list apartments, houses, and commercial spaces, while helping renters
            easily discover and access listings that match their needs.
          </p>
          <p>
            Renters can browse properties, filter by location, price, and type,
            and explore listings before making a decision.
          </p>
        </div>

        <div className="about-section">
          <h2>For Landlords</h2>
          <p>
            Landlords can create and manage listings, upload images, set prices,
            and describe their properties — all while keeping sensitive details
            like phone numbers and exact addresses secure until a tenant is
            genuinely interested.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3>Direct Connections</h3>
            <p>No agents. Communicate directly with landlords.</p>
          </div>

          <div className="about-card">
            <h3>Secure Access</h3>
            <p>Your contact details stay protected until needed.</p>
          </div>

          <div className="about-card">
            <h3>Smart Filters</h3>
            <p>Search by location, price, and property type.</p>
          </div>
        </div>

        <div className="about-section">
          <h2>How It Works</h2>
          <ul>
            <li>Browse listings for free</li>
            <li>Filter by location, price, and property type</li>
            <li>Unlock contact details when ready</li>
            <li>Connect directly with landlords</li>
          </ul>
        </div>

       <div className="about-section">
            <h2>Our Mission</h2>
            <ul>
                <li>
                To create a trusted, efficient, and accessible rental ecosystem
                where both tenants and landlords benefit from transparency,
                security, and direct communication.
                </li>
                <li>
                To simplify the property search experience by leveraging technology,
                making it faster, more affordable, and accessible for everyone
                across Africa.
                </li>
            </ul>
            </div>
        
        

        <div className="about-section">
          <h2>Innovation</h2>
          <p>
            Tenant Connect also integrates a WhatsApp chatbot that allows users
            to search listings, filter results, and explore properties directly
            from their mobile devices.
          </p>
        </div>

       
        <div className="about-cta">
          <h2>Ready to find your next home?</h2>
          <p>Join thousands of tenants and landlords today.</p>
          <Link to="/listings"><button>Browse Listings</button></Link>
          
        </div>

      </div>

     </div>
      <Footer />
    </div>
  );
}