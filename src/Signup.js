import './Login.css';
import apple from './assets/apple.png';
import google from './assets/google.png';
import { useState } from "react";
import { auth, db } from "./firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import close from './assets/close.png';
import Error from './Error';
export default function Signup({ toggleSignup, toggleLogin, message, setMessage }) {
    const [uploading, setUploading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setUploading(true);
        if (password !== cpassword) {
            setMessage?.("Passwords do not match");
            setUploading(false);
            return;
        }

        if (!role) {
            setUploading(false);
            setMessage?.("Please select a role");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${name} ${surname}`
            });

            await setDoc(doc(db, "users", user.uid), {
                name,
                surname,
                phone,
                role,
                email,
                liked: [],
                listings: [],
                subscription: "",
                subscription_exp: "",
                isValid: false,
                createdAt: new Date()
            });

            toggleSignup(false);
        } catch (error) {
            setMessage?.(error.message)
        }
        setMessage?.("Account created{\n}You can now login.")
        setUploading(false);
        toggleSignup(false)
    };
    

    return (
        <div className='login'>
            <div className='loginF'>
                <h1>Welcome to Tenant Connect</h1>
                {message && (
                            <div style={{ display: 'flex',position: 'fixed', justifyContent: 'center', alignItems: 'center', zIndex: '9999' }}>
                              <Error message={message} setMessage={setMessage} />
                              
                            </div>
                )}
                <div onClick={toggleLogin}>
                    <img
                            src={close}
                            alt="close"
                            style={{
                                position: 'absolute',
                                top: '1em',
                                right: '1em',
                                height: '1em',
                                cursor: 'pointer'
                            }}
                        />
                </div>

                <h3 style={{ color: 'white' }}>Create your account</h3>

                <form onSubmit={handleSignup}>
                    <h3 style={{ color: 'white' }}>First name</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                    <h3 style={{ color: 'white' }}>Surname</h3>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />

                    <h3 style={{ color: 'white' }}>Phone number</h3>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

                    <h3 style={{ color: 'white' }}>Email</h3>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <h3 style={{ color: 'white' }}>Password</h3>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <h3 style={{ color: 'white' }}>Confirm Password</h3>
                    <input type="password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} required />

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2em', marginTop: '1em' }}>
                        <label style={{ color: 'white' }}>
                            <input type="radio" name="role" value="tenant" onChange={(e) => setRole(e.target.value)} /> Tenant
                        </label>
                        <label style={{ color: 'white' }}>
                            <input type="radio" name="role" value="landlord" onChange={(e) => setRole(e.target.value)} /> Landlord
                        </label>
                    </div>

                    <br />
                    <button type="submit" className='btn-ghost' disabled={uploading}>{uploading ? "Signing up..." : "Sign Up"}</button>
                </form>

                <div style={{ margin: '1.5em' }}>
                    <p
                        style={{ fontSize: '12px', color: 'white', cursor: 'pointer' }}
                        onClick={() => toggleSignup(false)}
                    >
                        Already have an account? <span style={{fontFamily: 'courier New', fontWeight: 'bolder'}}>Sign in</span>
                    </p>
                </div>

                
            </div>
        </div>
    );
}