import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/base.js';
import { useChat } from '../context/chatContext.jsx'; // NEW

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useChat(); // NEW

    async function handleLogin(e) {
        e.preventDefault();
        
        console.log("Login button clicked");
    
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        const credentials = { username, password };
        console.log("Credentials to be sent:", credentials);
    
        const data = await loginUser(credentials);
        console.log("Login result:", data);
        
        if (data.status === 'success') {
            login(username); // Use context login function
            alert("Login successful!");
            navigate("/"); // Redirect to chat page
        } else {
            alert("Login failed: " + (data.message || "Invalid credentials"));
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="lgn-btn">Login</button>
                </form>
                <p>No account? <Link to="/signup" title="SignUp">SignUp</Link></p>
            </div>
        </div>
    );
}