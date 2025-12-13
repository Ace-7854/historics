import { Link } from 'react-router-dom';
import { loginUser } from '../api/base.js';
import { useRef } from 'react';

export default function LoginPage() {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    async function handleLogin(e) {
        e.preventDefault();
        
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        // const username = document.getElementById("username").value;
        // const password = document.getElementById("password").value;
        
        const data = await loginUser({ username, password });
        
        if (data.status === 'success') {
            // Store username in localStorage
            localStorage.setItem("username", username);
            // Redirect to chat
            window.location.href = "/";
        } else {
            alert("Login failed: " + data.message);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input ref={usernameRef} type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input ref={passwordRef} type="password" id="password" name="password" required />
                    </div>
                    <button className="lgn-btn" onClick={handleLogin}>Login</button>
                </form>
                <p>No account? <Link to="/signup" title="SignUp">SignUp</Link></p>
            </div>
        </div>
    );
}