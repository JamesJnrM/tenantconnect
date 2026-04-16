import logo from "./assets/logo.png";

export default function Error({ message, setMessage }) {
    if (!message) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            maxWidth: '20em',
            padding: '2em',
            borderRadius: '1em',
            textAlign: 'center',
            zIndex: '9999'
        }}>
            <img src={logo} style={{height: '2.5em', width: '2.5em', marginBottom: '0.5em'}}/>
            
            <p style={{fontSize: '12px', margin: '1em'}}>{message}</p>
            <button className="btn-ghost" onClick={() => setMessage("")}>
                Ok
            </button>
        </div>
    );
}