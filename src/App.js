import './App.css';
import logo from "./assets/logo.png";
import Listing from './listings';
import About from './About';
import { Routes, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';
import React, { useState } from 'react';
import Error from './Error';

function App() {
  const [back, setBack] = useState('visible');
  const [log, setLog] = useState(false);
  const [message, setMessage]= useState("");
  const [user, setUser] = useState(null);
  const toggleLogin = () => {
    setLog(prev => !prev);
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="App" >
          <Nav toggleLogin={toggleLogin} user={user} />
          {log && <Login toggleLogin={toggleLogin} setUser={setUser} />}

          {message && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Error message={message} setMessage={setMessage} />
            </div>
          )}
          <div style={{ visibility: log ? 'hidden' : 'visible' }}> 
            <section className="hero">

            <h1>Your next home is one <em>connection</em> away</h1>

            <p className="hero-sub">Connecting tenants and landlords across Zimbabwe</p>
          </section>


          <div className="stats">
            <div className="stat">
              <div className="stat-num">2,400+</div>
              <div className="stat-label">Active listings</div>
            </div>
            <div className="stat">
              <div className="stat-num">1000+</div>
              <div className="stat-label">Active tenants</div>
            </div>
            <div className="stat">
              <div className="stat-num">+800 hrs</div>
              <div className="stat-label">Active landlords</div>
            </div>
          </div>


          <section className="section">
            <div className="section-label">How it works</div>
            <div className="section-title">Simple for everyone</div>
            <div className="steps">
              <div className="step">

                <h3>Browse for free</h3>
                <p>Search by location, price range, and property type. Half of the uploaded photos are always free to view — no login needed.</p>
              </div>
              <div className="step">

                <h3>Unlock with subscription payment</h3>
                <p>Found something worth pursuing? Spend atleast $3 and book for property booking and exact address.</p>
              </div>
              <div className="step">

                <h3>Connect directly</h3>
                <p>No agents, no delays. Contact the landlord directly, arrange a viewing, and move in on your timeline.</p>
              </div>
            </div>
          </section>


          <div className="roles">
            <div className="role-card landlord">
              <div className="role-pill landlord-pill">For landlords</div>
              <h2>Reach only serious tenants</h2>
              <p>List your property in minutes. Your phone number and exact property address stay private — only tenants who pay to unlock can reach you.</p>
              <div className="feature-list">
                <div className="feature-item light">
                  <div className="fcheck light"><div className="tick light"></div></div>
                  Upload photos and set your price
                </div>
                <div className="feature-item light">
                  <div className="fcheck light"><div className="tick light"></div></div>
                  Contact details stay hidden by default
                </div>
                <div className="feature-item light">
                  <div className="fcheck light"><div className="tick light"></div></div>
                  Apartments, houses, and warehouses
                </div>
                <div className="feature-item light">
                  <div className="fcheck light"><div className="tick light"></div></div>
                  Only motivated tenants reach you
                </div>
              </div>
            </div>
            <div className="role-card tenant">
              <div className="role-pill tenant-pill">For tenants</div>
              <h2>Find the right place, pay only when ready</h2>
              <p>Browse everything for free. When a listing looks right, pay monthly subscription to unlock full contact and location details.</p>
              <div className="feature-list">
                <div className="feature-item dark">
                  <div className="fcheck dark"><div className="tick dark"></div></div>
                  Filter by location, price, property type
                </div>
                <div className="feature-item dark">
                  <div className="fcheck dark"><div className="tick dark"></div></div>
                  A few photos and descriptions always free
                </div>
                <div className="feature-item dark">
                  <div className="fcheck dark"><div className="tick dark"></div></div>
                  1 subscription reveals contact and address
                </div>
                <div className="feature-item dark">
                  <div className="fcheck dark"><div className="tick dark"></div></div>
                  Search via WhatsApp chatbot too
                </div>
              </div>
            </div>
          </div>

          <section className="section">
            <div className="section-label">subscription</div>
            <div className="section-title">Pay only for what you use</div>
            <div className="pricing-grid">
              <div className="price-card featured">

                <div className="popular-badge">1 weeks</div>
                <div className="price-credits">$3</div>
                <button className="buy-btn featured-btn">Subscibe</button>
              </div>
              <div className="price-card featured">
                <div className="popular-badge">2 weeks</div>
                <div className="price-credits">$5 </div>
                <button className="buy-btn featured-btn">Subscibe</button>
              </div>
              <div className="price-card featured">
                <div className="popular-badge">1 month</div>
                <div className="price-credits">$10</div>
                <button className="buy-btn featured-btn">Subscibe</button>
              </div>
            </div>
          </section>
          <section className="whatsapp-section">
            <div className="wa-text">
              <div className="section-label">WhatsApp</div>
              <div className="section-title">Search listings from your chat</div>
              <p>No data? No problem. The Tenant Connect WhatsApp bot lets you search listings, filter by location and budget, and unlock contact details — right from your phone.</p>
              <button className="wa-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8c0 1.18.32 2.28.87 3.23L1.5 14.5l3.37-.85A6.5 6.5 0 108 1.5z" fill="white" opacity="0.9" />
                </svg>
                Chat on WhatsApp
              </button>
            </div>
            <div className="chat-mockup">
              <div className="chat-header">
                <div className="wa-avatar">TC</div>
                <div>
                  <div className="chat-name">Tenant Connect</div>
                  <div className="chat-status">online</div>
                </div>
              </div>
              <div className="msg bot"><div className="bubble bot">Welcome to Tenant Connect! What are you looking for?<br />1. Apartment &nbsp; 2. House &nbsp; 3. Warehouse</div></div>
              <div className="msg user"><div className="bubble user">1</div></div>
              <div className="msg bot"><div className="bubble bot">Apartment — got it. Which area?</div></div>
              <div className="msg user"><div className="bubble user">Avondale</div></div>
              <div className="msg bot"><div className="bubble bot">Max monthly budget?</div></div>
              <div className="msg user"><div className="bubble user">$ 550</div></div>
              <div className="msg bot"><div className="bubble bot">Found 14 apartments in Avondale under $550. Here are the listings...</div></div>
            </div>
          </section>


          <section className="trust-section">
            <div className="section-label">Trust and safety</div>
            <div className="section-title">Built to protect both sides.</div>
            <div className="trust-grid">
              <div className="trust-card">
                <div className="trust-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L4 5.5v6c0 4 2.86 7.74 6 8.5 3.14-.76 6-4.5 6-8.5v-6L10 2z" stroke="#0a6640" strokeWidth="1.2" fill="none" />
                  </svg>
                </div>
                <h3>Landlord verification</h3>
                <p>Every landlord is reviewed before going live. Fake or duplicate listings are removed quickly to keep the platform trustworthy.</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="5" y="9" width="10" height="8" rx="2" stroke="#0a6640" strokeWidth="1.2" />
                    <path d="M7 9V7a3 3 0 016 0v2" stroke="#0a6640" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Contact details protected</h3>
                <p>Phone numbers in descriptions are blocked automatically. Contact info is only revealed through the secure credit unlock system.</p>
              </div>
              <div className="trust-card">
                <div className="trust-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3a5 5 0 100 10A5 5 0 0010 3zM4 18c0-2.5 2.7-4 6-4s6 1.5 6 4" stroke="#0a6640" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
                <h3>Ratings and reporting</h3>
                <p>Tenants can rate landlords and flag suspicious listings. Every report is reviewed by our team within 24 hours.</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>Ready to find your place?</h2>
            <p>Join thousands of tenants and landlords across Zimbabwe.</p>
            <div className="cta-btns">
              <Link to="/listings">
                <button className="btn-white">Browse listings</button>
              </Link>
              <button
                className="btn-white"
                onClick={() => {
                  if (!user) {
                    setMessage("Please login to post a property");
                  } 
                  else {
                    if (user?.role.toLowerCase()=='tenant'){
                      setMessage("You registered as a tenant, upgrade to be a landlord to post a property.");
                    }
                    
                  }
                }}
              >
                List your property
              </button>
            </div>
          </section>
          </div>

         <Footer />  
        </div>
      } />

        <Route path="/Login" element={<Login setUser={setUser} user={user} message={message} setMessage={setMessage}/>}  />
        <Route path="/Signup" element={<Signup message={message} setMessage={setMessage}/>} />

        <Route path="/listings" element={<Listing setMessage={setMessage} message={message} user={user} setUser={setUser} />} />
        <Route path="/About" element={<About setMessage={setMessage} message={message} user={user} setUser={setUser} />} />

    </Routes>
  );
}

export default App;