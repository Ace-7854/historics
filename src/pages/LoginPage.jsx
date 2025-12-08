import { Link } from 'react-router-dom';
import { loginUser } from '../api/base.js';

export default function LoginPage() {

    function handleLogin() {
        console.log("Login button clicked");
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const credentials = { username, password };
        loginUser(credentials).then((data) => {
            console.log("Login result:", data);
            // Handle login result (e.g., redirect on success)
        });
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
                    <button type="submit" className="lgn-btn" onClick={handleLogin}>Login</button>
                </form>
                <p>No account? <Link to="/signup" title="SignUp">SignUp</Link></p>
            </div>
        </div>
    );
}