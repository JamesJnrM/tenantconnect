import './Login.css';
import apple from './assets/apple.png';
import google from './assets/google.png';
import { useState } from "react";
import { auth, db } from "./firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import close from './assets/close.png';

export default function Signup({ toggleSignup, toggleLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        if (!role) {
            alert("Please select a role");
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
            alert(error.message);
        }
    };

    return (
        <div className='login'>
            <div className='loginF'>
                <h1>Welcome to Tenant Connect</h1>

                <div onClick={toggleLogin}>
                    <img
                        src={close}
                        alt="close"
                        style={{ height: '1em', top: -85, position: 'relative', right: -190, cursor: 'pointer' }}
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
                    <button type="submit" className='btn-ghost'>Sign Up</button>
                </form>

                <div style={{ margin: '1.5em' }}>
                    <p
                        style={{ fontSize: '12px', color: 'white', cursor: 'pointer' }}
                        onClick={() => toggleSignup(false)}
                    >
                        Already have an account? <em>Sign in</em>
                    </p>
                </div>

                <h3>Continue with</h3>
                <div className='loginIcons'>
                    <div className='btn-ghostt'><img src={google} alt="google" /></div>
                    <div className='btn-ghostt'><img src={apple} alt="apple" /></div>
                </div>
            </div>
        </div>
    );
}