
import './Login.css';
import apple from './assets/apple.png';
import google from './assets/google.png';
import { useState } from "react";
import { auth, db } from "./firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Signup from './Signup';
import close from './assets/close.png';

export default function Login({ toggleLogin, setUser, user }) {
    const [showSignup, setShowSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();

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
    };

    return (
        <div className='login'>
            {showSignup ? (
                <Signup 
                    toggleSignup={setShowSignup}
                    toggleLogin={toggleLogin}
                />
            ) : (
                <div className='loginF'>
                    <h1>Welcome Back</h1>

                    <div onClick={toggleLogin}>
                        <img
                            src={close}
                            alt="close"
                            style={{ height: '1em', top: -50, position: 'relative', right: -190 }}
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

                        <button type="submit" className='btn-ghost'>Login</button>
                    </form>

                    <div style={{ margin: '1.5em' }}>
                        <p
                            style={{ fontSize: '12px', color: 'white', cursor: 'pointer' }}
                            onClick={() => setShowSignup(true)}
                        >
                            Don't have an account? <em>Sign up</em>
                        </p>
                    </div>

                    <h3>Continue with</h3>
                    <div className='loginIcons'>
                        <div className='btn-ghostt'>
                            <img src={google} alt="google" />
                        </div>
                        <div className='btn-ghostt'>
                            <img src={apple} alt="apple" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
