import close from './assets/close.png';
import logo from './assets/logo.png'
export default function ViewSelected({selectedListing, toggleLisst, setSelectedListing, user}){
    
    return(
        <div className="login">
            <div className="loginFr">
                
                {selectedListing && (
                    <>
                        <img src={logo} style={{height: '4em', width: '4em'}}/>
                        <div >
                            <img src={close} alt="close"  onClick={()=>setSelectedListing(null)} style={{ height: '1em', top: -80, position: 'relative', right: -300 }}/>
                        </div>
                        <h4 style={{marginBottom: '1em'}}>Property details:</h4>
                        <h5 style={{color: 'white', marginBottom: '1em'}}>{selectedListing.title}</h5>
                       
                        {selectedListing?.images?.length > 0 && (
                        <div>
                            <img src={selectedListing.images[0]} alt="" style={{objectFit: 'cover', width: '100%'}}/>

                            {selectedListing?.images?.length > 1 && (
                                <div style={{display: 'flex', flexDirection: 'row', gap:'1em', width: '100%'}}>
                                    {selectedListing.images.slice(1).map((img, i) => (
                                    <div key={i}>
                                        <img
                                        src={img}
                                        alt=""
                                        style={{ height: '10em', width: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    ))}
                                </div>
                                )}
                            <div style={{alignSelf: 'flex-start', textAlign: 'left', marginRight: 'auto', width: '100%', marginTop: '1em'}}>
                                
                                {user?.subscription === '1 week' ? (
                                    <p style={{fontSize: '13px'}}><span style={{color: 'green'}}>Physical Address: </span>{selectedListing.address}</p> 
                                    ) : (
                                    <p>Subscribe to see address</p>
                                )}
                                <p style={{fontSize: '13px'}}><span style={{color: 'green'}}>Price per month: </span>{selectedListing.price}</p>
                                <p style={{fontSize: '13px'}}><span style={{color: 'green'}}>Number of rooms: </span>{selectedListing.rooms}</p>
                                <p style={{fontSize: '13px'}}><span style={{color: 'green'}}>Number of bathrooms: </span>{selectedListing.bathrooms}</p>
                                <p style={{fontSize: '13px'}}><span style={{color: 'green'}}>Bathroom type: </span>{selectedListing.bathroomType}</p>
                                <p style={{fontSize: '13px'}}><span style={{color: 'green'}}>Posted on: </span>{selectedListing.createdAt?.split("T")[0]}</p>
                                <p style={{fontSize: '13px'}}><span style={{color: 'green'}}>Property type: </span>{selectedListing.propertyType}</p>
                                <p style={{fontSize: '13px'}}><span style={{color: 'green'}}>Already booked for viewing by: </span>{user?.subscription === '1 week' ? 
                                        selectedListing.viewings.length  : 
                                        'Subscribe to view information'
                                    }
                                </p>
                                <p style={{fontSize: '13px'}}>
                                    <span style={{color: 'green'}}>Landlord details: </span>
                                    {user?.subscription === '1 week' ? (
                                        <div style={{marginLeft: '2em', fontSize: '12px'}}>
                                        
                                        Name: {selectedListing.userName?.charAt(0).toUpperCase() + selectedListing.userName?.slice(1)}
                                        <br />
                                        Phone number: {selectedListing.userPhone}
                                        <br />
                                        Email: {selectedListing.userEmail}
                                        </div>
                                    ) : (
                                        'Subscribe to see address'
                                    )}
                                    </p>
                            </div>
                        </div>
                        )}
                    </>
                    )}
                
            </div>
        </div>
    )
}