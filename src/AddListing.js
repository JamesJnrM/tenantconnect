import logo from './assets/logo.png';
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import close from './assets/close.png';

export default function AddListing({ user, toggleLisst }) {
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState("");
    const [propertyType, setPropertyType] = useState("Apartment");
    const [rooms, setRooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [bathroomType, setBathroomType] = useState("Shared");
    const [viewings, setViewings] = useState(0);
    const userName = user.name;
    const userPhone = user.phone;
    const userEmail = user.email;
    
    const handleFiles = (e) => {
        const selected = Array.from(e.target.files);
        alert(`Selected ${selected.length} file(s)`);
        setFiles(selected);
    };
    const uploadFolder = async () => {
    if (!user) { alert("No user found"); return; }
    if (files.length === 0) { alert("No files selected"); return; }
    if (uploading) return;

    setUploading(true);

    try {
        const folderName = title || `listing_${Date.now()}`;

        const payload = await Promise.all(
            files.map(file => new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve({
                    data: reader.result.split(',')[1],
                    name: file.name,
                    type: file.type
                });
            }))
        );

        const res = await fetch("https://script.google.com/macros/s/AKfycbzLJDUezOZvNjVd01z4kaeemjdgpB_P18kKFXxFHWdqH3xCmnJL0M7JKgsIDG3XPNoH0w/exec", {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" }, 
            body: JSON.stringify({
                fname: "uploadFolder",
                dataReq: { folder: folderName, files: payload }
            })
        });

        const result = await res.json();
        if (result.status!== "success") throw new Error(result.message);

       
        const imageUrls = result.urls; 
        setUploadedFiles(imageUrls); 

        const newListing = {
            title,
            address,
            price,
            propertyType,
            rooms,
            bathrooms,
            bathroomType,
            images: imageUrls,
            viewings: [],
            userName,
            userPhone,
            userEmail,
            createdAt: new Date().toISOString()
        };

        const updated = [...(user?.listings || []), newListing];
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { listings: updated });

        alert("Listing + images saved!");
        setFiles([]); 

    } catch (err) {
        alert("Error: " + err.message);
        console.error(err);
    }

    setUploading(false);
};

    return (
       <div className='login'>
            <div className='loginF'>
            <img src={logo} style={{ height: '3em', width: '3em' }} />
             <div onClick={toggleLisst}>
                <img
                    src={close}
                    alt="close"
                    style={{ height: '1em', top: -70, position: 'relative', right: -190 }}
                />
            </div>
            <h1>Please enter property details below</h1>

            <form>
                <div>
                    <h3 style={{ color: 'white' }}>Property title</h3>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                    <h3 style={{ color: 'white' }}>Address</h3>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                <div>
                    <h3 style={{ color: 'white' }}>Price per month</h3>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>

                <div>
                    <h3 style={{ color: 'white' }}>Property type</h3>
                    <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="sort-select">
                        <option>Apartment</option>
                        <option>Cottage</option>
                        <option>House</option>
                        <option>Warehouse</option>
                        <option>Sharing houses</option>
                    </select>
                </div>

                <div>
                    <h3 style={{ color: 'white' }}>Number of rooms</h3>
                    <input type="text" value={rooms} onChange={(e) => setRooms(e.target.value)} required />
                </div>

                <div>
                    <h3 style={{ color: 'white' }}>Number of bathrooms</h3>
                    <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
                </div>

                <div>
                    <h3 style={{ color: 'white' }}>Bathroom type</h3>
                    <select value={bathroomType} onChange={(e) => setBathroomType(e.target.value)} className="sort-select">
                        <option>Shared</option>
                        <option>Private</option>
                    </select>
                </div>

                <div style={{ marginTop: '1.5em' }}>
                    <h3 style={{ color: 'white' }}>Select property pictures</h3>
                    <input type="file" multiple onChange={handleFiles} />
                    <button type="button" onClick={uploadFolder} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                    </button>

                    {uploadedFiles.map((url, i) => (
                        <div key={i}>
                            <img src={url} width="3em" height="3em" alt="" />
                        </div>
                    ))}
                </div>
            </form>
        </div>
       </div>
    );
}