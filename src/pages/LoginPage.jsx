import { Link } from 'react-router-dom';
import { loginUser } from '../api/base.js';

export default function LoginPage() {

    async function handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
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
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button className="lgn-btn" onClick={handleLogin}>Login</button>
                </form>
                <p>No account? <Link to="/signup" title="SignUp">SignUp</Link></p>
            </div>
        </div>
    );
}