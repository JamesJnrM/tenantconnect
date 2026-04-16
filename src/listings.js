import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import './listings.css';
import Footer from './Footer';
import bathIcon from './assets/bath.png';
import room from './assets/rooms.png';
import size from './assets/size.png';
import Error from './Error';
import { doc, updateDoc, getDoc,getDocs, collection } from "firebase/firestore";
import { db } from "./firebase/firebase";
import Login from './Login';
import Signup from './Signup';
import { Routes, Route } from 'react-router-dom';
import AddListing from './AddListing';
import ViewSelected from './ViewSelected';

function Listing({ user, setMessage, setUser, message }) {
  const [liked, setLiked] = useState([]);
  const [sortBy, setSortBy] = useState('Relevant Listing');
  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState('');
  const [bathroom, setBathroom] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [op, setOp] = useState('1');
  const [listings, setListings] = useState([]);
  const [log, setLog] = useState(false);
  const [lisst, setLisst] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showOthers, setShowOthers] = useState(false);

  const toggleLisst = () => setLisst(prev => !prev);
  const toggleLogin = () => setLog(prev => !prev);


  const handleBooking = async (listing) => {
  if (!user) {
    setMessage('Please login to book a viewing.');
    return;
  }

  try {
    const userRef = doc(db, "users", listing.userId); // listing owner
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    
    const updatedListings = userData.listings.map(item => {
      if (item.id === listing.id) { // use id, not createdAt
        const currentBookings = item.bookings || [];
        
        // prevent double booking
        const alreadyBooked = currentBookings.some(b => b.userId === user.uid);
        if (alreadyBooked) {
          throw new Error('You already booked this listing');
        }

        const newBooking = {
          userId: user.uid,
          name: user.displayName || user.email,
          phone: user.phoneNumber || 'No phone',
          bookedAt: new Date().toISOString()
        };

        return { 
          ...item, 
          bookings: [...currentBookings, newBooking] 
        };
      }
      return item;
    });

    await updateDoc(userRef, { listings: updatedListings });
    setMessage('Viewing booked!');
    fetchUsers(); // refresh
    } 
    catch (err) {
      setMessage(err.message || 'Failed to book viewing');
    }
  }
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    const allListings = users.flatMap(u =>
      (u.listings || []).map(l => ({ ...l, userId: u.id }))
    );
    setListings(allListings);
  };
  console.log('here',listings[0])
  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredListings = listings
    .filter(l => {
      return (
        (!location || l.address.toLowerCase().includes(location.toLowerCase())) &&
        (!rooms || Number(l.rooms) === Number(rooms)) &&
        (!bathroom || l.bathroomType === bathroom) &&
        (!propertyType || l.propertyType === propertyType)
      );
    })
    .sort((a, b) => {
      const priceA = Number(a.price?.replace('$', '') || 0);
      const priceB = Number(b.price?.replace('$', '') || 0);
      if (sortBy === 'Price: Low to High') return priceA - priceB;
      if (sortBy === 'Price: High to Low') return priceB - priceA;
      return 0;
    });

  const otherListings = listings.filter(l => l.userId !== user?.uid);

  return (
    <Routes>
      <Route path="/" element={
        <div className="listings-page">
          <Nav toggleLogin={toggleLogin} user={user} />
          {log && <Login toggleLogin={toggleLogin} setUser={setUser} />}

          {message && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Error message={message} setMessage={setMessage} />
            </div>
          )}

          <div style={{ margin: '1em' }}>
            <h3>Filters</h3>

            <div className='filterItems'>
              <div>
                <h5>Location</h5>
                <input value={location} onChange={(e) => setLocation(e.target.value)} className="sort-select" />
              </div>

              <div>
                <h5>Number of rooms</h5>
                <input value={rooms} onChange={(e) => setRooms(e.target.value)} className="sort-select" />
              </div>

              <div>
                <h5>Bathroom Access</h5>
                <select value={bathroom} onChange={(e) => setBathroom(e.target.value)} className="sort-select">
                  <option value="">All</option>
                  <option value="private">Private</option>
                  <option value="shared">Shared</option>
                </select>
              </div>

              <div>
                <h5>Property Type</h5>
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="sort-select">
                  <option value="">All</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
            </div>

            <div className="sort-row">
              Sort by:
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
                <option>Relevant Listing</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {selectedListing && (
              <ViewSelected
                selectedListing={selectedListing}
                setSelectedListing={setSelectedListing}
                user={user}
              />
            )}

            {!user || user?.role === 'tenant' ? (
              <div style={{ marginTop: '1em' }}>
                <div className="results-title">We found {filteredListings.length} properties</div>

                <div className="listings-grid">
                  {filteredListings.map((l, i) => (
                    <div key={i} className="listing-card" style={{ opacity: op }}>
                      <div className="card-img-wrap">
                        
                        <img src={ l.images?.[0] ? `https://drive.google.com/thumbnail?id=${l.images[0].match(/id=([^&]+)/)?.[1]}&sz=w1000` : {room}} onClick={() => setSelectedListing(l)} style={{width: '100%', height: '15em'}} />
                      <button
                          className="wishlist-btn"
                          onClick={async () => {
                            if (!user) {
                              setMessage('Please login to like properties.');
                              return;
                            }

                            const exists = liked.find(item => item.id === l.id);
                            const updated = exists
                              ? liked.filter(item => item.id !== l.id)
                              : [...liked, l];

                            setLiked(updated);

                            const userRef = doc(db, "users", user.uid);
                            await updateDoc(userRef, { liked: updated });
                          }}
                        >
                          {liked.find(item => item.id === l.id) ? '❤️' : '♡'}
                        </button>
                        {user && user.subscription === '1 week' && (
                          
                          <div >

                            <button className="btn-ghost" onClick={() => handleBooking(l)}>Book for viewing</button>
                            <p style={{fontSize: '11px', fontStyle: 'italic', marginTop: '1em', marginLeft: '1.5em'}}>Already booked for viewing by: {l.viewings.length} users</p>
                          </div>
                        )}
                      </div>

                      <div className="card-body">
                        <div className="card-price">${l.price}/mo</div>
                        <div className="card-title">{l.title}</div>
                        <div className="card-address">
                          {user?.subscription === '1 week'
                            ? l.address
                            : 'Subscribe to see address'}
                        </div>

                        <div className="card-meta">
                          <span><img src={room} alt="" style={{ height: '1em', width: '1em' }} /> {l.rooms} rooms</span>
                          <span><img src={bathIcon} alt="" style={{ height: '1em', width: '1em' }} /> {l.bathroomType}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '2em', alignItems: 'center' }}>
                  <div>You have {user?.listings?.length || 0} listings</div>

                  <button className="btn-ghost" onClick={toggleLisst}>
                    Add listing
                  </button>

                  <button
                    className="btn-ghost"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => setShowOthers(prev => !prev)}
                  >
                    {showOthers ? 'View My Listings' : 'View listings by others'}
                  </button>
                </div>

                {lisst && <AddListing toggleLisst={toggleLisst} user={user} />}

                <div className="listings-grid">
                  {(showOthers ? otherListings : user?.listings || []).map((l, i) => (
                    <div key={i} className="listing-card" onClick={() => setSelectedListing(l)}>
                      <div className="card-img-wrap">
                        <img
                         src={`https://drive.google.com/thumbnail?id=${l.images?.[0]?.split("id=")[1]}&sz=w1000`}
                          alt={l.title}
                          className="card-img"
                        />
                      </div>

                      <div className="card-body">
                        <div className="card-price">${l.price}/mo</div>
                        <div className="card-title">{l.title}</div>
                        <div className="card-address">{l.address}</div>

                        <div className="card-meta">
                          <span><img src={room} alt="" style={{ height: '1em', width: '1em' }} /> {l.rooms} rooms</span>
                          <span><img src={bathIcon} alt="" style={{ height: '1em', width: '1em' }} /> {l.bathroomType}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Footer />
        </div>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
}

export default Listing;