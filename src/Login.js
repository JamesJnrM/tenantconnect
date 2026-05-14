
import './Login.css';
import apple from './assets/apple.png';
import google from './assets/google.png';
import { useState } from "react";
import { auth, db } from "./firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Signup from './Signup';
import close from './assets/close.png';

export default function Login({ toggleLogin, setUser, user, message, setMessage }) {
    const [uploading, setUploading] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
            setUploading(true);
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    setUser({ ...user, ...userData });

                    
                } else {
                    setUser(user);
                }

                toggleLogin();
            } catch (error) {
                alert(error.message);
            }
        setUploading(false);
    };

    return (
        <div className='login'>
            {showSignup ? (
                <Signup 
                    toggleSignup={setShowSignup}
                    toggleLogin={toggleLogin}
                    message={message}
                    setMessage={setMessage}
                />
            ) : (
                <div className='loginF'>
                    <h1>Welcome Back</h1>

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

                    <form onSubmit={handleLogin}>
                        <h3 style={{ color: 'white' }}>Email</h3>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <h3>Password</h3>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <br />

                        <button type="submit" className='btn-ghost' disabled={uploading}>{uploading ? "Logging in..." : "Log in"}</button>
                    </form>

                    <div style={{ margin: '1.5em' }}>
                        <p
                            style={{ fontSize: '12px', color: 'white', cursor: 'pointer' }}
                            onClick={() => setShowSignup(true) }
                        >
                            Don't have an account? <span style={{fontFamily: 'courier New', fontWeight: 'bolder'}}>Sign up</span>
                        </p>
                    </div>

                    <h3>Continue with</h3>
                    <div className='loginIcons'>
                        <div style={{borderRadius: '50%', height: '3em', width: '3em', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={google} alt="google" />
                        </div>
                        <div style={{borderRadius: '50%', height: '3em', width: '3em', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={apple} alt="apple" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
