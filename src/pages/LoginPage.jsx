export default function LoginPage() {
    function handleLogin(event) {
        console.log("Login button clicked");
        //insert means of sending login data to backend here
        event.preventDefault(); // Prevent form submission
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
            </div>
        </div>
    );
}